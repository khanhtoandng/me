const fs = require("fs");
const path = require("path");
const globby = require("globby");
const prettier = require("prettier");

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc");
  const pages = await globby([
    "src/app/**/*.tsx",
    "!src/app/**/*.test.tsx",
    "!src/app/**/_*.tsx",
    "!src/app/**/layout.tsx",
    "!src/app/**/loading.tsx",
    "!src/app/**/error.tsx",
    "!src/app/**/not-found.tsx",
    "!src/app/api/**",
  ]);

  const domain = "https://alshaer.onrender.com";
  const locales = ["en", "ar"];
  const currentDate = new Date().toISOString();

  // Create sitemap entries for each page
  const pageEntries = pages
    .map((page) => {
      // Get the route from the file path
      const route = page
        .replace("src/app", "")
        .replace("/page.tsx", "")
        .replace(".tsx", "");

      // Skip dynamic routes
      if (route.includes("[") || route.includes("(")) {
        return null;
      }

      // Create entries for each locale
      const localeEntries = locales.map((locale) => {
        const localePath = `${domain}/${locale}${route === "/page" ? "" : route}`;
        return `
          <url>
            <loc>${localePath}</loc>
            <lastmod>${currentDate}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${route === "/page" ? "1.0" : "0.8"}</priority>
          </url>
        `;
      });

      // Also include the non-localized route
      const nonLocalizedPath = `${domain}${route === "/page" ? "" : route}`;
      const nonLocalizedEntry = `
        <url>
          <loc>${nonLocalizedPath}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${route === "/page" ? "1.0" : "0.8"}</priority>
        </url>
      `;

      return [nonLocalizedEntry, ...localeEntries].join("");
    })
    .filter(Boolean)
    .join("");

  // Create the sitemap XML
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pageEntries}
    </urlset>
  `;

  // Format the XML
  const formattedSitemap = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // Write the sitemap to the public directory
  fs.writeFileSync(
    path.join(process.cwd(), "public", "sitemap.xml"),
    formattedSitemap,
  );

  console.log("Sitemap generated successfully!");
})();
