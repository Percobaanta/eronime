import { apiPorn } from "@/api/apiPorn";
import { apiAnimated } from "@/api/apiAnimated";
import { apiHentai } from "@/api/apiHentai";
import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export default async function BookmarkPage() {
  const { getApiPorn } = await apiPorn();
  const { getApiAnimated } = await apiAnimated();
  const { getApiHentai } = await apiHentai();
  const { getApiCosplay } = await apiCosplay();

  const getApi = [
    ...getApiPorn,
    ...getApiAnimated,
    ...getApiHentai,
    ...getApiCosplay,
  ];

  return (
    <>
      <Controller path={"bookmark"} view={"bookmark"} getApi={getApi} />
    </>
  );
}
