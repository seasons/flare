import { GET_PRODUCT } from "../../components/Product/ProductQueries"
import React from "react"
import { media } from "styled-bootstrap-grid"
import { useQuery } from "@apollo/react-hooks"
import withData from "../../lib/apollo"
import { ProductDetails } from "../../components/Product/ProductDetails"
import { Grid, Col, Row } from "../../components/Grid"
import { imageResize } from "../../utils/imageResize"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Box, Layout, Sans } from "../../components"
import { ImageLoader, ProductTextLoader } from "../../components/Product/ProductLoader"
import { color } from "../../helpers"

const Product = withData((props) => {
  const router = useRouter()
  const slug = router.query.Product

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  })

  const product = data && data.product

  const Products = () => {
    if (!data) {
      return <ImageLoader />
    } else if (!product?.images) {
      return <Box m={2} pb="125%" style={{ height: 0, backgroundColor: color("black04") }} />
    } else {
      return product?.images.map((image) => {
        const imageURL = imageResize(image?.url, "x-large")
        return (
          <ImageContainer m={2} key={image?.url}>
            <img src={imageURL} />
          </ImageContainer>
        )
      })
    }
  }

  return (
    <Layout fixedNav>
      <Box pt="100px">
        <Grid>
          <Row>
            <Col md="6" sm="12" xsOrder={1} smOrder={1}>
              <Box style={{ minHeight: "calc(100vh - 160px)" }}>
                <Products />
              </Box>
            </Col>
            <Col md="5" sm="12" p={1} mdOrder={2}>
              <DetailsContainer mr={4}>
                {product ? <ProductDetails product={product} /> : <ProductTextLoader />}
                <Box my={2} py={2} px={4}>
                  <Button href="//signup.seasons.nyc">
                    <Sans size="3">Join the wailist</Sans>
                  </Button>
                </Box>
              </DetailsContainer>
            </Col>
          </Row>
        </Grid>
      </Box>
    </Layout>
  )
})

const ImageContainer = styled(Box)``

const DetailsContainer = styled(Box)<{ size?: string }>`
  ${media.md`
    position: fixed;
    width: 30%;
  `};
`

const Button = styled.a`
  display: flex;
  width: 100%;
  height: 56px;
  margin-left: 0px;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: center;
  align-items: center;
  border-style: none;
  border-width: 1px;
  border-color: #fff;
  border-radius: 400px;
  background-color: #000;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: white;
`

export default Product
