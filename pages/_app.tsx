import App from "next/app"
import React from "react"
import { Theme } from "../lib/theme"
import { FontStyles } from "../lib/fonts"
import { BaseCSS } from "styled-bootstrap-grid"

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <FontStyles />
        <BaseCSS />
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </>
    )
  }
}
