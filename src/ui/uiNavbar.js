"use client";

import Button from "@/ui/uiButton";

export default function Navbar({ path, setSearch }) {
  return (
    <div className="flex md:justify-start justify-between gap-3 mb-3">
      <Button
        href="/"
        size="lg"
        icon="chat-heart-fill text-lg! text-yellow-200"
        className="text-white! text-xl! font-bold! px-0! lowercase!"
      >
        eronime
      </Button>

      {path !== "search" ? (
        <Button
          href="/search"
          size="lg"
          variant="base"
          icon="search"
          className="justify-start! md:ml-24 min-w-48! max-w-80! w-full! px-5"
        >
          Search...
        </Button>
      ) : (
        <div className="bg-zinc-800 flex gap-3 items-center rounded-full md:ml-24 min-w-48 max-w-80 w-full px-5">
          <i className="bi bi-search text-sm" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search"
            placeholder="Search..."
            className="outline-none w-full text-sm h-full font-semibold bg-transparent"
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
