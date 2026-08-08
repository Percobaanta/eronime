"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/ui/uiButton";

export default function Post({ path, getApi, getSort, getCreator, getTag }) {
  const [loadCount, setLoadCount] = useState(24);

  const result = useMemo(() => {
    let data = [...getApi];

    if (getCreator) {
      data = data.filter((e) => e.xcreator?.includes(getCreator));
    }

    if (getTag) {
      data = data.filter((e) => e.xtags?.includes(getTag));
    }

    if (getSort === "view") {
      data.sort(
        (a, b) =>
          (parseInt(b.id.slice(-4), 10) || 0) -
          (parseInt(a.id.slice(-4), 10) || 0)
      );
    } else if (getSort === "view_down") {
      data.sort(
        (a, b) =>
          (parseInt(a.id.slice(-4), 10) || 0) -
          (parseInt(b.id.slice(-4), 10) || 0)
      );
    } else if (getSort === "title") {
      data.sort((a, b) => a.xtitle.localeCompare(b.xtitle));
    } else if (getSort === "title_down") {
      data.sort((a, b) => b.xtitle.localeCompare(a.xtitle));
    } else if (getSort === "date") {
      data.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (getSort === "date_down") {
      data.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return data;
  }, [getApi, getCreator, getTag, getSort]);

  return (
    <>
      {/* --- porn label --- */}
      {path == "porn" && (
        <div className="mb-5">
          <p className="text-white font-bold">Watch Porn videos</p>
          <span className="text-zinc-400 text-xs">
            Watch new and popular porn videos
          </span>
        </div>
      )}

      {/* --- animated label --- */}
      {path == "animated" && (
        <div className="mb-5">
          <p className="text-white font-bold">Watch Animated videos</p>
          <span className="text-zinc-400 text-xs">
            Watch new and popular animated ,3d, ai videos.
          </span>
        </div>
      )}

      {/* --- hentai label --- */}
      {path == "hentai" && (
        <div className="mb-5">
          <p className="text-white font-bold">Watch Hentai videos</p>
          <span className="text-zinc-400 text-xs">
            Discover popular hentai videos.
          </span>
        </div>
      )}

      {/* --- cosplay label --- */}
      {path == "cosplay" && (
        <div className="mb-5">
          <p className="text-white font-bold">Image Cosplay Collection</p>
          <span className="text-zinc-400 text-xs">
            Beautiful girls clothed as your favorite characters.
          </span>
        </div>
      )}

      <div className={`grid grid-cols-2 md:grid-cols-6 gap-x-3 gap-y-5 mb-10`}>
        {result.slice(0, loadCount).map((doc) => (
          <Link
            key={doc.id}
            href={`/${path}/${doc.id}`}
            className="w-full! h-min! active:scale-98"
          >
            <div
              key={doc.id}
              className="aspect-square overflow-hidden relative rounded-lg"
            >
              <Image
                src={
                  path === "cosplay"
                    ? `/img/${doc?.id}/(1).webp`
                    : `/img/pah/${doc?.id}.webp`
                }
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9Im9rbGNoKDM3JSAwLjAxMyAyODUuODA1KSIvPjwvc3ZnPg=="
                alt={doc?.xtitle || "eronime"}
                quality={75}
                width={512}
                height={512}
                className="aspect-square w-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col py-2">
              <div className="flex gap-2 mb-1 text-zinc-400 text-xs font-light">
                <i className="bi bi-eye-fill" aria-hidden="true" />

                {new Date(Number(doc?.id)).toISOString().split("T")[0]}

                <span>
                  {doc?.id
                    ? parseInt(doc.id.slice(-4), 10).toLocaleString("en-US")
                    : 0}{" "}
                  views
                </span>
              </div>

              <h1 className="line-clamp-2 text-xs text-zinc-200 font-semibold capitalize">
                {doc?.xtitle}
              </h1>
            </div>
          </Link>
        ))}
      </div>

      {loadCount < result.length && (
        <div className="flex justify-center my-10">
          <Button onClick={() => setLoadCount((prev) => prev + 12)}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
