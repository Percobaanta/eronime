import { apiPorn } from "@/api/apiPorn";
import Controller from "@/ui/Controller";

export default async function Porn() {
  const { getApiPorn } = await apiPorn();

  return (
    <>
      <Controller path={"porn"} view={"post"} getApi={getApiPorn} />
    </>
  );
}
