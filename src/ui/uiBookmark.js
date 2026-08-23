"use client";

import { useEffect, useState } from "react";
import Card from "@/ui/uiCard";
import Heading from "@/ui/uiHeading";

export default function Bookmark({ getApi }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(stored);
  }, []);

  const bookmarkedData = getApi.filter((doc) => bookmarks.includes(doc.id));

  return (
    <>
      <section>
        <Heading icon={"bookmark-fill"} title={"Bookmark"}></Heading>

        <div className="grid gap-x-2 gap-y-4 grid-cols-3 md:grid-cols-6 mb-6">
          {bookmarkedData.map((doc) => (
            <article key={doc.id} className="flex flex-col gap-4">
              <Card
                href={`${doc?.xtype}/${doc?.id}`}
                src={
                  doc?.xtype === "cosplay"
                    ? `/img/${doc?.id}/(1).webp`
                    : `/img/pah/${doc?.id}.webp`
                }
                type={doc.xtype}
                variant={"potrait"}
                title={doc.xtitle}
              ></Card>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
