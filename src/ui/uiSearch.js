"use client";

import { useState } from "react";
import Button from "@/ui/uiButton";

export default function Search({ getApi, getSearch = "" }) {
  const [visibleCount, setVisibleCount] = useState(15);

  const searchData = getApi?.filter((doc) =>
    doc?.xtitle?.toLowerCase().includes(getSearch.toLowerCase())
  );

  return (
    <div className="container md:w-11/12 w-full mx-auto p-4">
      <div className="flex flex-col w-full">
        {searchData.slice(0, visibleCount).map((doc) => (
          <Button
            key={doc.id}
            href={`/${doc?.xtype}/${doc?.id}`}
            variant="ghost"
            className="h-min! w-full! flex flex-col justify-start! items-start gap-0! py-2 rounded-lg"
          >
            <div className="flex flex-row justify-between items-center w-full">
              <p className="capitalize text-white line-clamp-1">
                {doc?.xtitle}
              </p>

              <small className="text-zinc-400 flex gap-1">
                <i className="bi bi-eye-fill" aria-hidden="true" />
                <span>
                  {doc?.id
                    ? parseInt(doc.id.slice(-4), 10).toLocaleString("en-US")
                    : 0}
                </span>
              </small>
            </div>

            <small className="capitalize text-zinc-500 mt-1">
              {doc?.xtype}
            </small>
          </Button>
        ))}

        {visibleCount < searchData.length && (
          <div className="flex justify-center my-10">
            <Button onClick={() => setVisibleCount((prev) => prev + 15)}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
