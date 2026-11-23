import { redirect } from "next/navigation";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

const SLUG_REDIRECTS: Record<string, string> = {
  "vtc-etretat": "/excursions/etretat",
  "vtc-honfleur": "/excursions/honfleur",
};

export default async function LegacyDestinationRedirect({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  redirect(SLUG_REDIRECTS[slug] || "/#excursions");
}
