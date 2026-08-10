"use client";

import { useState } from "react";
import Navbar from "@/ui/uiNavbar";
import Post from "@/ui/uiPost";
import Search from "@/ui/uiSearch";
import Bookmark from "@/ui/uiBookmark";
import Gallery from "@/ui/uiGallery";
import Stream from "@/ui/uiStream";

export default function Controller({ getApi, getInfo, path, view }) {
  const [getSearch, setSearch] = useState("");
  const [getSort, setSort] = useState("date");
  const [getCreator, setCreator] = useState("");
  const [getTag, setTag] = useState("");

  return (
    <>
      {path === "porn" && view === "post" && (
        <>
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

          <Post
            path={path}
            getApi={getApi}
            getSort={getSort}
            getCreator={getCreator}
            getTag={getTag}
          />
        </>
      )}

      {path === "cosplay" && view === "post" && (
        <>
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
          <Navbar path={path} view={view} getApi={getApi} />

          <Bookmark getApi={getApi} />
        </>
      )}

      {(path === "porn" || path === "animated" || path === "hentai") &&
        view === "stream" && (
          <>
            <Navbar path={path} view={view} getApi={getApi} />

            <Stream getInfo={getInfo} />

            <Post path={path} getApi={getApi} />
          </>
        )}

      {path === "cosplay" && view === "gallery" && (
        <>
          <Navbar path={path} view={view} getApi={getApi} />

          <Gallery path={path} getInfo={getInfo} />

          <Post path={path} getApi={getApi} />
        </>
      )}
    </>
  );
}
