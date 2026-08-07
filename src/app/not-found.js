import Button from "@/ui/uiButton";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="text-zinc-400">Page not found.</p>

      <Button href="/" size="sm" variant="ghost" className="px-6">
        Back
      </Button>
    </div>
  );
}
