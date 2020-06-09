const withFonts = require("next-fonts")
const withImages = require("next-images")

module.exports = withImages(
  withFonts({
    env: {
      MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
      NODE_ENV: process.env.NODE_ENV,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })
)

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})
