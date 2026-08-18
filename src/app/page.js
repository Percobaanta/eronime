import { apiPorn } from "@/api/apiPorn";
import Controller from "@/ui/Controller";

export const metadata = {
  title: "Eronime - Animated, Hentai and Cosplay Content",

  description:
    "Discover animated, hentai, cosplay, and adult entertainment content on Eronime. Browse popular categories and explore new content.",
};

export default async function HomePage() {
  const { getApiPorn } = await apiPorn();

  return (
    <>
      <Controller path={"porn"} view={"post"} getApi={getApiPorn} />
    </>
  );
}
