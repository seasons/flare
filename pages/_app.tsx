import App from "next/app"
import React from "react"
import { Theme } from "../lib/theme"
import { FontStyles } from "../lib/fonts"

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <FontStyles />
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </>
    )
  }
}
