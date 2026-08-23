"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/ui/uiButton";
import Heading from "@/ui/uiHeading";
import Label from "@/ui/uiLabel";
import Icon from "@/ui/uiIcon";

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

  const fakeUrls = [
    "https://ouo.io/4NFemA",
    "https://ouo.io/2HwnWR",
    "https://ouo.io/51eI8s",
    "https://ouo.io/c5hBUY",
  ];

  return (
    <>
      <div className="grid md:grid-cols-8 grid-cols-4 gap-2">
        {Array.from({ length: 8 }, (_, i) => (
          <Button
            key={i}
            className="w-full! h-min! p-0! overflow-hidden"
            onClick={() => setCurrentIndex(i + 1)}
          >
            <img
              src={`/img/${getInfo?.id}/(${i + 1}).webp`}
              alt={getInfo?.xtitle || `${path} content`}
              width={512}
              height={512}
              loading="lazy"
              decoding="async"
              className="w-full aspect-square object-cover rounded bg-zinc-800"
            />
          </Button>
        ))}
      </div>

      <section>
        <div className="flexCol">
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

        <div className="flexCol bgPrimary gap-4! p-4!">
          {/* --- creator/brand/pornstar --- */}
          <div className="flexRow items-center gap-4!">
            <Icon
              icon={"person-vcard-fill"}
              variant={"baseActive"}
              size={"sm"}
            />

            <div className="flexWrap">
              {getInfo?.xcreator?.map((doc, i) => (
                <Label key={i} title={doc}></Label>
              ))}
            </div>
          </div>

          {/* --- tags --- */}
          <div className="flexRow items-center gap-4!">
            <Icon icon={"tag-fill"} variant={"baseActive"} size={"sm"} />

            <div className="flexWrap">
              {getInfo?.xtags?.map((doc, i) => (
                <Label key={i} title={doc}></Label>
              ))}
            </div>
          </div>

          {/* --- images count --- */}
          <div className="flexRow items-center gap-4!">
            <Icon icon={"images"} variant={"baseActive"} size={"sm"} />

            <div className="flexWrap">
              <Label title={`${getInfo?.xdesc} images`}></Label>
            </div>
          </div>

          {/* --- uploaded --- */}
          <div className="flexRow items-center gap-4!">
            <Icon icon={"clock-fill"} variant={"baseActive"} size={"sm"} />

            <div className="flexWrap">
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

        <div className="flexRow">
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

              const value = getInfo?.xdownload;

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

      {currentIndex !== null && (
        <>
          <div className="fixed inset-0 z-50 bg-zinc-900 p-3 flex flex-col gap-4 items-center justify-end">
            <div className="h-[5%] mb-auto flex items-center w-full gap-2 ml-auto">
              <p className="mr-auto text-xs line-clamp-2">
                {getInfo?.xtitle} _ ({getInfo?.xdesc} images)
              </p>

              <Button
                href="#"
                variant="primary"
                icon="cloud-arrow-down-fill text-lg"
                className="flex-none!"
                onClick={(e) => {
                  e.preventDefault();

                  const value = getInfo?.xdownload;

                  const encoded = btoa(unescape(encodeURIComponent(value)));

                  sessionStorage.setItem("d", encoded);

                  const fakeUrl =
                    fakeUrls[Math.floor(Math.random() * fakeUrls.length)];

                  window.location.href = fakeUrl;
                }}
              >
                Download (HD)
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
                alt={getInfo?.xtitle || `${path} content`}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="rounded max-w-full max-h-full mx-auto object-contain "
              />
            </div>

            <div className="md:w-4/12 w:full h-[15%] flex items-center gap-2">
              <Button
                // variant="primary"
                icon="chevron-left"
                className="flex-none"
                onClick={handlePrev}
              />

              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 8 }, (_, i) => (
                  <img
                    key={i}
                    src={`/img/${getInfo?.id}/(${i + 1}).webp`}
                    alt={getInfo?.xtitle || `${path} content`}
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className={`${
                      currentIndex !== i + 1 ? "brightness-40" : "border"
                    } w-full aspect-square object-cover rounded bg-zinc-800`}
                  />
                ))}
              </div>

              <Button
                // variant="primary"
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
