const withFonts = require("next-fonts")
module.exports = withFonts({
  env: {
    MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
  },
})
