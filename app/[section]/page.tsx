import { ClientRedirect } from "@/app/_components/ClientRedirect";
import { SECTIONS } from "@/lib/content";

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export default function SectionRedirectPage() {
  return <ClientRedirect to="/portal" />;
}
