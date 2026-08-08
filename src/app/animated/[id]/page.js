import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiAnimated } from "@/api/apiAnimated";
import Controller from "@/ui/Controller";

export default async function AnimatedInfo({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiAnimated } = await apiAnimated();

  const dataApiDoodstream = getApiDoodstream?.find(
    (doc) => String(doc.title).trim() === String(id).trim()
  );

  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) =>
      String(doc.name || "")
        .replace(/\.mp4$/i, "")
        .trim() === String(id).trim()
  );

  const dataApiAnimated = getApiAnimated?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  if (!dataApiAnimated) {
    notFound();
  }

  const mergeData = {
    ...dataApiDoodstream,
    ...dataApiStreamtape,
    ...dataApiAnimated,
  };

  return (
    <>
      <Controller
        path={"animated"}
        view={"stream"}
        getApi={getApiAnimated}
        getInfo={mergeData}
      />
    </>
  );
}
