export async function apiDoodstream() {
  const params = new URLSearchParams({
    key: process.env.DOODSTREAM_API_KEY,
  });

  try {
    const response = await fetch(
      `https://doodapi.com/api/file/list?${params.toString()}`,
      {
        next: {
          revalidate: 600,
          tags: ["lela"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const getJson = await response.json();
    const getApiDoodstream = getJson?.result?.files || [];

    return {
      getApiDoodstream,
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      getApiDoodstream: null,
    };
  }
}
