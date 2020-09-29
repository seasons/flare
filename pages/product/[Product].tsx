import Head from "next/head"
import { withRouter } from "next/router"
import React from "react"

import { useQuery } from "@apollo/react-hooks"

import { Box, Layout, Spacer } from "../../components"
import { Button } from "../../components/Button"
import { Carousel } from "../../components/Carousel"
import { Col, Grid, Row } from "../../components/Grid"
import { ProgressiveImage } from "../../components/Image"
import { Link } from "../../components/Link"
import { HowItWorks } from "../../components/Product/HowItWorks"
import { ProductDetails } from "../../components/Product/ProductDetails"
import { ImageLoader, ProductTextLoader } from "../../components/Product/ProductLoader"
import { GET_PRODUCT } from "../../components/Product/ProductQueries"
import { Media } from "../../components/Responsive"
import withData from "../../lib/apollo"
import { Schema, screenTrack } from "../../utils/analytics"

const Product = withData(
  screenTrack(({ router }) => {
    return {
      page: Schema.PageNames.ProductPage,
      entitySlug: router?.query?.Product,
      path: router?.asPath,
    }
  })(({ router }) => {
    const slug = router.query.Product

    const { data } = useQuery(GET_PRODUCT, {
      variables: {
        slug,
      },
    })

    const product = data && data.product

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
          <meta property="og:image" content={product?.images?.[0].url} />
          <meta property="twitter:card" content="summary" />
        </Head>
        <Box pt={[1, 5]}>
          <Grid>
            <Row>
              <Col md="6" sm="12">
                <Media greaterThanOrEqual="md">
                  <Box>
                    {!product ? (
                      <ImageLoader />
                    ) : (
                      product?.images.map((image) => {
                        return (
                          <Box px={[2, 2, 2, 5, 5]} mb={0.5} key={image.url}>
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
                <Box mr={[0, 4]}>
                  {product ? <ProductDetails product={product} /> : <ProductTextLoader />}
                  <Box px={2}>
                    <Link href="/signup">
                      <Button width="100%" block variant="primaryWhite" onClick={null}>
                        Join the waitlist
                      </Button>
                    </Link>
                  </Box>
                  <HowItWorks />
                </Box>
              </Col>
            </Row>
          </Grid>
        </Box>
        <Spacer mb="125px" />
      </Layout>
    )
  })
)

export default withRouter(Product)
