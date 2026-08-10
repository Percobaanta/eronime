"use client";

import Image from "next/image";
import Button from "@/ui/uiButton";
import { useEffect, useState } from "react";

export default function Gallery({ getInfo, path }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const totalImages = 8;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalImages ? 1 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === null) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          setCurrentIndex(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, totalImages]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(stored);
  }, []);

  const fakeUrls = ["link1", "link2", "link3", "link4"];

  return (
    <>
      {/* -------------------- */}
      {/* Gallery Image */}
      {/* -------------------- */}
      <div className="container md:w-11/12 w-full mx-auto p-4 pb-0">
        <div className="grid md:grid-cols-8 grid-cols-4 gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <Button
              key={i}
              className="w-full! h-min! p-0! rounded! overflow-hidden"
              onClick={() => setCurrentIndex(i + 1)}
            >
              <Image
                src={`/img/${getInfo?.id}/(${i + 1}).webp`}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9Im9rbGNoKDM3JSAwLjAxMyAyODUuODA1KSIvPjwvc3ZnPg=="
                alt={getInfo?.xtitle || "eronime"}
                quality={75}
                width={512}
                height={512}
                className="w-full aspect-square object-cover rounded-md!"
              />
            </Button>
          ))}
        </div>
      </div>

      {/* -------------------- */}
      {/* Detail Image */}
      {/* -------------------- */}
      <div className="container md:w-11/12 w-full mx-auto p-4">
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

          <div className="bg-zinc-900 flex flex-col gap-4 p-4 rounded-lg">
            {/* --- creator/brand/pornstar --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon="person-vcard-fill"
                className="flex-none! cursor-default! rounded-lg!"
              />
              <div className="flex flex-wrap">
                {getInfo?.xcreator?.map((doc, i) => (
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
                className="flex-none! cursor-default! rounded-lg!"
              />
              <div className="flex flex-wrap">
                {getInfo?.xtags?.map((doc, i) => (
                  <Button key={i} size="sm" className="cursor-default!">
                    {doc}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- images count --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon="images"
                className="flex-none! cursor-default! rounded-lg!"
              />
              <div className="flex flex-wrap">
                <Button size="sm" className="cursor-default!">
                  {getInfo?.xdesc} images
                </Button>
              </div>
            </div>

            {/* --- uploaded --- */}
            <div className="flex items-top">
              <Button
                size="sm"
                variant="baseActive"
                icon="clock-fill"
                className="flex-none cursor-default! rounded-lg!"
              />
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
                const value = getInfo?.download_url || "";
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

      {/* -------------------- */}
      {/* Carousel Image */}
      {/* -------------------- */}
      {currentIndex !== null && (
        <>
          <div className="fixed inset-0 z-50 bg-zinc-900 p-3 flex flex-col gap-3 items-center justify-end">
            <div className="h-[5%] mb-auto flex items-center w-full gap-3 ml-auto">
              <p className="mr-auto text-xs line-clamp-2">
                {getInfo?.xtitle} _ ({getInfo?.xdesc} images)
              </p>

              <Button
                href={`/d/${getInfo?.id}`}
                variant="primary"
                icon="cloud-arrow-down-fill"
                className="ml-auto"
                onClick={() => {
                  sessionStorage.setItem("d", getInfo.xdownload);
                }}
              >
                Download
              </Button>

              <Button
                variant="primary"
                icon="x"
                className="flex-none"
                onClick={() => setCurrentIndex(null)}
              />
            </div>

            <div className="h-[80%] flex items-center">
              <img
                src={`/img/${getInfo?.id}/(${currentIndex}).webp`}
                alt={getInfo?.xtitle || "eronime"}
                className="rounded-lg! max-w-full max-h-full mx-auto object-contain"
              />
            </div>

            <div className="md:w-4/12 w:full h-[15%] flex items-center gap-3">
              <Button
                variant="primary"
                icon="chevron-left"
                className="flex-none"
                onClick={handlePrev}
              />

              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 8 }, (_, i) => (
                  <img
                    key={i}
                    src={`/img/${getInfo?.id}/(${i + 1}).webp`}
                    className={`${
                      currentIndex !== i + 1 ? "brightness-40" : "border"
                    } w-full aspect-square object-cover rounded`}
                  />
                ))}
              </div>

              <Button
                variant="primary"
                icon="chevron-right"
                className="flex-none"
                onClick={handleNext}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
