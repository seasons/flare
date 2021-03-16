import "public/css/fonts.css"
import "public/css/app.css"

import { createMediaStyle } from "components/Responsive"
import { RouterProgress } from "components/RouterProgress"
import { useApollo } from "lib/apollo/apollo"
import { AuthProvider } from "lib/auth/AuthProvider"
import { FontStyles } from "lib/fonts"
import { Theme } from "lib/theme"
import React from "react"
import { BaseCSS } from "styled-bootstrap-grid"

import { ApolloProvider } from "@apollo/client"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import { ModalProvider } from "components/Modal/ModalProvider"
import { Modal } from "components/Modal"

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
        <ModalProvider>
          <FontStyles />
          <BaseCSS />
          <RouterProgress />
          <style type="text/css">{createMediaStyle()}</style>

          <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
          <link href="/css/app.css" rel="stylesheet" type="text/css" />

          <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="/images/webclip.png" rel="apple-touch-icon" />

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <script src="https://js.chargebee.com/v2/chargebee.js" async defer />
          <script
            src="https://www.paypal.com/sdk/js?client-id=ARy5d0-3a-eUf8v_5ZaBdJ42ZJ8RDJcH-zCmtXNsX907lWBgkOPYX3n-4HPRtymgjZFrA6srEjZujGVd"
            async
            defer
          ></script>
          <Theme>
            <Component {...pageProps} />
            <Modal />
          </Theme>
        </ModalProvider>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
