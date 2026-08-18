import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiPorn } from "@/api/apiPorn";
import Controller from "@/ui/Controller";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { getApiPorn } = await apiPorn();

  const dataApiPorn = getApiPorn?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  const title = dataApiPorn?.xtitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,

    description: `Watch ${title} and discover more related content on Eronime.`,

    alternates: {
      canonical: `/porn/${dataApiPorn?.xtitle}`,
    },

    openGraph: {
      title: `${title} | Eronime`,
      description: `Watch ${title} on Eronime.`,
      url: `https://eronime.com/porn/${dataApiPorn?.xtitle}`,
    },
  };
}

export default async function PornInfo({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiPorn } = await apiPorn();

  const dataApiDoodstream = getApiDoodstream?.find(
    (doc) => String(doc.title).trim() === String(id).trim()
  );

  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) =>
      String(doc.name || "")
        .replace(/\.mp4$/i, "")
        .trim() === String(id).trim()
  );

  const dataApiPorn = getApiPorn?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  if (!dataApiPorn) {
    notFound();
  }

  const mergeData = {
    ...dataApiDoodstream,
    ...dataApiStreamtape,
    ...dataApiPorn,
  };

  return (
    <>
      <Controller
        path={"porn"}
        view={"stream"}
        getApi={getApiPorn}
        getInfo={mergeData}
      />
    </>
  );
}
