import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export default async function Cosplay() {
  const { getApiCosplay } = await apiCosplay();

  return (
    <>
      <Controller path={"cosplay"} view={"post"} getApi={getApiCosplay} />
    </>
  );
}
