const withFonts = require("next-fonts")

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})

module.exports = withFonts({
  env: {
    MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
  },
})
