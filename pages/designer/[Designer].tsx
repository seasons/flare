import { Box, Flex, Layout, Sans, Separator, Spacer } from "components"
import { DesignerTextSkeleton } from "components/Designer/DesignerTextSkeleton"
import { Col, Grid, Row } from "components/Grid"
import { HomepageCarousel } from "components/Homepage/HomepageCarousel"
import { ProgressiveImageProps } from "components/Image/ProgressiveImage"
import { HEAD_META_TITLE } from "components/LayoutHead"
import { ReadMore } from "components/ReadMore"
import { Media } from "components/Responsive"
import { Spinner } from "components/Spinner"
import { initializeApollo } from "lib/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { debounce } from "lodash"
import { DateTime } from "luxon"
import Head from "next/head"
import { withRouter } from "next/router"
import { Designer_Query, DesignerBrands_Query } from "queries/designerQueries"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"
import { ProductGridItem } from "@seasons/eclipse"
import { SavedTab_Query } from "mobile/Account/SavedAndHistory/queries"

const isProduction = process.env.ENVIRONMENT === "production"

const Designer = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.BrandPage,
    entitySlug: router?.query?.Designer,
    path: router?.asPath,
  }
})(({ router }) => {
  const PAGE_LENGTH = 8
  const [readMoreExpanded, setReadMoreExpanded] = useState(false)
  const [productCount, setProductCount] = useState(PAGE_LENGTH)
  const { authState, toggleLoginModal } = useAuthContext()
  const slug = router.query.Designer || ""

  const imageContainer = useRef(null)

  const { previousData, data = previousData, fetchMore, loading } = useQuery(Designer_Query, {
    variables: {
      slug,
      first: productCount,
      skip: 0,
      orderBy: "publishedAt_DESC",
    },
  })

  const products = data?.brand?.products?.edges
  const aggregateCount = data?.brand?.productsAggregate?.aggregate?.count

  const onScroll = debounce(() => {
    const shouldLoadMore =
      !loading &&
      !!aggregateCount &&
      aggregateCount > products?.length &&
      window.innerHeight >= imageContainer?.current?.getBoundingClientRect().bottom - 200

    if (shouldLoadMore) {
      fetchMore({
        variables: {
          skip: products?.length,
        },
      }).then(() => {
        setProductCount(PAGE_LENGTH + products?.length)
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
    const designer = brand?.designer
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
              <Spacer mb={2} />
              <Separator />
            </>
          )}
          {!!designer && (
            <>
              <Spacer mb={2} />
              <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
                <Sans size="4">Designer</Sans>
                <Sans size="4" color="black50">
                  {designer}
                </Sans>
              </Flex>
              <Spacer mb={2} />
              <Separator />
            </>
          )}
          {!!website && (
            <>
              <Spacer mb={2} />
              <Flex flexDirection="row" justifyContent="space-between" width="100%">
                <Sans size="4">Website</Sans>
                <a href={website} style={{ textDecoration: "none", cursor: "ne-resize" }} target="_blank">
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

  const BreadCrumb = () => {
    return (
      <>
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
      </>
    )
  }

  const TextContent = () => (
    <Box>
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
            maxChars={400}
          />
        </>
      )}
      <Spacer mb={6} />
      <MetaData />
    </Box>
  )

  return (
    <Layout includeDefaultHead={false}>
      <Head>
        <title>{!!title ? `Seasons | ${title}` : HEAD_META_TITLE}</title>
        <meta content={description} name="description" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Seasons" />
        <meta property="og:url" content={`https://www.wearseasons.com/desginer/${slug}`} />
        <meta
          property="og:image"
          content={
            brand?.images?.[0]?.url.replace("fm=webp", "fm=jpg") ||
            "https://flare-web.s3.amazonaws.com/assets/og-image.jpg"
          }
        />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]}>
        <Grid px={[2, 2, 2, 2, 2]}>
          <Row>
            <Col md="6" sm="12">
              <MediaWithHeight greaterThanOrEqual="md">
                <Box>
                  <BreadCrumb />
                </Box>
                <Flex flexDirection="column" justifyContent="center" height="100%" pb={8}>
                  {!data ? <DesignerTextSkeleton /> : <TextContent />}
                </Flex>
              </MediaWithHeight>
              <Media lessThan="md">
                <Box>
                  <BreadCrumb />
                  <Spacer mb={2} />
                  {desktopImages?.length && <HomepageCarousel images={desktopImages} pagerHorizontal />}
                </Box>
              </Media>
            </Col>
            <Col md="6" sm="12">
              <Box pl={[0, 0, "136px", "136px", "136px"]} pt={[6, 6, 0, 0, 0]}>
                <Media greaterThanOrEqual="md">
                  {desktopImages?.length && <HomepageCarousel images={desktopImages} pagerHorizontal />}
                </Media>
                <Media lessThan="md">
                  <Box>{!data ? <DesignerTextSkeleton /> : <TextContent />}</Box>
                </Media>
              </Box>
            </Col>
          </Row>
          <Spacer mb={8} />
        </Grid>
        <Grid px={[0, 2, 2, 2, 2]}>
          <Row ref={imageContainer}>
            {products?.map((product, i) => (
              <Col col sm="3" xs="6" key={i}>
                <Box pt={[2, 0]} pb={[2, 5]}>
                  <ProductGridItem
                    product={product?.node}
                    loading={!data}
                    authState={authState}
                    onShowLoginModal={() => toggleLoginModal(true)}
                    saveProductButtonRefetchQueries={[
                      { query: SavedTab_Query },
                      { query: GET_PRODUCT, variables: { slug: product?.node?.slug } },
                    ]}
                  />
                </Box>
              </Col>
            ))}
            {!!aggregateCount && aggregateCount > products?.length && (
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

export async function getStaticPaths() {
  const apolloClient = initializeApollo()
  const paths = []

  if (isProduction) {
    const response = await apolloClient.query({
      query: DesignerBrands_Query,
    })

    const brands = response?.data?.brands

    brands?.forEach((brand) => {
      paths.push({ params: { Designer: brand.slug } })
    })
  }

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Designer

  try {
    await apolloClient.query({
      query: Designer_Query,
      variables: {
        slug: filter,
        first: 8,
        skip: 0,
        orderBy: "publishedAt_DESC",
      },
    })
  } catch (e) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default withRouter(Designer)

const MediaWithHeight = styled(Media)`
  height: 100%;
`
