export async function apiCosplay() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Percobaanta/eroapi/refs/heads/main/cosplay.json",
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

    const getApiCosplay = await response.json();

    return {
      getApiCosplay,
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      getApiCosplay: null,
    };
  }
}
