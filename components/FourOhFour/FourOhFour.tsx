import { Flex, Layout, Link, Sans, Spacer } from "components"
import React from "react"

export const FourOhFour = () => {
  return (
    <Layout>
      <Flex
        style={{ flex: 1, height: "100%" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Flex style={{ flex: 1, height: "100%" }} flexDirection="row" justifyContent="center" alignItems="center">
          <Flex flexDirection="column" justifyContent="center">
            <Sans size="8">404</Sans>
            <Spacer mb={2} />
            <Sans size="6">Sorry! This page can not be found</Sans>
            <Spacer mb={3} />
            <Link href="/">
              <Sans size="4" style={{ textDecoration: "underline" }}>
                Take me back home
              </Sans>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}
