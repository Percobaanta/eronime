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

  const dataApiPorn = getApiPorn?.find((doc) => doc.id === id);
  const dataApiDoodstream = getApiDoodstream?.find((doc) => doc.title === id);
  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) => doc.name.replace(".mp4", "") === id
  );

  if (!dataApiPorn) {
    notFound();
  }

  if (!dataApiDoodstream && !dataApiStreamtape) {
    notFound();
  }

  const getInfo = {
    ...dataApiPorn,
    ...dataApiDoodstream,
    ...dataApiStreamtape,
  };

  console.log(dataApiPorn);
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
