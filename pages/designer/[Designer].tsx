import Head from "next/head"
import React, { useEffect, useRef, useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Box, Layout, Sans, Spacer, Separator, Flex } from "../../components"
import { Col, Grid, Row } from "../../components/Grid"
import { DateTime } from "luxon"
import withApollo from "../../lib/apollo"
import { Schema, screenTrack } from "../../utils/analytics"
import { gql } from "apollo-boost"
import { HomepageCarousel } from "../../components/Homepage/HomepageCarousel"
import { ProgressiveImageProps } from "../../components/Image/ProgressiveImage"
import { ProductGridItem } from "../../components/Product/ProductGridItem"
import { ReadMore } from "../../components/ReadMore"
import { withRouter } from "next/router"

const GET_BRAND = gql`
  query GetBrand($slug: String!, $first: Int!, $skip: Int!, $orderBy: ProductOrderByInput!) {
    brand(where: { slug: $slug }) {
      __typename
      id
      name
      logo
      since
      description
      websiteUrl
      basedIn
      images {
        id
        url
      }
      productsAggregate: productsConnection(where: { status: Available }) {
        aggregate {
          count
        }
      }
      products: productsConnection(first: $first, skip: $skip, orderBy: $orderBy, where: { status: Available }) {
        edges {
          node {
            id
            slug
            name
            images(size: Thumb) {
              id
              url
            }
            variants {
              id
              size
              internalSize {
                display
              }
              total
              reservable
              nonReservable
              reserved
            }
          }
        }
      }
    }
  }
`

const Designer = withApollo({ ssr: true })(
  screenTrack(({ router }) => {
    return {
      page: Schema.PageNames.BrandPage,
      entitySlug: router?.query?.Designer,
      path: router?.asPath,
    }
  })(({ router }) => {
    const [readMoreExpanded, setReadMoreExpanded] = useState(false)
    const slug = router.query.Designer
    const imageContainer = useRef(null)

    const { data, fetchMore, loading } = useQuery(GET_BRAND, {
      variables: {
        slug,
        first: 8,
        skip: 0,
        orderBy: "createdAt_DESC",
      },
      // fetchPolicy: "no-cache",
    })

    const products = data?.brand?.products?.edges
    const aggregateCount = data?.brand?.productsAggregate?.aggregate?.count

    let isFetchingMore = false

    const onScroll = () => {
      if (
        !loading &&
        !isFetchingMore &&
        !!aggregateCount &&
        aggregateCount > products?.length &&
        window.innerHeight >= imageContainer?.current?.getBoundingClientRect().bottom - 200
      ) {
        isFetchingMore = true
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

            return newData
          },
        })
        setTimeout(() => {
          isFetchingMore = false
        }, 500)
      }
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", onScroll)
      }
      return () => window.removeEventListener("scroll", onScroll)
    }, [data])

    const brand = data && data.brand

    const title = `${brand?.name}`
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
          <Box>
            <Separator />
            {!!basedIn && (
              <>
                <Spacer mb={2} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <Sans size="3">Headquarters</Sans>
                  <Sans size="3" color="black50">
                    {basedIn}
                  </Sans>
                </Flex>
                <Separator />
              </>
            )}
            {!!website && (
              <>
                <Spacer mb={2} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <Sans size="3">Website</Sans>
                  <Sans size="3" color="black50">
                    {website}
                  </Sans>
                </Flex>
                <Spacer mb={2} />
                <Separator />
              </>
            )}
            {!!since && (
              <>
                <Spacer mb={2} />
                <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                  <Sans size="3">Since</Sans>
                  <Sans size="3" color="black50">
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

    return (
      <Layout fixedNav includeDefaultHead={false}>
        <Head>
          <title>{`${title} - Seasons`}</title>
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
                <Spacer mb={9} />
                <Sans size="6" style={{ textDecoration: "underline" }}>
                  {brand?.name}
                </Sans>
                {!!brand?.description && (
                  <>
                    <Spacer mb={3} />
                    <Sans size="3">About</Sans>
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
              </Col>
              <Col md="5" sm="12">
                <HomepageCarousel images={desktopImages} />
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
            </Row>
          </Grid>
        </Box>
        <Spacer mb="125px" />
      </Layout>
    )
  })
)

export default withRouter(Designer)
