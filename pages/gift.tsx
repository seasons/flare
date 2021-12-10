import { initializeApollo } from "lib/apollo/apollo"
import React from "react"

import { Layout } from "../components"
import { Grid } from "../components/Grid"
import { Schema, screenTrack } from "../utils/analytics"

export const GiftPage = screenTrack(() => ({
  page: Schema.PageNames.PrivacyPolicy,
  path: "/gift",
}))(() => {
  return (
    <Layout>
      <Grid px={[2, 2, 2, 2, 2]}>
        <div
          className="gift-up-target"
          data-site-id="f6a29c47-7692-4936-8c95-bfb707c2e95c"
          data-platform="Other"
          data-language="en-US"
        ></div>
        <script type="text/javascript" src="/js/giftup.js"></script>
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
