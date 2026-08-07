"use client";

import Button from "@/ui/uiButton";
import { useState } from "react";

export default function Filter({
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
  const [getFilter, setFilter] = useState(
    view === "stream" || view === "gallery" || view === "bookmark"
      ? false
      : true
  );

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
    <div className="flex flex-col mb-5">
      <div className="flex flex-row mb-3 gap-3">
        <div className="grid md:grid-cols-12 grid-cols-4 grow gap-3">
          {["porn", "animated", "hentai", "cosplay"].map((doc, i) => {
            const isActive = path === doc || (path === "/" && doc === "porn");
            return (
              <Button
                key={i}
                href={`/${doc}`}
                variant={isActive ? "primary" : "base"}
                className="lg:col-span-1 md:col-span-2 col-span-1 w-full!"
              >
                {doc}
              </Button>
            );
          })}
        </div>

        <Button
          icon="filter"
          variant={getFilter ? "primary" : "base"}
          onClick={() => setFilter((prev) => !prev)}
          className={
            view === "stream" || view === "gallery" || view === "bookmark"
              ? "hidden"
              : "flex-none!"
          }
        ></Button>
      </div>

      {getFilter && (
        <div className="bg-zinc-800 overflow-hidden rounded-lg">
          <div className="flex flex-col md:max-h-64 max-h-48 overflow-y-scroll">
            {/* --- SORT SECTION --- */}
            <div className="grid md:grid-cols-6 grid-cols-2 gap-1 w-full p-3">
              <div className="md:col-span-6 col-span-2 mb-1">
                <div className="text-zinc-200 flex gap-2 text-xs font-bold capitalize ml-2">
                  <i className="bi bi-funnel-fill" aria-hidden="true" />
                  <span>sort by</span>
                </div>
              </div>

              {/* Refactor tombol sort agar lebih hemat baris */}
              {[
                { id: "date", label: "date", icon: "arrow-down" },
                { id: "date_down", label: "date", icon: "arrow-up" },
                { id: "title", label: "title", icon: "arrow-down" },
                { id: "title_down", label: "title", icon: "arrow-up" },
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

            {/* --- CREATOR SECTION --- */}
            <div className="grid md:grid-cols-6 grid-cols-2 gap-1 w-full p-3">
              <div className="md:col-span-6 col-span-2 mb-1">
                <div className="text-zinc-200 flex gap-2 text-xs font-bold capitalize ml-2">
                  <i className="bi bi-person-fill" aria-hidden="true" />
                  <span>{path == "cosplay" ? "Model" : "Brand"}</span>
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
                    {/* 6. Penyesuaian karena prop 'child' sudah dihapus di Button */}
                    <span>{doc}</span>
                    <span>({total})</span>
                  </Button>
                ))}
            </div>

            {/* --- TAGS SECTION --- */}
            <div className="grid md:grid-cols-6 grid-cols-1 gap-1 w-full p-3">
              <div className="md:col-span-6 mb-1">
                <div className="text-zinc-200 flex gap-2 text-xs font-bold capitalize ml-2">
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
      )}
    </div>
  );
}
