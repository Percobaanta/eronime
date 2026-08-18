import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export const metadata = {
  title: "Cosplay Videos and Entertainment",

  description:
    "Discover cosplay videos, costume entertainment, characters, and popular cosplay content on Eronime.",

  alternates: {
    canonical: "/cosplay",
  },

  openGraph: {
    title: "Cosplay Videos and Entertainment | Eronime",
    description:
      "Discover popular cosplay entertainment and character content.",
    url: "https://eronime.com/cosplay",
  },
};

export default async function CosplayPage() {
  const { getApiCosplay } = await apiCosplay();

  return (
    <>
      <Controller path={"cosplay"} view={"post"} getApi={getApiCosplay} />
    </>
  );
}
