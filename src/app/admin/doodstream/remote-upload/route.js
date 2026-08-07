import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { url, title } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL wajib diisi",
        },
        { status: 400 }
      );
    }

    // Validasi URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "URL tidak valid",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.DOODSTREAM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "DOODSTREAM_API_KEY belum dikonfigurasi",
        },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      key: apiKey,
      url: url,
    });

    // Optional: nama file
    if (title) {
      params.append("new_title", title);
    }

    const response = await fetch(
      `https://doodapi.co/api/upload/url?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          message: data.msg || "Remote upload gagal",
          data,
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.msg,
      filecode: data.result?.filecode,
      data,
    });
  } catch (error) {
    console.error("DoodStream Remote Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 }
    );
  }
}
