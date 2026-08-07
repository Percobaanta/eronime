import { apiAnimated } from "@/api/apiAnimated";
import Controller from "@/ui/Controller";

export default async function Animated() {
  const { getApiAnimated } = await apiAnimated();

  return (
    <>
      <Controller path={"animated"} view={"post"} getApi={getApiAnimated} />
    </>
  );
}
