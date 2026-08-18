import { apiAnimated } from "@/api/apiAnimated";
import Controller from "@/ui/Controller";

export const metadata = {
  title: "Animated Adult Videos",

  description:
    "Explore animated adult entertainment, animation videos, and popular animated content on Eronime.",

  alternates: {
    canonical: "/animated",
  },

  openGraph: {
    title: "Animated Adult Videos | Eronime",
    description:
      "Explore animated entertainment and discover popular animated content.",
    url: "https://eronime.com/animated",
  },
};

export default async function AnimatedPage() {
  const { getApiAnimated } = await apiAnimated();

  return (
    <>
      <Controller path={"animated"} view={"post"} getApi={getApiAnimated} />
    </>
  );
}
