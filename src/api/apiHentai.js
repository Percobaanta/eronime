export async function apiHentai() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Percobaanta/eroapi/refs/heads/main/hentai.json",
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

    const getApiHentai = await response.json();

    return {
      getApiHentai,
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      getApiHentai: null,
    };
  }
}
