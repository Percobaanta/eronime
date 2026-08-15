"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/ui/uiButton";

export default function Bookmark({ getApi }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(stored);
  }, []);

  const bookmarkedData = getApi.filter((doc) => bookmarks.includes(doc.id));

  return (
    <>
      <div className="container md:w-11/12 w-full mx-auto p-2">
        <p className="text-zinc-200 font-bold">
          <i className="bi bi-bookmark-fill mr-2"></i> Bookmark
        </p>

        <span className="text-zinc-400 text-xs">
          Manage your collection add or remove bookmark
        </span>
      </div>

      <div className="container md:w-11/12 w-full mx-auto p-2">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-3 gap-y-5 mb-10">
          {bookmarkedData.map((doc) => (
            <div key={doc.id} className="flex flex-col gap-3">
              <Link
                href={`${doc?.xtype}/${doc?.id}`}
                className="w-full! h-min!"
              >
                <Image
                  src={
                    doc?.xtype === "cosplay"
                      ? `/img/${doc?.id}/(1).webp`
                      : `/img/pah/${doc?.id}.webp`
                  }
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9Im9rbGNoKDM3JSAwLjAxMyAyODUuODA1KSIvPjwvc3ZnPg=="
                  alt={doc?.xtitle || "eronime"}
                  quality={75}
                  width={512}
                  height={512}
                  className={`aspect-square w-full object-cover rounded`}
                />
              </Link>

              <Button
                href={`${doc?.xtype}/${doc?.id}`}
                className="line-clamp-1! h-min! w-full! p-0!"
              >
                {doc?.xtitle}
              </Button>

              <div className="flex gap-3">
                <Button
                  href={doc?.xtype}
                  variant="base"
                  size="sm"
                  className="w-full!"
                >
                  {doc?.xtype}
                </Button>

                <Button
                  variant="base"
                  size="sm"
                  icon="trash-fill"
                  className="flex-none"
                  onClick={() => {
                    const updated = bookmarks.filter((id) => id !== doc?.id);

                    setBookmarks(updated);
                    localStorage.setItem("bookmark", JSON.stringify(updated));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
