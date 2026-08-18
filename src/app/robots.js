export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/porn/", "/animated/", "/hentai/", "/cosplay/"],
      disallow: ["/api/", "/search/"],
    },

    sitemap: "https://eronime.com/sitemap.xml",
  };
}
