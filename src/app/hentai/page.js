import { apiHentai } from "@/api/apiHentai";
import Controller from "@/ui/Controller";

export const metadata = {
  title: "Hentai Animation Collection",

  description:
    "Browse hentai animation and discover animated entertainment content and popular categories on Eronime.",

  alternates: {
    canonical: "/hentai",
  },

  openGraph: {
    title: "Hentai Animation Collection | Eronime",
    description:
      "Browse hentai animation and discover popular animated entertainment.",
    url: "https://eronime.com/hentai",
  },
};

export default async function HentaiPage() {
  const { getApiHentai } = await apiHentai();

  return (
    <>
      <Controller path={"hentai"} view={"post"} getApi={getApiHentai} />
    </>
  );
}
