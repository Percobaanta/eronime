import { notFound } from "next/navigation";
import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export default async function CosplayInfo({ params }) {
  const { id } = await params;
  const { getApiCosplay } = await apiCosplay();

  const dataApiCosplay = getApiCosplay?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  if (!dataApiCosplay) {
    notFound();
  }

  return (
    <>
      <Controller
        path={"cosplay"}
        view={"gallery"}
        getApi={getApiCosplay}
        getInfo={dataApiCosplay}
      />
    </>
  );
}
