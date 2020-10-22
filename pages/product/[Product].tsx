import { Box, Flex, Layout, Spacer } from "components"
import { AddToBagButton } from "components/AddToBagButton"
import { Button } from "components/Button"
import { Carousel } from "components/Carousel"
import { Col, Grid, Row } from "components/Grid"
import { ProgressiveImage } from "components/Image"
import { HowItWorks } from "components/Product/HowItWorks"
import { ProductDetails } from "components/Product/ProductDetails"
import { ImageLoader, ProductTextLoader } from "components/Product/ProductLoader"
import { VariantSelect } from "components/Product/VariantSelect"
import { Media } from "components/Responsive"
import { initializeApollo } from "lib/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import Head from "next/head"
import { withRouter } from "next/router"
import { GET_PRODUCT, GET_PRODUCTS } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

const Product = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.ProductPage,
    entitySlug: router?.query?.Product,
    path: router?.asPath,
  }
})(({ router }) => {
  const slug = router.query.Product
  const { authState } = useAuthContext()
  const { data, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  })

  console.log(data)

  const product = data && data.product

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {
      id: "",
      reservable: 0,
      size: "",
      stock: 0,
      isInBag: false,
      isWanted: false,
    }
  )

  useEffect(() => {
    refetch()
  }, [authState.isSignedIn])

  const title = `${product?.name} by ${product?.brand?.name}`
  const description = product && product.description

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
        <meta property="og:url" content={`https://www.seasons.nyc/product/${slug}`} />
        <meta property="og:image" content={product?.images?.[0]?.url.replace("fm=webp", "fm=jpg")} />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]} px={[0, 0, 2, 5, 5]}>
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
                          <ProgressiveImage imageUrl={image.url} size="large" alt="product image" />
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
                {product ? <ProductDetails product={product} /> : <ProductTextLoader />}
                <Flex flex-direction="row">
                  <Box mr={2}>
                    <VariantSelect
                      product={product}
                      selectedVariant={selectedVariant}
                      setSelectedVariant={setSelectedVariant}
                      onSizeSelected={(size) => {
                        console.log(size)
                      }}
                    />
                  </Box>
                  <AddToBagButton
                    selectedVariant={selectedVariant}
                    data={data}
                    variantInStock={true}
                    isInBag={selectedVariant.isInBag}
                  />
                </Flex>
                <HowItWorks />
              </Box>
            </Col>
          </Row>
        </Grid>
      </Box>
      <Spacer mb={10} />
    </Layout>
  )
})

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const response = await apolloClient.query({
    query: GET_PRODUCTS,
  })

  const paths = []

  const products = response?.data?.products

  products?.forEach((product) => {
    paths.push({ params: { Product: product.slug } })
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Product

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

export default withRouter(Product)
