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

  const pageInfoArray = [
    {
      type: "porn",
      title: "Watch Porn videos",
      desc: "Watch new and popular porn videos",
    },
    {
      type: "animated",
      title: "Watch Animated videos",
      desc: "Watch new and popular animated, 3d, ai videos.",
    },
    {
      type: "hentai",
      title: "Watch Animated videos",
      desc: "Watch new and popular animated, 3d, ai videos.",
    },
    {
      type: "cosplay",
      title: "Image Cosplay Collection",
      desc: "Beautiful girls clothed as your favorite characters.",
    },
  ];

  const pageInfo = pageInfoArray.find((f) => f.type === path);

  return (
    <div className="flex flex-col gap-3 mb-5">
      {/* --- menu filter --- */}
      <div className="bg-zinc-800">
        <div className="container mx-auto">
          <div className="flex flex-row gap-3 pb-3">
            <div className="grid md:grid-cols-12 grid-cols-4 grow gap-3">
              {["porn", "animated", "hentai", "cosplay"].map((doc, i) => {
                const isActive = path === doc;

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
        </div>
      </div>

      {/* --- popular tags --- */}
      {!getFilter && (
        <div className="container mx-auto">
          <div
            className={
              view === "stream" || view === "gallery" || view === "bookmark"
                ? "hidden"
                : ""
            }
          >
            {pageInfo && (
              <div className="my-2">
                <p className="font-bold text-white">{pageInfo.title}</p>
                {/* <span className="text-xs text-zinc-400">{pageInfo.desc}</span> */}
              </div>
            )}

            <div className="flex flex-nowrap overflow-y-scroll scrollbar-rounded gap-2 py-1">
              <Button
                size="sm"
                variant="primary"
                className="justify-between! flex-none! rounded!"
              >
                Recomended
              </Button>

              {Object.entries(tagCount)
                .slice(0, 10)
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
        </div>
      )}

      {getFilter && (
        <div className="container mx-auto">
          <div className="bg-zinc-800 overflow-hidden rounded-lg">
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

              {/* --- creator/brand section --- */}
              <div className="grid md:grid-cols-6 grid-cols-2 gap-1 w-full p-3">
                <div className="md:col-span-6 col-span-2">
                  <div className="text-zinc-200 flex gap-2 text-xs font-semibold capitalize ml-3">
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
      )}
    </div>
  );
}
