const sitemap = require("nextjs-sitemap-generator")

sitemap({
  baseUrl: "https://seasons.nyc",
  ignoredPaths: ["admin"],
  pagesDirectory: __dirname + "/pages",
  targetDirectory: "public/",
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: ["png", "jpg"],
})
