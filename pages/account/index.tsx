import React from "react"

import { Box, Layout, Sans, Spacer } from "../../components"
import { Nav, FEATURED_BRAND_LIST } from "../../components/Nav"
import { screenTrack } from "../../utils/analytics"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import { useQuery } from "@apollo/client"

const Account = screenTrack(() => ({
  page: "AccountPage",
  path: "/account",
}))(() => {
  const { data } = useQuery(NAVIGATION_QUERY, {
    variables: {
      featuredBrandSlugs: FEATURED_BRAND_LIST,
    },
  })
  const featuredBrandItems = data?.brands || []

  return (
    <Layout fixedNav brandItems={featuredBrandItems}>
      <Nav fixed brandItems={featuredBrandItems} />

      <Spacer mb={10} />

      <Box my={10}>
        <Box px={[2, 2, 2, 5, 5]} mx="auto">
          <Box my={4}>
            <Sans size="6" style={{ align: "center" }}>
              This page is currently unavailable.
            </Sans>
          </Box>
          <Sans size="3" style={{ align: "center" }}>
            <a href="https://szns.co/app">Download the app to continue</a>
          </Sans>
        </Box>
      </Box>
    </Layout>
  )
})

export default Account
