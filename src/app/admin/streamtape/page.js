"use client";

import { useState } from "react";

export default function StreamtapePage() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/admin/streamtape/remote-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          name: name || undefined,
          folder: folder || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Remote upload gagal");
      }

      setResult(data);

      setUrl("");
      setName("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold">Streamtape Remote Upload</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          {/* URL */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Remote URL
            </label>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* File Name */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              File Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="video.mp4"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Folder */}
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Folder ID
            </label>

            <input
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !url}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Remote Upload"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <div className="font-semibold text-green-400">
              Remote upload berhasil ditambahkan
            </div>

            {result.result?.id && (
              <div className="mt-2 text-sm text-zinc-300">
                ID: <span className="font-mono">{result.result.id}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
