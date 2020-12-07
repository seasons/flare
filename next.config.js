const withFonts = require("next-fonts")
const withImages = require("next-images")
const withSourceMaps = require("@zeit/next-source-maps")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

const appDownload = "https://szns.co/app"
module.exports = withSourceMaps(
  withImages(
    withFonts({
      env: {
        MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
        ENVIRONMENT: process.env.ENVIRONMENT,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        SEGMENT_KEY: process.env.SEGMENT_KEY,
        NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE: process.env.NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE,
      },
      webpack: (config) => {
        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          // Transform all direct `react-native` imports to `react-native-web`
          "react-native$": "react-native-web",
          "react-native-svg": "react-native-svg-web",
        }
        config.resolve.extensions = [".web.js", ".web.ts", ".web.tsx", ...config.resolve.extensions]

        config.plugins = [
          ...(config.plugins || []),
          new CopyPlugin({
            patterns: [
              {
                from: require.resolve("@seasons/try-with-seasons"),
                to: path.resolve(__dirname, "public/scripts/try-with-seasons.js"),
              },
            ],
          }),
        ]

        return config
      },
      async headers() {
        return [
          {
            source: "/fonts/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public,max-age=31536000,immutable"
              },
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET",
              }
            ]
          }
        ]
      },
      async redirects() {
        return [
          {
            source: "/browse/all",
            destination: "/browse",
            permanent: true,
          },
          {
            source: "/a/account",
            destination: "https://szns.co/app",
            permanent: false,
          },
        ]
      },
    })
  )
)

console.log({
  MONSOON_ENDPOINT: process.env.MONSOON_ENDPOINT,
})
