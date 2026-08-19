"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Button from "@/ui/uiButton";

export default function Post({ path, getApi, getSort, getCreator, getTag }) {
  const [loadCount, setLoadCount] = useState(24);
  const [getFilter, setFilter] = useState(false);

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
    <main>
      <div className="container mx-auto p-2">
        <h1 className="text-zinc-200 font-bold capitalize mb-2">
          <i className="bi bi-compass-fill mr-2" aria-hidden="true" />
          Discover {path}
        </h1>

        <section aria-labelledby="content-list">
          <h2
            id="content-list"
            className="text-zinc-400 text-sm font-bold capitalize mb-4"
          >
            Newly Uploaded Cosplay
          </h2>

          <div
            className={`grid gap-x-2 gap-y-4 mb-6 ${
              path === "hentai" || path === "cosplay"
                ? "grid-cols-3 md:grid-cols-6"
                : "grid-cols-2 md:grid-cols-4"
            }`}
          >
            {result.slice(0, loadCount).map((doc, i) => (
              <article key={doc.id}>
                <Link
                  href={`/${path}/${doc.id}`}
                  aria-label={doc.xtitle}
                  className="w-full! h-min! active:scale-98"
                >
                  <img
                    src={
                      path === "cosplay"
                        ? `/img/${doc?.id}/(1).webp`
                        : `/img/pah/${doc?.id}.webp`
                    }
                    alt={doc?.xtitle || `${path} content`}
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className={`${
                      path === "hentai" || path === "cosplay"
                        ? "aspect-2/2.75"
                        : "aspect-5/3"
                    } w-full object-cover rounded bg-zinc-800`}
                  />

                  <div className="flex flex-col py-2">
                    <div className="flex gap-2 mb-1 text-zinc-400 text-xs font-light">
                      <i className="bi bi-eye-fill" aria-hidden="true" />

                      <span>
                        {doc?.id
                          ? parseInt(doc.id.slice(-4), 10).toLocaleString(
                              "en-US"
                            )
                          : 0}{" "}
                        views
                      </span>
                    </div>

                    <h3 className="line-clamp-2 text-xs text-zinc-200 font-semibold capitalize">
                      {doc?.xtitle}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {loadCount < result.length && (
            <div className="flex justify-center my-10">
              <Button onClick={() => setLoadCount((prev) => prev + 12)}>
                Load More
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
