const withFonts = require("next-fonts")
const withImages = require("next-images")

module.exports = withImages(
  withFonts({
    env: {
      MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
    },
  })
)

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})
