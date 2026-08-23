"use client";

import { useState } from "react";
import Navbar from "@/ui/uiNavbar";
import Post from "@/ui/uiPost";
import Search from "@/ui/uiSearch";
import Bookmark from "@/ui/uiBookmark";
import Gallery from "@/ui/uiGallery";
import Stream from "@/ui/uiStream";
import Button from "@/ui/uiButton";

export default function Controller({ getApi, getInfo, path, view }) {
  const [getSearch, setSearch] = useState("");
  const [getSort, setSort] = useState("date");
  const [getCreator, setCreator] = useState("");
  const [getTag, setTag] = useState("");

  return (
    <>
      {path === "porn" && view === "post" && (
        <>
          <header>
            <Navbar
              path={path}
              view={view}
              setSearch={setSearch}
              getApi={getApi}
              getSort={getSort}
              setSort={setSort}
              getCreator={getCreator}
              setCreator={setCreator}
              getTag={getTag}
              setTag={setTag}
            />
          </header>

          <main>
            <Post
              path={path}
              view={view}
              getApi={getApi}
              getSort={getSort}
              getCreator={getCreator}
              getTag={getTag}
            />
          </main>
        </>
      )}

      {path === "animated" && view === "post" && (
        <>
          <header>
            <Navbar
              path={path}
              setSearch={setSearch}
              getApi={getApi}
              getSort={getSort}
              setSort={setSort}
              getCreator={getCreator}
              setCreator={setCreator}
              getTag={getTag}
              setTag={setTag}
            />
          </header>

          <main>
            <Post
              path={path}
              getApi={getApi}
              getSort={getSort}
              getCreator={getCreator}
              getTag={getTag}
            />
          </main>
        </>
      )}

      {path === "hentai" && view === "post" && (
        <>
          {/* <header>
            <Navbar
              path={path}
              setSearch={setSearch}
              getApi={getApi}
              getSort={getSort}
              setSort={setSort}
              getCreator={getCreator}
              setCreator={setCreator}
              getTag={getTag}
              setTag={setTag}
            />
          </header>

          <main>
            <Post
              path={path}
              getApi={getApi}
              getSort={getSort}
              getCreator={getCreator}
              getTag={getTag}
            />
          </main> */}

          <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl text-center font-bold">Hentai Page</h1>

            <p className="text-zinc-400">Under Maintenance</p>

            <Button href="/" variant="primary" className="px-6">
              Back
            </Button>
          </div>
        </>
      )}

      {path === "cosplay" && view === "post" && (
        <>
          <header>
            <Navbar
              path={path}
              setSearch={setSearch}
              getApi={getApi}
              getSort={getSort}
              setSort={setSort}
              getCreator={getCreator}
              setCreator={setCreator}
              getTag={getTag}
              setTag={setTag}
            />
          </header>

          <main>
            <Post
              path={path}
              getApi={getApi}
              getSort={getSort}
              getCreator={getCreator}
              getTag={getTag}
            />
          </main>
        </>
      )}

      {path === "search" && view === "search" && (
        <>
          <header>
            <Navbar
              path={path}
              view={view}
              setSearch={setSearch}
              getApi={getApi}
              getSort={getSort}
              setSort={setSort}
              getCreator={getCreator}
              setCreator={setCreator}
              getTag={getTag}
              setTag={setTag}
            />
          </header>

          <main>
            <Search
              getApi={getApi}
              getSearch={getSearch}
              getSort={getSort}
              getCreator={getCreator}
              getTag={getTag}
            />
          </main>
        </>
      )}

      {path === "bookmark" && view === "bookmark" && (
        <>
          <header>
            <Navbar path={path} view={view} getApi={getApi} />
          </header>

          <main>
            <Bookmark getApi={getApi} />
          </main>
        </>
      )}

      {(path === "porn" || path === "animated" || path === "hentai") &&
        view === "stream" && (
          <>
            <header>
              <Navbar path={path} view={view} getApi={getApi} />
            </header>

            <main>
              <Stream getInfo={getInfo} />

              <Post path={path} view={view} getApi={getApi} />
            </main>
          </>
        )}

      {path === "cosplay" && view === "gallery" && (
        <>
          <header>
            <Navbar path={path} view={view} getApi={getApi} />
          </header>

          <main>
            <Gallery path={path} getInfo={getInfo} />

            <Post path={path} getApi={getApi} />
          </main>
        </>
      )}
    </>
  );
}
