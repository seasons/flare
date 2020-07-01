import { GET_PRODUCT } from "../../components/Product/ProductQueries"
import React from "react"
import { useQuery } from "@apollo/react-hooks"
import withData from "../../lib/apollo"
import { ProductDetails } from "../../components/Product/ProductDetails"
import { Grid, Col, Row } from "../../components/Grid"
import { useRouter } from "next/router"
import { Box, Layout, Spacer } from "../../components"
import { ImageLoader, ProductTextLoader } from "../../components/Product/ProductLoader"
import { ProgressiveImage } from "../../components/Image"
import { HowItWorks } from "../../components/Product/HowItWorks"
import { Button } from "../../components/Button"
import { Media } from "../../components/Responsive"
import { Carousel } from "../../components/Carousel"
import { Schema, screenTrack } from "../../utils/analytics"

const Product = withData(
  screenTrack((props) => {
    console.log("props", props)
    return {
      name: Schema.PageNames.ProductPage,
      properties: {
        path: "/product",
      },
    }
  })(() => {
    const router = useRouter()
    const slug = router.query.Product

    const { data } = useQuery(GET_PRODUCT, {
      variables: {
        slug,
      },
    })

    const product = data && data.product

    return (
      <Layout fixedNav>
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
                          <Box px={2} mb={0.5} key={image.url}>
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
                    <a href="//signup.seasons.nyc">
                      <Button width="100%" block variant="primaryWhite" onClick={null}>
                        Join the waitlist
                      </Button>
                    </a>
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

export default Product
