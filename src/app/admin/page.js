import Button from "@/ui/uiButton";

export default async function admin() {
  return (
    <div className="flex justify-center gap-3 py-20">
      <Button href="/admin/reset" variant="base">
        Reset
      </Button>
      <Button href="/admin/database" variant="base">
        Database
      </Button>
      <Button href="/admin/doodstream" variant="base">
        Doodstream
      </Button>
      <Button href="/admin/streamtape" variant="base">
        Streamtape
      </Button>
    </div>
  );
}
