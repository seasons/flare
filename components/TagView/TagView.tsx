import { Box, Flex, Layout, Sans, Separator, Spacer } from "components"
import { DesignerTextSkeleton } from "components/Designer/DesignerTextSkeleton"
import { Col, Grid, Row } from "components/Grid"
import { HomepageCarousel } from "components/Homepage/HomepageCarousel"
import { ProgressiveImageProps } from "components/Image/ProgressiveImage"
import { ProductGridItem } from "components/Product/ProductGridItem"
import { ReadMore } from "components/ReadMore"
import { Media } from "components/Responsive"
import { Spinner } from "components/Spinner"
import { debounce } from "lodash"
import Head from "next/head"
import { withRouter } from "next/router"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"
import { GET_COLLECTION } from "queries/collectionQueries"

const TagView = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.CollectionPage,
    tag: router?.query?.Tag,
    path: router?.asPath,
  }
})(({ router }) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const [fetchingMore, setFetchingMore] = useState(false)
  const [productCount, setProductCount] = useState(8)
  const tag = decodeURI(router.query.Tag) || ""

  let title = ""
  let description = ""

  if (tag === "Revival Collection") {
    title = "The revival collection"
    description =
      "Revisit, rethink, restore ♻️ We’re starting off the new year by looking back into our own closet and encouraging you to do the same. Sometimes a fresh set of eyes on a garment pushed to the back shelf can spark a whole new look.\n\n2021 is the year of making use of what’s already been produced and for a bit of inspiration, we’re putting together a Revival Collection by breathing new life into some hidden gems within the Seasons catalog."
  }

  const imageContainer = useRef(null)

  const { previousData, data = previousData, fetchMore, loading } = useQuery(GET_COLLECTION, {
    variables: {
      tag,
      first: productCount,
      skip: 0,
      orderBy: "updatedAt_DESC",
    },
  })

  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const products = data?.products?.edges
  const aggregateCount = data?.productsAggregate?.aggregate?.count
  const featuredBrandItems = navigationData?.brands || []

  const onScroll = debounce(() => {
    const shouldLoadMore =
      !loading &&
      !!aggregateCount &&
      aggregateCount > products?.length &&
      window.innerHeight >= imageContainer?.current?.getBoundingClientRect().bottom - 200

    if (shouldLoadMore) {
      setFetchingMore(true)
      fetchMore({
        variables: {
          skip: products?.length,
        },
      }).then((fetchMoreResult: any) => {
        setProductCount(products.length + fetchMoreResult?.data?.products?.edges?.length)
      })
    }
  }, 100)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll)
    }
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const BreadCrumb = () => {
    return (
      <>
        <Sans size="3" style={{ display: "inline" }}>
          Collection
        </Sans>
        <Sans size="3" style={{ display: "inline" }}>
          {" "}
          /{" "}
        </Sans>
        <Sans size="3" style={{ display: "inline" }}>
          {tag}
        </Sans>
      </>
    )
  }

  const TextContent = () => (
    <Box>
      <Sans size="9" style={{ textDecoration: "underline" }}>
        {title}
      </Sans>
      {!!description && (
        <>
          <Spacer mb={3} />
          <Sans size="4">About</Sans>
          <ReadMore
            readMoreExpanded={readMoreExpanded}
            setReadMoreExpanded={setReadMoreExpanded}
            content={description}
            maxChars={400}
          />
        </>
      )}
      <Spacer mb={6} />
    </Box>
  )

  return (
    <Layout includeDefaultHead={false} brandItems={featuredBrandItems}>
      <Head>
        <title>{!!tag ? `${tag} Collection - Seasons` : "Seasons"}</title>
        <meta content={description} name="description" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Seasons" />
        <meta property="og:url" content={`https://www.seasons.nyc/collection/${tag}`} />
        <meta property="og:image" content="https://flare-web.s3.amazonaws.com/assets/og-image.jpg" />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]}>
        <Grid px={[2, 2, 2, 5, 5]}>
          <Row>
            <Col md="6" sm="12">
              <MediaWithHeight greaterThanOrEqual="md">
                <Box>
                  <BreadCrumb />
                </Box>
                <Flex flexDirection="column" justifyContent="center" height="100%" pb={8}>
                  <TextContent />
                </Flex>
              </MediaWithHeight>
              <Media lessThan="md">
                <Box>
                  <BreadCrumb />
                  <Spacer mb={2} />
                </Box>
              </Media>
            </Col>
            <Col md="6" sm="12">
              <Box pl={[0, 0, "136px", "136px", "136px"]} pt={[6, 6, 0, 0, 0]}>
                <Media lessThan="md">
                  <TextContent />
                </Media>
              </Box>
            </Col>
          </Row>
        </Grid>
        <Grid px={[0, 2, 2, 5, 5]}>
          <Row ref={imageContainer}>
            {products?.map((product, i) => (
              <Col col sm="3" xs="6" key={i}>
                <Box pt={[2, 0]} pb={[2, 5]}>
                  <ProductGridItem product={product?.node} loading={!data} showName />
                </Box>
              </Col>
            ))}
            {loading && (
              <Box mb={5} style={{ width: "100%", position: "relative", height: "30px" }}>
                <Spinner />
              </Box>
            )}
          </Row>
        </Grid>
      </Box>
    </Layout>
  )
})

export default withRouter(TagView)

const MediaWithHeight = styled(Media)`
  height: 100%;
`
