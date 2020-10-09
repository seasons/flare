import { Box, Flex, Layout, Sans, Separator, Spacer } from "components"
import { DesignerTextSkeleton } from "components/Designer/DesignerTextSkeleton"
import { Col, Grid, Row } from "components/Grid"
import { BRAND_LIST } from "components/Homepage/Brands"
import { HomepageCarousel } from "components/Homepage/HomepageCarousel"
import { ProgressiveImageProps } from "components/Image/ProgressiveImage"
import { ProductGridItem } from "components/Product/ProductGridItem"
import { ReadMore } from "components/ReadMore"
import { Spinner } from "components/Spinner"
import { initializeApollo } from "lib/apollo"
import { debounce } from "lodash"
import { DateTime } from "luxon"
import Head from "next/head"
import { withRouter } from "next/router"
import { GET_BRAND, GET_BRANDS } from "queries/designerQueries"
import React, { useEffect, useRef, useState } from "react"
import { Schema, screenTrack } from "utils/analytics"

import { gql, useQuery } from "@apollo/client"

const Designer = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.BrandPage,
    entitySlug: router?.query?.Designer,
    path: router?.asPath,
  }
})(({ router }) => {
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const [fetchingMore, setFetchingMore] = useState(false)
  const slug = router.query.Designer
  const imageContainer = useRef(null)

  const { data, fetchMore, loading } = useQuery(GET_BRAND, {
    variables: {
      slug,
      first: 8,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })

  const products = data?.brand?.products?.edges
  const aggregateCount = data?.brand?.productsAggregate?.aggregate?.count

  const onScroll = debounce(() => {
    const shouldLoadMore =
      !loading &&
      !fetchingMore &&
      !!aggregateCount &&
      aggregateCount > products?.length &&
      window.innerHeight >= imageContainer?.current?.getBoundingClientRect().bottom - 200

    if (shouldLoadMore) {
      setFetchingMore(true)
      fetchMore({
        variables: {
          skip: products?.length,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!prev) {
            return []
          }

          if (!fetchMoreResult) {
            return prev
          }

          const newData = Object.assign({}, prev, {
            brand: {
              ...prev.brand,
              products: {
                ...prev.brand.products,
                edges: [...prev.brand?.products?.edges, ...fetchMoreResult.brand?.products?.edges],
              },
            },
          })

          setFetchingMore(false)
          return newData
        },
      })
    }
  }, 100)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll)
    }
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const brand = data && data.brand

  const title = brand?.name
  const description = brand?.description

  const desktopImages: ProgressiveImageProps[] =
    !!data?.brand?.images?.length &&
    data?.brand?.images?.map((image) => {
      return { imageUrl: image.url, alt: "Brand image", aspectRatio: 1, size: "xlarge" }
    })

  const MetaData = () => {
    const basedIn = brand?.basedIn
    const since = brand?.since
    const website = brand?.websiteUrl
    if (basedIn || since || website) {
      return (
        <Box width="100%">
          <Separator />
          {!!basedIn && (
            <>
              <Spacer mb={2} />
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                <Sans size="4">Headquarters</Sans>
                <Sans size="4" color="black50">
                  {basedIn}
                </Sans>
              </Flex>
              <Separator />
            </>
          )}
          {!!website && (
            <>
              <Spacer mb={2} />
              <Flex flexDirection="row" justifyContent="space-between" width="100%">
                <Sans size="4">Website</Sans>
                <a href={website} style={{ textDecoration: "none", cursor: "ne-resize" }}>
                  <Sans size="4" color="black50">
                    {website}
                  </Sans>
                </a>
              </Flex>
              <Spacer mb={2} />
              <Separator />
            </>
          )}
          {!!since && (
            <>
              <Spacer mb={2} />
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                <Sans size="4">Since</Sans>
                <Sans size="4" color="black50">
                  {DateTime.fromISO(since).year}
                </Sans>
              </Flex>
              <Spacer mb={2} />
              <Separator />
            </>
          )}
        </Box>
      )
    } else {
      return null
    }
  }

  const TextContent = () => (
    <Box>
      <Sans size="3" style={{ display: "inline" }}>
        Designers
      </Sans>
      <Sans size="3" style={{ display: "inline" }}>
        {" "}
        /{" "}
      </Sans>
      <Sans size="3" style={{ display: "inline" }}>
        {brand?.name}
      </Sans>
      <Spacer mb={10} />
      <Sans size="9" style={{ textDecoration: "underline" }}>
        {brand?.name}
      </Sans>
      {!!brand?.description && (
        <>
          <Spacer mb={3} />
          <Sans size="4">About</Sans>
          <ReadMore
            readMoreExpanded={readMoreExpanded}
            setReadMoreExpanded={setReadMoreExpanded}
            content={brand?.description}
            maxChars={250}
          />
        </>
      )}
      <Spacer mb={6} />
      <MetaData />
    </Box>
  )

  return (
    <Layout fixedNav includeDefaultHead={false}>
      <Head>
        <title>{!!title ? `${title} - Seasons` : "Seasons"}</title>
        <meta content={description} name="description" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Seasons" />
        <meta property="og:url" content={`https://www.seasons.nyc/desginer/${slug}`} />
        <meta
          property="og:image"
          content={
            brand?.images?.[0]?.url.replace("fm=webp", "fm=jpg") ||
            "https://flare-public-assets.s3.amazonaws.com/logo.png"
          }
        />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]} px={[2, 2, 2, 5, 5]}>
        <Grid>
          <Row>
            <Col md="6" sm="12">
              {!data ? <DesignerTextSkeleton /> : <TextContent />}
            </Col>
            <Col md="6" sm="12">
              <Box pl={[0, 0, 6, 6, 6]} pt={[6, 6, 0, 0, 0]}>
                {desktopImages?.length && <HomepageCarousel images={desktopImages} pagerHorizontal />}
              </Box>
            </Col>
          </Row>
          <Spacer mb={8} />
          <Row ref={imageContainer}>
            {products?.map((product, i) => (
              <Col col sm="3" xs="6" key={i}>
                <Box pt={[2, 0]} pb={[2, 5]}>
                  <ProductGridItem product={product?.node} loading={!data} showName />
                </Box>
              </Col>
            ))}
            {loading ||
              (fetchingMore && (
                <Box mb={5} style={{ width: "100%", position: "relative", height: "30px" }}>
                  <Spinner />
                </Box>
              ))}
          </Row>
        </Grid>
      </Box>
    </Layout>
  )
})

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const response = await apolloClient.query({
    query: GET_BRANDS,
    variables: {
      brandSlugs: BRAND_LIST,
    },
  })

  const paths = []

  const brands = response?.data?.brands

  brands?.forEach((brand) => {
    paths.push({ params: { Designer: brand.slug } })
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Designer

  await apolloClient.query({
    query: GET_BRAND,
    variables: {
      slug: filter,
      first: 8,
      skip: 0,
      orderBy: "createdAt_DESC",
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default withRouter(Designer)
