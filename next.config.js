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
        SEGMENT_KEY: process.env.SEGMENT_KEY,
        NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE: process.env.NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE
      },
      webpack: (config) => {
        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          // Transform all direct `react-native` imports to `react-native-web`
          'react-native$': 'react-native-web',
        }
        config.resolve.extensions = [
          '.web.js',
          '.web.ts',
          '.web.tsx',
          ...config.resolve.extensions,
        ]
        return config
      }
    })
  )
)

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})
