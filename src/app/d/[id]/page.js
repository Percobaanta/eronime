"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Download() {
  const router = useRouter();

  useEffect(() => {
    const encoded = sessionStorage.getItem("d");

    if (!encoded) {
      router.replace("/");
      return;
    }

    try {
      const url = decodeURIComponent(escape(atob(encoded)));

      sessionStorage.removeItem("d");

      window.location.replace(url);
    } catch (error) {
      console.error("Invalid encoded URL:", error);

      sessionStorage.removeItem("d");
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <i className="bi bi-arrow-repeat text-2xl animate-spin" />
    </div>
  );
}
