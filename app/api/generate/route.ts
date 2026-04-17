import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

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

  const prompt = `You are a technical writer for GOL IBE — a professional travel booking engine used by travel agencies.
Write a help article for the section "${sectionLabel[section] ?? section}".

Topic: ${topic}
Style: ${tone}
${extraNotes ? `Extra notes: ${extraNotes}` : ""}

Rules:
- Start with a clear H1 title (the only H1)
- Write a short intro paragraph (2-3 sentences)
- Use numbered steps for procedures; use H2 for major sections
- Use **bold** for button names, menu items, and field labels
- Keep sentences concise and action-oriented
- End with a practical tip or short summary

Output ONLY the markdown. No preamble, no code fences around the whole thing — just the article.`;

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 2048,
          stream: true,
          messages: [{ role: "user", content: prompt }],
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
