import { GET_PRODUCT } from "./ProductQueries"
import React from "react"

import { useQuery } from "@apollo/react-hooks"
import withData from "../../lib/apollo"
import { ProductDetails } from "./ProductDetails"
import { Grid, Col, Row } from "../../components/Grid"
import { imageResize } from "../../utils/imageResize"
import { useRouter } from "next/router"
import { Nav } from "../../components/Nav"
import styled from "styled-components"
import { Box } from "../../components"
import { Button } from "../../components/Button"

const Product = withData(props => {
  const router = useRouter()
  const slug = router.query.Product

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      slug,
    },
  })

  const product = data && data.product

  return (
    <>
      <Nav />
      <Grid>
        <Row>
          <Col md="6">
            {product?.images.map(image => {
              const imageURL = imageResize(image?.url, "x-large")
              return (
                <ImageContainer m={2}>
                  <img src={imageURL} />
                </ImageContainer>
              )
            })}
          </Col>
          <Col md="6" p={1}>
            <ProductDetails product={product} />
            <Box my={2} p={1}>
              <a href="//signup.seasons.nyc">
                <Button size="medium" block>
                  Join the wailist
                </Button>
              </a>
            </Box>
          </Col>
        </Row>
      </Grid>
    </>
  )
})

const ImageContainer = styled(Box)``

export default Product
