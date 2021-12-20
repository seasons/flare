import { Box, Display, Layout, Skeleton, Spacer } from "components"
import { Grid } from "components/Grid"
import { initializeApollo } from "lib/apollo/apollo"
import React from "react"
import styled from "styled-components"

import { Schema, screenTrack } from "../utils/analytics"

export const GiftPage = screenTrack(() => ({
  page: Schema.PageNames.PrivacyPolicy,
  path: "/gift",
}))(() => {
  const siteID = process.env.GIFTUP_SITE_ID
  return (
    <Layout>
      <Grid px={[2, 2, 2, 2, 2]}>
        <Container>
          <Box mb={5}>
            <Display size="9">Seasons Gift</Display>
          </Box>
          <Placeholder>
            <Skeleton width={512} height={314} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={40} />
            <Spacer mt={2} />
            <Skeleton width={512} height={80} />
            <Spacer mt={4} />
          </Placeholder>
          <div className="gift-up-target" data-site-id={siteID} data-platform="Other" data-language="en-US"></div>
          <script type="text/javascript" src="/js/giftup.js"></script>
        </Container>
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

const Container = styled.div`
  min-height: 100vh;
  width: 520px;
  margin: 20px auto;
  position: relative;

  .gift-up-target {
    margin-top: 80px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 2100px;
  }
`

const Placeholder = styled.div`
  min-height: 1088px;
`

export default GiftPage
