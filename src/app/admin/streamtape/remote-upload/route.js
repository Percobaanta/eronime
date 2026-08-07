import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url, name, folder } = await request.json();

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL wajib diisi",
        },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      login: process.env.STREAMTAPE_LOGIN,
      key: process.env.STREAMTAPE_KEY,
      url,
    });

    if (name) {
      params.set("name", name);
    }

    if (folder) {
      params.set("folder", folder);
    }

    const response = await fetch(
      `https://api.streamtape.com/remotedl/add?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (data.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          message: data.msg || "Remote upload gagal",
          data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Remote upload berhasil ditambahkan",
      result: data.result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
