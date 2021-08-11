import { Box, Flex, Layout, Spacer } from "components"
import { AddToBagButton } from "components/AddToBagButton"
import { Carousel } from "components/Carousel"
import { Col, Grid, Row } from "components/Grid"
import { ProgressiveImage } from "components/Image"
import { HEAD_META_TITLE } from "components/LayoutHead"
import { PartnerModal } from "components/Partner/PartnerModal"
import { BreadCrumbs } from "components/Product/BreadCrumbs"
import { ProductBuyCTA } from "components/Product/ProductBuyCTA"
import { ProductDetails } from "components/Product/ProductDetails"
import { ProductHowItWorks } from "components/Product/ProductHowItWorks"
import { ImageLoader, ProductTextLoader } from "components/Product/ProductLoader"
import { ProductMeasurements } from "components/Product/ProductMeasurements"
import { VariantSelect } from "components/Product/VariantSelect"
import { Media } from "components/Responsive"
import { filter } from "graphql-anywhere"
import { initializeApollo } from "lib/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import Head from "next/head"
import Link from "next/link"
import { useRouter, withRouter } from "next/router"
import { GET_PRODUCT, GET_STATIC_PRODUCTS } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Schema, screenTrack } from "utils/analytics"
import { useQuery } from "@apollo/client"
import {
  ProductBuyCTAFragment_Product,
  ProductBuyCTAFragment_ProductVariant,
  ProductConditionSectionFragment_PhysicalProductQualityReport,
  ProductConditionSection,
} from "@seasons/eclipse"

const isProduction = process.env.ENVIRONMENT === "production"

const Product = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.ProductPage,
    entitySlug: router?.query?.Product,
    path: router?.asPath,
  }
})(({ router }) => {
  const slug = router.query.Product || ""
  const { authState } = useAuthContext()
  const { previousData, data = previousData, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  })

  const { query } = useRouter()

  const isFromTryWithSeasons = query["try-with-seasons"] === "true"

  const product = data && data?.product
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {
      id: "",
      reservable: 0,
      size: "",
      stock: 0,
      isInBag: false,
    }
  )

  useEffect(() => {
    refetch()
  }, [authState.isSignedIn])

  const updatedVariant = product?.variants?.find((a) => a.id === selectedVariant.id)
  const isInBag = updatedVariant?.isInBag || false

  let metaTitle = HEAD_META_TITLE
  if (product?.name && product?.brand?.name) {
    metaTitle = `Seasons | ${product?.name} by ${product?.brand?.name}`
  }
  const description = product && product.description
  const variantInStock = selectedVariant?.reservable > 0
  const physicalProductQualityReport = (selectedVariant?.nextReservablePhysicalProduct?.reports || []).reduce(
    (agg, report) => {
      if (!agg) {
        return report
      }
      return report.published && report.createdAt > agg.createdAt ? report : agg
    },
    null
  )

  const handleNavigateToBrand = (href: string) => {
    window.location.href = href
  }

  return (
    <Layout includeDefaultHead={false}>
      <Head>
        <title>{metaTitle}</title>
        <meta content={description} name="description" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Seasons" />
        <meta property="og:url" content={`https://www.wearseasons.com/product/${slug}`} />
        <meta property="og:image" content={product?.images?.[0]?.url.replace("fm=webp", "fm=jpg")} />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]} px={[0, 0, 2, 5, 5]}>
        <BreadCrumbs product={product} />
        <Spacer mb={2} />
        <Grid>
          <Row>
            <Col md="7" sm="12">
              <Media greaterThanOrEqual="md">
                <Box>
                  {!product ? (
                    <ImageLoader />
                  ) : (
                    product?.images.map((image) => {
                      return (
                        <Box pl={[2, 2, 0, 0, 0]} pr={[2, 2, 2, 5, 5]} mb={0.5} key={image.url}>
                          <ProgressiveImage imageUrl={image.url} size="large" alt={`Image of ${product?.name}`} />
                        </Box>
                      )
                    })
                  )}
                  <Spacer mb={0.5} />
                </Box>
              </Media>
              <Media lessThan="md">
                <Carousel images={product?.images} />
                <Spacer mb={5} />
              </Media>
            </Col>
            <Col md="5" sm="12">
              <Box style={{ maxWidth: "480px" }} px={[2, 2, 0, 0, 0]}>
                {product ? (
                  <ProductDetails selectedVariant={selectedVariant} product={product} />
                ) : (
                  <ProductTextLoader />
                )}
                <Flex flex-direction="row">
                  <Flex flex={1}>
                    <VariantSelect
                      product={product}
                      variantInStock={variantInStock}
                      selectedVariant={selectedVariant}
                      setSelectedVariant={setSelectedVariant}
                      onSizeSelected={(size) => {
                        console.log(size)
                      }}
                    />
                  </Flex>
                  <Spacer mr={2} />
                  <Flex flex={1}>
                    <AddToBagButton
                      selectedVariant={selectedVariant}
                      data={data}
                      variantInStock={variantInStock}
                      isInBag={isInBag}
                    />
                  </Flex>
                </Flex>
                {product ? <ProductMeasurements selectedVariant={selectedVariant} /> : <ProductTextLoader />}
                {product ? (
                  <ProductConditionSection
                    mt={8}
                    physicalProductQualityReport={
                      physicalProductQualityReport
                        ? filter(
                            ProductConditionSectionFragment_PhysicalProductQualityReport,
                            physicalProductQualityReport
                          )
                        : null
                    }
                  />
                ) : (
                  <ProductTextLoader />
                )}
                {process.env.ENABLE_BUY_USED && product && (
                  <>
                    <ProductBuyCTA
                      mt={8}
                      product={filter(ProductBuyCTAFragment_Product, product)}
                      selectedVariant={filter(ProductBuyCTAFragment_ProductVariant, selectedVariant)}
                      onNavigateToBrand={handleNavigateToBrand}
                    />
                  </>
                )}
                <ProductHowItWorks />
              </Box>
            </Col>
          </Row>
        </Grid>
      </Box>
      <Spacer mb={10} />
      <PartnerModal
        open={isFromTryWithSeasons}
        imageURL={product?.brand?.images?.[0]?.resized}
        renderPartnerComponent={() => (
          <Link href="/designer/[Designer]" as={`/designer/${product?.brand?.slug}`}>
            <Underline>{product?.brand?.name}</Underline>
          </Link>
        )}
      />
    </Layout>
  )
})

/*
If a page has dynamic routes (documentation) and uses getStaticProps 
it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an async function called getStaticPaths from 
a page that uses dynamic routes, Next.js will statically 
pre-render all the paths specified by getStaticPaths.
*/
export async function getStaticPaths() {
  const apolloClient = initializeApollo()
  const paths = []

  if (isProduction) {
    const response = await apolloClient.query({
      query: GET_STATIC_PRODUCTS,
      variables: {
        pageSize: 40,
      },
    })

    const products = response?.data?.products

    products?.forEach((product) => {
      paths.push({ params: { Product: product.slug } })
    })
  }

  return {
    paths,
    fallback: true,
  }
}

const timeout = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))
/*
  If you export an async function called getStaticProps from a page,
  Next.js will pre-render this page at build time using the
  props returned by getStaticProps.
*/
export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Product

  await timeout(500)
  await apolloClient.query({
    query: GET_PRODUCT,
    variables: {
      slug: filter,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

const Underline = styled.a`
  text-decoration: underline;
`

export default withRouter(Product)
