import "../public/css/app.css"

import { wrapper } from "lib/store"
import React from "react"
import { BaseCSS } from "styled-bootstrap-grid"

import { ApolloProvider } from "@apollo/client"

import { createMediaStyle } from "../components/Responsive"
import { useApollo } from "../lib/apollo"
import { FontStyles } from "../lib/fonts"
import { Theme } from "../lib/theme"

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <FontStyles />
      <BaseCSS />
      <style type="text/css">{createMediaStyle()}</style>

      <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
      <link href="/css/components.css" rel="stylesheet" type="text/css" />
      <link href="/css/fonts.css" rel="stylesheet" type="text/css" />
      <link href="/css/seasons-4d21cb.css" rel="stylesheet" type="text/css" />

      <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
      <link href="/images/webclip.png" rel="apple-touch-icon" />

      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <script src="https://js.chargebee.com/v2/chargebee.js" />
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </ApolloProvider>
  )
}

export default wrapper.withRedux(App)
