"use client";

import { useState } from "react";
import Button from "@/ui/uiButton";
import Card from "@/ui/uiCard";
import Link from "next/link";
import Heading from "@/ui/uiHeading";

export default function Search({ getApi, getSearch = "" }) {
  const [visibleCount, setVisibleCount] = useState(15);

  const searchData = getApi?.filter((doc) =>
    doc?.xtitle?.toLowerCase().includes(getSearch.toLowerCase())
  );

  return (
    <section>
      <Heading icon={"search"} title={"Search Result"}></Heading>

      <div className="grid gap-x-2 gap-y-4 grid-cols-3 md:grid-cols-6 mb-6">
        {searchData.map((doc) => (
          <article key={doc.id}>
            <Card
              href={`/${doc.xtype}/${doc.id}`}
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
  );
}
