const withFonts = require("next-fonts")
const withImages = require("next-images")
const withSourceMaps = require("@zeit/next-source-maps")

module.exports = withSourceMaps(
  withImages(
    withFonts({
      env: {
        MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
        ENVIRONMENT: process.env.ENVIRONMENT,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })
  )
)

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})
