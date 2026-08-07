import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiPorn } from "@/api/apiPorn";
import Controller from "@/ui/Controller";

export default async function pornDetail({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiPorn } = await apiPorn();

  const dataApiPorn = getApiPorn?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  const dataApiDoodstream = getApiDoodstream?.find(
    (doc) => String(doc.title).trim() === String(id).trim()
  );

  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) =>
      String(doc.name || "")
        .replace(/\.mp4$/i, "")
        .trim() === String(id).trim()
  );

  if (!dataApiPorn) {
    notFound();
  }

  const getInfo = {
    ...dataApiPorn,
    ...dataApiDoodstream,
    ...dataApiStreamtape,
  };

  return (
    <>
      <Controller
        path={"porn"}
        view={"stream"}
        getApi={getApiPorn}
        getInfo={getInfo}
      />
    </>
  );
}
