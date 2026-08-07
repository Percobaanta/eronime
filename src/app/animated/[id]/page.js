import { notFound } from "next/navigation";
import { apiDoodstream } from "@/api/apiDoodstream";
import { apiStreamtape } from "@/api/apiStreamtape";
import { apiAnimated } from "@/api/apiAnimated";
import Controller from "@/ui/Controller";

export default async function animatedDetail({ params }) {
  const { id } = await params;
  const { getApiDoodstream } = await apiDoodstream();
  const { getApiStreamtape } = await apiStreamtape();
  const { getApiAnimated } = await apiAnimated();

  const dataApiAnimated = getApiAnimated?.find((doc) => doc.id === id);
  const dataApiDoodstream = getApiDoodstream?.find((doc) => doc.title === id);
  const dataApiStreamtape = getApiStreamtape?.find(
    (doc) => doc.name.replace(".mp4", "") === id
  );

  if (!dataApiAnimated) {
    notFound();
  }

  if (!dataApiDoodstream && !dataApiStreamtape) {
    notFound();
  }

  const getInfo = {
    ...dataApiAnimated,
    ...dataApiDoodstream,
    ...dataApiStreamtape,
  };

  return (
    <>
      <Controller
        path={"animated"}
        view={"stream"}
        getApi={getApiAnimated}
        getInfo={getInfo}
      />
    </>
  );
}
