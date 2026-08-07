import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiHentai } from "@/api/apiHentai";
import Controller from "@/ui/Controller";

export default async function hentaiDetail({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiHentai } = await apiHentai();

  const dataApiHentai = getApiHentai?.find((doc) => doc.id === id);
  const dataApiDoodstream = getApiDoodstream?.find((doc) => doc.title === id);
  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) => doc.name.replace(".mp4", "") === id
  );

  if (!dataApiHentai && !dataApiDoodstream && !dataApiStreamtape) {
    notFound();
  }

  const getInfo = {
    ...dataApiHentai,
    ...dataApiDoodstream,
    ...dataApiStreamtape,
  };

  return (
    <>
      <Controller
        path={"hentai"}
        view={"stream"}
        getApi={getApiHentai}
        getInfo={getInfo}
      />
    </>
  );
}
