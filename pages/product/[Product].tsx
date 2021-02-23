import { Box, Flex, Layout, Spacer } from "components"
import { AddToBagButton } from "components/AddToBagButton"
import { Carousel } from "components/Carousel"
import { Col, Grid, Row } from "components/Grid"
import { ProgressiveImage } from "components/Image"
import { PartnerBrandModal } from "components/PartnerBrand/PartnerBrandModal"
import { BreadCrumbs } from "components/Product/BreadCrumbs"
import { HowItWorks } from "components/Product/HowItWorks"
import { ProductDetails } from "components/Product/ProductDetails"
import { ImageLoader, ProductTextLoader } from "components/Product/ProductLoader"
import { ProductMeasurements } from "components/Product/ProductMeasurements"
import { VariantSelect } from "components/Product/VariantSelect"
import { Media } from "components/Responsive"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { initializeApollo } from "lib/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import Head from "next/head"
import { useRouter, withRouter } from "next/router"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import { GET_PRODUCT, GET_STATIC_PRODUCTS } from "queries/productQueries"
import { CREATE_DRAFT_ORDER_MUTATION } from "queries/orderQueries"
import { ProductBuyCTA, ProductBuyCTA_ProductVariantFragment, ProductBuyCTA_ProductFragment } from "@seasons/eclipse"
import React, { useEffect, useState } from "react"
import { identify, Schema, screenTrack } from "utils/analytics"
import { filter } from "graphql-anywhere"
import { useQuery, useMutation } from "@apollo/client"

export enum OrderType {
  BUY_USED = "Used",
  BUY_NEW = "New",
}

const Product = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.ProductPage,
    entitySlug: router?.query?.Product,
    path: router?.asPath,
  }
})(({ router }) => {
  const slug = router.query.Product || ""
  const { authState } = useAuthContext()
  const [buyButtonMutating, setBuyButtonMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const { previousData, data = previousData, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  })
  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER_MUTATION, {
    onCompleted: (res) => {
      setBuyButtonMutating(false)
      if (res?.createDraftedOrder) {
        openDrawer("reviewOrder", { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      console.log("error createDraftOrder ", error)
      setBuyButtonMutating(false)
    },
  })

  const { query } = useRouter()

  useEffect(() => {
    if (data?.me) {
      const bagItems = data?.me?.bag?.length + data?.me?.savedItems?.length
      if (bagItems) {
        identify(data?.me?.customer?.user?.id, {
          bagItems,
        })
      }
    }
  }, [data])

  const isFromTryWithSeasons = query["try-with-seasons"] === "true"

  const product = data && data?.product
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

  const updatedVariant = product?.variants?.find((a) => a.id === selectedVariant.id)
  const isInBag = updatedVariant?.isInBag || false

  const title = `${product?.name} by ${product?.brand?.name}`
  const description = product && product.description
  const featuredBrandItems = navigationData?.brands || []
  const variantInStock = selectedVariant?.reservable > 0

  const handleCreateDraftOrder = (orderType: "Used" | "New") => {
    if (Boolean(authState?.userSession)) {
      return createDraftOrder({
        variables: {
          input: {
            productVariantID: selectedVariant?.id,
            orderType,
          },
        },
      })
    } else {
      showPopUp({
        title: "Sign up to buy this item",
        note: "You need to sign in or create an account before you can order items",
        buttonText: "Got it",
        onClose: () => {
          setBuyButtonMutating(false)
          hidePopUp()
        },
      })
    }
  }
  const handleNavigateToBrand = (href: string) => {
    window.location.href = href
  }

  return (
    <Layout includeDefaultHead={false} brandItems={featuredBrandItems}>
      <Head>
        <title>{title ? `${title} - Seasons` : "Seasons"}</title>
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
                  <ProductBuyCTA
                    product={filter(ProductBuyCTA_ProductFragment, product)}
                    selectedVariant={filter(ProductBuyCTA_ProductVariantFragment, selectedVariant)}
                    buyButtonMutating={buyButtonMutating}
                    onBuyNew={() => {
                      setBuyButtonMutating(true)
                      handleCreateDraftOrder(OrderType.BUY_NEW)
                    }}
                    onBuyUsed={() => {
                      setBuyButtonMutating(true)
                      handleCreateDraftOrder(OrderType.BUY_USED)
                    }}
                    onNavigateToBrand={handleNavigateToBrand}
                  />
                ) : null}
                <HowItWorks />
              </Box>
            </Col>
          </Row>
        </Grid>
      </Box>
      <Spacer mb={10} />
      <PartnerBrandModal
        open={isFromTryWithSeasons}
        brand={product?.brand}
        imageURL={product?.brand?.images?.[0]?.resized}
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

  const response = await apolloClient.query({
    query: GET_STATIC_PRODUCTS,
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

/*
 If you export an async function called getStaticProps from a page, 
 Next.js will pre-render this page at build time using the 
 props returned by getStaticProps.
*/
export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Product

  await Promise.all([
    apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        slug: filter,
      },
    }),
    apolloClient.query({
      query: NAVIGATION_QUERY,
    }),
  ])

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default withRouter(Product)
