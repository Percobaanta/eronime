"use client";

import { usePathname } from "next/navigation";
import Button from "@/ui/uiButton";

export default function Navbar({ setSearch }) {
  const pathname = usePathname();

  return (
    <div className="flex md:justify-start justify-between gap-3 mb-3">
      <Button
        href="/"
        size="lg"
        icon="chat-heart-fill text-white text-lg! text-yellow-200"
        className="flex-none text-white! text-xl! font-bold! px-0! lowercase!"
      >
        eronime
      </Button>

      {pathname !== "/search" ? (
        <Button
          href="/search"
          size="lg"
          variant="base"
          icon="search text-white"
          className="justify-start! md:ml-24 min-w-48! max-w-80! w-full! px-4"
        >
          Search...
        </Button>
      ) : (
        <div className="bg-zinc-800 flex gap-2 items-center rounded-full md:ml-24 min-w-48 max-w-80 w-full px-4">
          <i className="bi bi-search text-sm text-white" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search..."
            className="outline-none w-full text-sm h-full font-semibold bg-transparent text-white"
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <Button
        href="/bookmark"
        size="lg"
        variant="base"
        icon="person-fill text-lg!"
        className="flex-none ml-auto"
      ></Button>
    </div>
  );
}
