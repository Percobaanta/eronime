import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiHentai } from "@/api/apiHentai";
import Controller from "@/ui/Controller";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { getApiHentai } = await apiHentai();

  const dataApiHentai = getApiHentai?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  const title = dataApiHentai?.xtitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,

    description: `Watch ${title} and discover more related content on Eronime.`,

    alternates: {
      canonical: `/hentai/${dataApiHentai?.xtitle}`,
    },

    openGraph: {
      title: `${title} | Eronime`,
      description: `Watch ${title} on Eronime.`,
      url: `https://eronime.com/hentai/${dataApiHentai?.xtitle}`,
    },
  };
}

export default async function HentaiInfo({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiHentai } = await apiHentai();

  const dataApiDoodstream = getApiDoodstream?.find(
    (doc) => String(doc.title).trim() === String(id).trim()
  );

  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) =>
      String(doc.name || "")
        .replace(/\.mp4$/i, "")
        .trim() === String(id).trim()
  );

  const dataApiHentai = getApiHentai?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  if (!dataApiHentai) {
    notFound();
  }

  const mergeData = {
    ...dataApiDoodstream,
    ...dataApiStreamtape,
    ...dataApiHentai,
  };

  return (
    <>
      <Controller
        path={"hentai"}
        view={"stream"}
        getApi={getApiHentai}
        getInfo={mergeData}
      />
    </>
  );
}
