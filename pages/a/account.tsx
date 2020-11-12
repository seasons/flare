import React from "react"

import { Box, Layout, Sans, Spacer } from "../../components"
import { Nav, FEATURED_BRAND_LIST } from "../../components/Nav"
import { screenTrack } from "../../utils/analytics"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import { useQuery } from "@apollo/client"
import { initializeApollo } from "lib/apollo/apollo"

const Home = screenTrack(() => ({
  page: "AccountPage",
  path: "/a/account",
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

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: NAVIGATION_QUERY,
    variables: {
      brandSlugs: FEATURED_BRAND_LIST,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Home
