"use client";

import Button from "@/ui/uiButton";
import { useState } from "react";

export default function Navbar({
  path,
  view,
  getApi,
  getSort,
  setSort,
  getCreator,
  setCreator,
  getTag,
  setTag,
}) {
  const [getFilter, setFilter] = useState(false);

  const creatorCount = getApi?.reduce((acc, item) => {
    item.xcreator?.forEach((creator) => {
      acc[creator] = (acc[creator] || 0) + 1;
    });
    return acc;
  }, {});

  const tagCount = getApi?.reduce((acc, item) => {
    item.xtags?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <>
      {/* -------------------- */}
      {/* Navbar & Filter */}
      {/* -------------------- */}
      <div className="bg-zinc-900 mb-2">
        <div className="container md:w-11/12 w-full mx-auto p-2 space-y-4">
          {/* navbar */}
          <div className="flex md:justify-start justify-between gap-4">
            <Button
              href="/"
              size="lg"
              icon="chat-heart-fill md:text-xl! text-lg! text-yellow-200"
              className="text-white! md:text-2xl! text-xl! font-bold! px-0! lowercase!"
            >
              eronime
            </Button>

            {path !== "search" ? (
              <Button
                href="/search"
                size="lg"
                variant="baseActive"
                icon="search"
                rounded
                className="justify-start! md:ml-24 min-w-48! max-w-96! w-full! px-5"
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
              variant="baseActive"
              icon="person-fill text-lg!"
              className="flex-none ml-auto"
              rounded
            ></Button>
          </div>

          {/* filter button */}
          <div className="flex flex-row gap-2">
            <div className="grid md:grid-cols-10 grid-cols-4 grow">
              {["porn", "animated", "hentai", "cosplay"].map((doc, i) => {
                const isActive = path === doc;
                return (
                  <Button
                    key={i}
                    href={`/${doc}`}
                    icon={doc !== "cosplay" ? "collection-play-fill" : "images"}
                    variant={isActive ? "primary" : "default"}
                    className="lg:col-span-1 md:col-span-2 col-span-1 w-full!"
                  >
                    {doc}
                  </Button>
                );
              })}
            </div>

            <Button
              icon="filter"
              variant={getFilter ? "primary" : "default"}
              onClick={() => setFilter((prev) => !prev)}
              className={
                view === "stream" || view === "gallery" || view === "bookmark"
                  ? "hidden"
                  : "flex-none!"
              }
            ></Button>
          </div>
        </div>
      </div>

      {/* -------------------- */}
      {/* Menu Filter */}
      {/* -------------------- */}
      {getFilter ? (
        <div className={`container md:w-11/12 w-full mx-auto p-2 mb-4`}>
          <div className="bg-zinc-900 overflow-hidden rounded-lg">
            <div className="flex flex-col md:max-h-64 max-h-48 overflow-y-scroll">
              {/* --- sort section --- */}
              <div className="grid md:grid-cols-6 grid-cols-2 gap-1 w-full p-3">
                <div className="md:col-span-6 col-span-2">
                  <div className="text-zinc-200 flex gap-2 text-xs font-semibold capitalize ml-3">
                    <i className="bi bi-funnel-fill" aria-hidden="true" />
                    <span>sort by</span>
                  </div>
                </div>

                {[
                  { id: "title", label: "title", icon: "arrow-down" },
                  { id: "title_down", label: "title", icon: "arrow-up" },
                  { id: "view", label: "view", icon: "arrow-down" },
                  { id: "view_down", label: "view", icon: "arrow-up" },
                  { id: "date", label: "date", icon: "arrow-down" },
                  { id: "date_down", label: "date", icon: "arrow-up" },
                ].map((sortItem) => (
                  <Button
                    key={sortItem.id}
                    size="sm"
                    variant={getSort === sortItem.id ? "baseActive" : "base"}
                    className="justify-between! w-full!"
                    iconEnd={sortItem.icon}
                    onClick={() => setSort(sortItem.id)}
                  >
                    {sortItem.label}
                  </Button>
                ))}
              </div>

              {/* ---  creator/brand/pornstar section --- */}
              <div className="grid md:grid-cols-6 grid-cols-2 gap-1 w-full p-3">
                <div className="md:col-span-6 col-span-2">
                  <div className="text-zinc-200 flex gap-2 text-xs font-semibold capitalize ml-3">
                    <i className="bi bi-person-fill" aria-hidden="true" />
                    <span>
                      {path === "porn"
                        ? "Pornstar"
                        : path === "animated" || path === "hentai"
                        ? "Brand"
                        : path === "cosplay" && "Brand"}
                    </span>
                  </div>
                </div>

                {Object.entries(creatorCount)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([doc, total]) => (
                    <Button
                      key={doc}
                      size="sm"
                      variant={getCreator === doc ? "baseActive" : "base"}
                      className="justify-between! w-full! flex-none!"
                      onClick={() => setCreator(getCreator === doc ? "" : doc)}
                    >
                      <span>{doc}</span>
                      <span>({total})</span>
                    </Button>
                  ))}
              </div>
              {/* --- tags section --- */}
              <div className="grid md:grid-cols-6 grid-cols-1 gap-1 w-full p-3">
                <div className="md:col-span-6">
                  <div className="text-zinc-200 flex gap-2 text-xs font-semibold capitalize ml-3">
                    <i className="bi bi-tag-fill" aria-hidden="true" />
                    <span>tags</span>
                  </div>
                </div>

                {Object.entries(tagCount)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([doc, total]) => (
                    <Button
                      key={doc}
                      size="sm"
                      variant={getTag === doc ? "baseActive" : "base"}
                      className="justify-between! w-full! flex-none!"
                      onClick={() => setTag(getTag === doc ? "" : doc)}
                    >
                      <span>{doc}</span>
                      <span>({total})</span>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        view !== "stream" &&
        view !== "gallery" &&
        view !== "bookmark" && (
          <div className="container md:w-11/12 w-full mx-auto p-2 mb-4">
            <p className="text-zinc-200 font-bold">
              <i className="bi bi-compass-fill mr-2"></i> Discover
            </p>

            <span className="text-zinc-400 text-xs">
              Watch porn, hentai and cosplay free download.
            </span>

            <div className="flex flex-nowrap overflow-y-scroll scrollbar-rounded gap-2 py-2">
              {Object.entries(tagCount)
                // .slice(0, 10)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([doc, total]) => (
                  <Button
                    key={doc}
                    size="sm"
                    variant={getCreator === doc ? "baseActive" : "base"}
                    className="flex-none rounded!"
                    onClick={() => setTag(getTag === doc ? "" : doc)}
                  >
                    <span>{doc}</span>
                  </Button>
                ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
