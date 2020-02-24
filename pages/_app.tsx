import App from "next/app"
import React from "react"
import { Theme } from "../lib/theme"
import { FontStyles } from "../lib/fonts"
import { BaseCSS } from "styled-bootstrap-grid"
import "../public/css/app.css"

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <FontStyles />
        <BaseCSS />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/components.css" rel="stylesheet" type="text/css" />
        <link href="/css/fonts.css" rel="stylesheet" type="text/css" />
        <link href="/css/seasons-4d21cb.css" rel="stylesheet" type="text/css" />

        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />

        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </>
    )
  }
}
