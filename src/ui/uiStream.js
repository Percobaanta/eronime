"use client";

import { useEffect, useState } from "react";
import Button from "@/ui/uiButton";

export default function Stream({ getInfo, path }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(stored);
  }, []);

  const fakeUrls = [
    "https://ouo.io/EbN4Wi",
    "https://ouo.io/UF6icS",
    "https://ouo.io/Mzuj1MXy",
    "https://ouo.io/LZVNs30",
  ];

  return (
    <>
      {/* -------------------- */}
      {/* Embed video */}
      {/* -------------------- */}
      <div className="bg-black flex justify-center rounded! shadow drop-shadow md:p-2">
        {getInfo?.file_code ? (
          <iframe
            className="md:w-7/12 w-full aspect-video"
            src={`https://myvidplay.com/e/${getInfo?.file_code}`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        ) : getInfo?.linkid ? (
          <iframe
            className="md:w-7/12 w-full aspect-video"
            src={`https://streamtape.com/e/${getInfo?.linkid}`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center w-full my-24">
            <i className="bi bi-database-fill-x text-2xl mb-3" />
            <p className="text-xs font-semibold">Server Down</p>
          </div>
        )}
      </div>

      {/* -------------------- */}
      {/* Detail Video */}
      {/* -------------------- */}
      <div className="container md:w-11/12 w-full mx-auto p-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-zinc-200 font-semibold capitalize">
              {getInfo?.xtitle}
            </p>

            <span className="text-base-400 text-xs">
              <i className="bi bi-eye-fill mr-2" />

              {getInfo?.id
                ? parseInt(getInfo.id.slice(-4), 10).toLocaleString("en-US")
                : 0}
            </span>
          </div>

          <div className="bg-zinc-900 flex flex-col gap-4 p-4 rounded!">
            {/* --- creator/brand/pornstar --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon="person-vcard-fill"
                className="flex-none! cursor-default!"
              ></Button>

              <div className="flex flex-wrap">
                {getInfo?.xcreator.map((doc, i) => (
                  <Button key={i} size="sm" className="cursor-default!">
                    {doc}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- tags --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon="tag-fill"
                className="flex-none! cursor-default!"
              ></Button>

              <div className="flex flex-wrap">
                {getInfo?.xtags.map((doc, i) => (
                  <Button key={i} size="sm" className="cursor-default!">
                    {doc}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- uploaded --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon={"clock-fill"}
                className="flex-none! cursor-default!"
              ></Button>

              <div className="flex flex-wrap">
                <Button size="sm" className="cursor-default!">
                  <span>
                    {getInfo?.id && !isNaN(Number(getInfo.id))
                      ? new Date(Number(getInfo.id)).toISOString().split("T")[0]
                      : ""}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={bookmarks.includes(getInfo.id) ? "primary" : "base"}
              icon="bookmark-fill"
              onClick={() => {
                const updated = bookmarks.includes(getInfo.id)
                  ? bookmarks.filter((id) => id !== getInfo.id)
                  : [...bookmarks, getInfo.id];

                setBookmarks(updated);
                localStorage.setItem("bookmark", JSON.stringify(updated));
              }}
            />

            <Button
              href={`/d/link1`}
              variant="primary"
              icon="cloud-arrow-down-fill text-lg"
              className="w-fit"
              onClick={(e) => {
                const value = getInfo?.download_url || getInfo?.link || "";
                const encoded = btoa(unescape(encodeURIComponent(value)));

                sessionStorage.setItem("d", encoded);

                const fakeUrl =
                  fakeUrls[Math.floor(Math.random() * fakeUrls.length)];

                e.currentTarget.href = `/d/${fakeUrl}`;
              }}
            >
              Download (HD)
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
