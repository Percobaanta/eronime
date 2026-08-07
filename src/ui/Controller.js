"use client";

import { useState } from "react";
import Navbar from "@/ui/uiNavbar";
import Filter from "@/ui/uiFilter";
import Search from "@/ui/uiSearch";
import Bookmark from "@/ui/uiBookmark";
import Gallery from "@/ui/uiGallery";
import Stream from "@/ui/uiStream";
import Post from "@/ui/uiPost";

export default function Controller({ getApi, getInfo, path, view }) {
  const [getSearch, setSearch] = useState("");
  const [getSort, setSort] = useState("date");
  const [getCreator, setCreator] = useState("");
  const [getTag, setTag] = useState("");

  return (
    <>
      {(path === "/" || path === "porn") && view === "post" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          <Filter
            path={path}
            getApi={getApi}
            getSort={getSort}
            setSort={setSort}
            getCreator={getCreator}
            setCreator={setCreator}
            getTag={getTag}
            setTag={setTag}
          />

          <Post
            path={path}
            getApi={getApi}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          />
        </>
      )}

      {path === "animated" && view === "post" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          <Filter
            path={path}
            getApi={getApi}
            getSort={getSort}
            setSort={setSort}
            getCreator={getCreator}
            setCreator={setCreator}
            getTag={getTag}
            setTag={setTag}
          />

          <Post
            path={path}
            getApi={getApi}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          />
        </>
      )}

      {path === "hentai" && view === "post" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          {/* <Filter
            path={path}
            getApi={getApi}
            getSort={getSort}
            setSort={setSort}
            getCreator={getCreator}
            setCreator={setCreator}
            getTag={getTag}
            setTag={setTag}
          /> */}

          <div className="flex flex-col items-center justify-center w-full my-24">
            <i className="bi bi-gear-wide-connected text-4xl mb-3" />
            <p className="text-xlgl font-semibold">Maintenance</p>
          </div>

          {/* <Post
            path={path}
            getApi={getApi}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          /> */}
        </>
      )}

      {path === "cosplay" && view === "post" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          <Filter
            path={path}
            getApi={getApi}
            getSort={getSort}
            setSort={setSort}
            getCreator={getCreator}
            setCreator={setCreator}
            getTag={getTag}
            setTag={setTag}
          />

          <Post
            path={path}
            getApi={getApi}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          />
        </>
      )}

      {path === "search" && view === "search" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          <Search
            getApi={getApi}
            getSearch={getSearch}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          />
        </>
      )}

      {path === "bookmark" && view === "bookmark" && (
        <>
          <Navbar path={path} setSearch={setSearch} />

          <Filter path={path} view={view} getApi={getApi} />

          <Bookmark getApi={getApi} />
        </>
      )}

      {(path === "porn" || path === "animated" || path === "hentai") &&
        view === "stream" && (
          <>
            <Navbar setSearch={setSearch} />

            <Filter path={path} view={view} getApi={getApi} />

            <Stream getInfo={getInfo} />

            <Post path={path} getApi={getApi} />
          </>
        )}

      {path === "cosplay" && view === "gallery" && (
        <>
          <Navbar setSearch={setSearch} />

          <Filter path={path} view={view} getApi={getApi} />

          <Gallery path={path} getInfo={getInfo} />

          <Post path={path} getApi={getApi} />
        </>
      )}
    </>
  );
}
