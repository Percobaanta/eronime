import { notFound } from "next/navigation";
import { apiCosplay } from "@/api/apiCosplay";
import Controller from "@/ui/Controller";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { getApiCosplay } = await apiCosplay();

  const dataApiCosplay = getApiCosplay?.find(
    (doc) => String(doc.id).trim() === String(id).trim()
  );

  const title = dataApiCosplay?.xtitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title,

    description: `Find ${title} and discover more related content on Eronime.`,

    alternates: {
      canonical: `/cosplay/${dataApiCosplay?.xtitle}`,
    },

    openGraph: {
      title: `${title} | Eronime`,
      description: `Find ${title} on Eronime.`,
      url: `https://eronime.com/cosplay/${dataApiCosplay?.xtitle}`,
    },
  };
}

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
