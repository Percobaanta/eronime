import { notFound } from "next/navigation";
import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export default async function cosplayDetail({ params }) {
  const { id } = await params;
  const { getApiCosplay } = await apiCosplay();

  const dataApiCosplay = getApiCosplay?.find((doc) => doc.id === id);

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
