import { apiPorn } from "@/api/apiPorn";
import Controller from "@/ui/Controller";

export const metadata = {
  title: "Porn Videos and Adult Entertainment",

  description:
    "Browse adult entertainment videos and discover popular content and categories on Eronime.",

  alternates: {
    canonical: "/porn",
  },

  openGraph: {
    title: "Porn Videos and Adult Entertainment | Eronime",
    description:
      "Browse adult entertainment videos and discover popular content on Eronime.",
    url: "https://eronime.com/porn",
  },
};

export default async function PornPage() {
  const { getApiPorn } = await apiPorn();

  return (
    <>
      <Controller path={"porn"} view={"post"} getApi={getApiPorn} />
    </>
  );
}
