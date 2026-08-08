import { apiHentai } from "@/api/apiHentai";
import Controller from "@/ui/Controller";

export default async function HentaiPage() {
  const { getApiHentai } = await apiHentai();

  return (
    <>
      <Controller path={"hentai"} view={"post"} getApi={getApiHentai} />
    </>
  );
}
