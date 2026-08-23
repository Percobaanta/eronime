"use client";

import { useEffect, useState } from "react";
import Button from "@/ui/uiButton";
import Heading from "@/ui/uiHeading";
import Label from "@/ui/uiLabel";

export default function Stream({ getInfo, path }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(stored);
  }, []);

  const fakeUrls = [
    "https://ouo.io/4NFemA",
    "https://ouo.io/2HwnWR",
    "https://ouo.io/51eI8s",
    "https://ouo.io/c5hBUY",
  ];

  return (
    <>
      <div className="bg-black flex justify-center rounded shadow drop-shadow md:p-2 mb-4">
        {getInfo?.file_code ? (
          <iframe
            className="md:w-7/12 w-full aspect-video"
            src={`https://myvidplay.com/e/${getInfo?.file_code}`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            title="Embedded content"
            loading="lazy"
          ></iframe>
        ) : getInfo?.linkid ? (
          <iframe
            className="md:w-7/12 w-full aspect-video"
            src={`https://streamtape.com/e/${getInfo?.linkid}`}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            title="Embedded content"
            loading="lazy"
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center w-full my-24">
            <i className="bi bi-database-fill-x text-2xl mb-3" />
            <p className="text-xs font-semibold">Server Down</p>
          </div>
        )}
      </div>

      <section>
        <div className="flex flex-col gap-1">
          <Heading title={getInfo?.xtitle} className="mb-0!"></Heading>

          <Label
            icon={"eye-fill"}
            title={
              getInfo?.id
                ? parseInt(getInfo.id.slice(-4), 10).toLocaleString("en-US")
                : 0
            }
          ></Label>
        </div>

        <div className="bg-zinc-900 flex flex-col gap-4 p-4 rounded">
          {/* --- creator/brand/pornstar --- */}
          <div className="flex gap-4 items-top">
            <Button
              size="sm"
              variant="baseActive"
              icon="person-vcard-fill"
              className="flex-none! cursor-default!"
            ></Button>

            <div className="flex flex-wrap gap-2">
              {getInfo?.xcreator.map((doc, i) => (
                <Label key={i} title={doc}></Label>
              ))}
            </div>
          </div>

          {/* --- tags --- */}
          <div className="flex gap-4 items-top">
            <Button
              size="sm"
              variant="baseActive"
              icon="tag-fill"
              className="flex-none! cursor-default!"
            ></Button>

            <div className="flex flex-wrap gap-2">
              {getInfo?.xtags.map((doc, i) => (
                <Label key={i} title={doc}></Label>
              ))}
            </div>
          </div>

          {/* --- uploaded --- */}
          <div className="flex gap-4 items-top">
            <Button
              size="sm"
              variant="baseActive"
              icon={"clock-fill"}
              className="flex-none! cursor-default!"
            ></Button>

            <div className="flex flex-wrap gap-2">
              <Label
                title={
                  getInfo?.id && !isNaN(Number(getInfo.id))
                    ? new Date(Number(getInfo.id)).toISOString().split("T")[0]
                    : ""
                }
              ></Label>
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
            href="#"
            variant="primary"
            icon="cloud-arrow-down-fill text-lg"
            onClick={(e) => {
              e.preventDefault();

              const value = getInfo?.download_url || getInfo?.link || "";

              const encoded = btoa(unescape(encodeURIComponent(value)));

              sessionStorage.setItem("d", encoded);

              const fakeUrl =
                fakeUrls[Math.floor(Math.random() * fakeUrls.length)];

              window.location.href = fakeUrl;
            }}
          >
            Download (HD)
          </Button>
        </div>
      </section>
    </>
  );
}
