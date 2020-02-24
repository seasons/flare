const withFonts = require("next-fonts")
module.exports = withFonts({
  env: {
    // MONSOON_ENDPOINT: "http://localhost:4000",
    MONSOON_ENDPOINT: "https://monsoon-staging.seasons.nyc",
  },
})
