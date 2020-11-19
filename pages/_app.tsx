import "../public/css/fonts.css"
import "../public/css/app.css"

import { RouterProgress } from "components/RouterProgress"
import { AuthProvider } from "lib/auth/AuthProvider"
import React, { useEffect } from "react"
import { BaseCSS } from "styled-bootstrap-grid"

import { ApolloProvider } from "@apollo/client"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"

import { createMediaStyle } from "../components/Responsive"
import { useApollo } from "../lib/apollo/apollo"
import { FontStyles } from "../lib/fonts"
import { Theme } from "../lib/theme"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <AuthProvider apolloClient={apolloClient}>
      <ApolloProvider client={apolloClient}>
        <FontStyles />
        <BaseCSS />
        <RouterProgress />
        <style type="text/css">{createMediaStyle()}</style>

        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />

        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <script src="https://js.chargebee.com/v2/chargebee.js" async defer />
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
