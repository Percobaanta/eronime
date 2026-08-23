"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Button from "@/ui/uiButton";
import Card from "@/ui/uiCard";
import Heading from "@/ui/uiHeading";
import Label from "@/ui/uiLabel";

export default function Post({
  path,
  view,
  getApi,
  getSort,
  getCreator,
  getTag,
}) {
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
    <>
      <section>
        <Heading
          heading={view === "stream" || view === "gallery" ? "h2" : "h1"}
          title={
            view === "stream" || view === "gallery"
              ? "recomended"
              : path === "cosplay"
              ? "Hot cosplay collection"
              : `Hot ${path} video`
          }
        ></Heading>

        <div
          className={`grid gap-x-2 gap-y-4 mb-6 ${
            path === "hentai" || path === "cosplay"
              ? "grid-cols-3 md:grid-cols-6"
              : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {result.slice(0, loadCount).map((doc, i) => (
            <article key={doc.id}>
              <Card
                href={`/${path}/${doc.id}`}
                src={
                  doc?.xtype === "cosplay"
                    ? `/img/${doc?.id}/(1).webp`
                    : `/img/pah/${doc?.id}.webp`
                }
                type={
                  doc?.id
                    ? parseInt(doc.id.slice(-4), 10).toLocaleString("en-US")
                    : 0
                }
                variant={`${
                  path === "hentai" || path === "cosplay"
                    ? "potrait"
                    : "landscape"
                }`}
                title={doc.xtitle}
              ></Card>
            </article>
          ))}
        </div>

        {loadCount < result.length && (
          <div className="flexCenter">
            <Button onClick={() => setLoadCount((prev) => prev + 12)}>
              Load More
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
