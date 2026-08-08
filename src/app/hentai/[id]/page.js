import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiHentai } from "@/api/apiHentai";
import Controller from "@/ui/Controller";

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
