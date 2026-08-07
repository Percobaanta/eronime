export async function apiStreamtape() {
  const params = new URLSearchParams({
    login: process.env.STREAMTAPE_LOGIN,
    key: process.env.STREAMTAPE_KEY,
  });

  try {
    const response = await fetch(
      `https://api.streamtape.com/file/listfolder?${params.toString()}`,
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
    const getApiStreamtape = getJson?.result?.files || [];

    return {
      getApiStreamtape,
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      getApiStreamtape: null,
    };
  }
}
