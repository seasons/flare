import { Box, Display, Layout, MaxWidth, Sans, Spacer } from "components"
import { Col, Grid, Row } from "components/Grid"
import { BrandHit } from "components/Search/BrandHit"
import { ProductHit } from "components/Search/ProductHit"
import { SearchProvider } from "components/Search/SearchProvider"
import { initializeApollo } from "lib/apollo"
import { useRouter, withRouter } from "next/router"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React from "react"
import { connectSearchBox, Hits, Index } from "react-instantsearch-dom"
import styled from "styled-components"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

const VirtualSearchBox = connectSearchBox(() => null)

const CustomHits = styled(Hits)`
  .ais-Hits-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
  }

  .ais-Hits-item {
    list-style: none;
    height: 350px;
  }
`

const Search: React.FC = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.SearchPage,
    entitySlug: router?.query?.q,
    path: router?.asPath,
  }
})(() => {
  const router = useRouter()
  const query = router.query?.q as string
  const { data: navigationData } = useQuery(NAVIGATION_QUERY)
  const featuredBrandItems = navigationData?.brands || []

  if (!query) {
    return <></>
  }

  return (
    <Layout brandItems={featuredBrandItems}>
      <Box pt={"80px"}>
        <Grid px={[2, 2, 2, 2, 2]}>
          <Row>
            <Col md="12" sm="12">
              <Box mb={5}>
                <Display size="9">{`Results for "${query}"`}</Display>
              </Box>
              <SearchProvider>
                <VirtualSearchBox defaultRefinement={query} />

                <Index indexName="product_staging">
                  <Box my={2}>
                    <Sans size="8">Products</Sans>
                  </Box>
                  <CustomHits hitComponent={ProductHit} />
                </Index>

                <Index indexName="brand_staging">
                  <Box my={2}>
                    <Sans size="8">Brands</Sans>
                  </Box>
                  <CustomHits hitComponent={BrandHit} />
                </Index>
              </SearchProvider>
            </Col>
          </Row>
        </Grid>
      </Box>
    </Layout>
  )
})

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: NAVIGATION_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default withRouter(Search)
