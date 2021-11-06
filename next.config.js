const withFonts = require("next-fonts")
const withImages = require("next-images")
const withSourceMaps = require("@zeit/next-source-maps")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

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
        ALGOLIA_INDEX: process.env.ALGOLIA_INDEX,
        ALGOLIA_ACCOUNT_ID: process.env.ALGOLIA_ACCOUNT_ID,
        ALGOLIA_KEY: process.env.ALGOLIA_KEY,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        ENABLE_EXPRESS_CHECKOUT: process.env.ENABLE_EXPRESS_CHECKOUT,
        ENABLE_BUY_USED: process.env.ENABLE_BUY_USED,
        SHOW_DISCOVER_BAG_STEP: process.env.SHOW_DISCOVER_BAG_STEP,
      },
      webpack: (config, options) => {
        const { dir } = options

        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          // Transform all direct `react-native` imports to `react-native-web`
          "react-native$": "react-native-web",
          "react-native-svg": "react-native-svg-web-transform",
        }
        config.resolve.extensions = [".tsx", ".ts", ".web.js", ".web.ts", ".web.tsx", ...config.resolve.extensions]

        config.module.rules.push({
          test: /\.(ts)x?$/, // Just `tsx?` file only
          include: /node_modules/,
          // exclude: [dir],
          use: [
            options.defaultLoaders.babel,
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                experimentalWatchApi: true,
                onlyCompileBundledFiles: true,
              },
            },
          ],
        })

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
                value: "public,max-age=31536000,immutable",
              },
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET",
              },
            ],
          },
          {
            source: "/scripts/try-with-seasons.js",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET",
              },
            ],
          },
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
