"use client";

import { useState } from "react";
import Button from "@/ui/uiButton";

export default function DoodUploadPage() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/admin/doodstream/remote-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          title,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Upload gagal");
      }

      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl mt-10">
      <div className="bg-zinc-800 space-y-3 p-4 rounded-lg">
        <h1 className="text-2xl font-bold">DoodStream Remote Upload</h1>

        <form onSubmit={handleUpload} className="space-y-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Video URL</label>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
              className="rounded-lg border border-zinc-700 px-4 py-2 w-full text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">File Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Video"
              className="rounded-lg border border-zinc-700 px-4 py-2 w-full text-sm outline-none"
            />
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Remote Upload"}
          </button> */}

          <Button type="submit" variant="primary">
            {loading ? "Uploading..." : "Remote Upload"}
          </Button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-5 rounded-lg bg-zinc-700 p-4">
            <p className="mb-3 font-medium text-yellow-400">
              Remote upload berhasil!
            </p>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">File Code:</span>{" "}
                {result.filecode}
              </div>

              <div>
                <span className="font-medium">Status:</span> Waiting /
                Processing
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
