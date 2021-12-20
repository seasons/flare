import { initializeApollo } from "lib/apollo/apollo"
import React from "react"

import { Box, Layout } from "../components"
import { Grid } from "../components/Grid"
import { Schema, screenTrack } from "../utils/analytics"

export const GiftPage = screenTrack(() => ({
  page: Schema.PageNames.PrivacyPolicy,
  path: "/gift",
}))(() => {
  const siteID = process.env.GIFTUP_SITE_ID
  return (
    <Layout>
      <Grid px={[2, 2, 2, 2, 2]}>
        <Box style={{ minHeight: "600px" }}>
          <div className="gift-up-target" data-site-id={siteID} data-platform="Other" data-language="en-US"></div>
          <script type="text/javascript" src="/js/giftup.js"></script>
        </Box>
      </Grid>
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default GiftPage
