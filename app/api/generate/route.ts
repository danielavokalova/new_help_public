import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are a professional technical writer for GOL IBE — an enterprise Internet Booking Engine used by travel agencies across Central and Eastern Europe.

The help portal is organised into these sections:
- Getting Started: first-time setup guides, onboarding walkthroughs
- Configuration: GDS connectors, settings, customization
- Operations: daily tasks — reservations, payments, users
- Troubleshooting: FAQ, common errors, edge cases
- Release Notes: changelog entries

Key GOL IBE terminology:
- "Admin Console" — the back-office management interface
- "dealer" — a sub-agency or white-label partner under the main agency
- "agent" — a user account (not a software agent)
- "GDS" / "NDC" — flight content sources (Travelport, Amadeus, etc.)
- "PCC" — Pseudo City Code (GDS office identifier)
- "markup" / "service fee" — pricing add-ons on top of the ticket price
- "promo code" — customer-facing discount code
- "booking confirmation" — the email sent after successful reservation

Writing rules:
1. Start with a single H1 title — the only H1 in the document
2. Write a short intro paragraph (2–3 sentences) immediately after H1
3. For procedures: use numbered steps; bold all UI element names (**Settings**, **Menu > Submenu**)
4. For reference content: use H2 sections with concise descriptions
5. Use H2 for major sections, H3 for subsections only when needed
6. Keep sentences short and action-oriented
7. End with a practical tip, a note about common mistakes, or a brief summary
8. Output ONLY valid Markdown — no wrapping code fences, no preamble`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      "ANTHROPIC_API_KEY not set. Add it to .env.local and restart the dev server.",
      { status: 500 }
    );
  }

  const { topic, section, tone, extraNotes } = await request.json();

  const sectionLabel: Record<string, string> = {
    "getting-started": "Getting Started",
    configuration: "Configuration",
    operations: "Operations",
    troubleshooting: "Troubleshooting",
    "release-notes": "Release Notes",
  };

  const userMessage = `Write a help article for the "${sectionLabel[section] ?? section}" section.

Topic: ${topic}
Style: ${tone}${extraNotes ? `\nExtra notes: ${extraNotes}` : ""}`;

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          stream: true,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: userMessage }],
        });
        for await (const chunk of response) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`\n\n> **Error:** ${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
