export async function apiPorn() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Percobaanta/eroapi/refs/heads/main/porn.json",
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

    const getApiPorn = await response.json();

    return {
      getApiPorn,
    };
  } catch (err) {
    console.error("Fetch error:", err);

    return {
      getApiPorn: null,
    };
  }
}
