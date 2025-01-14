import { Box, Flex, Sans } from "components"
import React from "react"
import { Image } from "react-native"
import styled from "styled-components"

export const CurrentRotationItem = ({ physicalProduct }) => {
  const productVariant = physicalProduct.productVariant
  const product = productVariant && productVariant.product

  if (!product) {
    return null
  }

  const imageURL = product?.images?.[0]?.url || ""

  return (
    <Container key={product.id}>
      <Box p={2}>
        <Sans size="2">{product.brand.name}</Sans>
        <Sans size="2" color="black50">
          {product.name}
        </Sans>
        <Flex flexDirection="row">
          <Sans size="2" color="black50">
            Size {productVariant.size}
          </Sans>
          <Sans size="2" color="black50" style={{ marginLeft: "auto" }}>
            Retail ${product.retailPrice}
          </Sans>
        </Flex>
      </Box>
      <ImageContainer>
        <StyledImage resizeMode="contain" source={{ uri: imageURL }} />
      </ImageContainer>
    </Container>
  )
}

const Container = styled(Box)`
  border-width: 1px;
  border-color: #e5e5e5;
  border-style: solid;
  border-radius: 20;
  overflow: hidden;
`

const ImageContainer = styled(Box)`
  border-top-color: #e5e5e5;
  border-style: solid;
  border-top-width: 1px;
`

const StyledImage = styled(Image)`
  height: 260;
  width: 100%;
  background: #f6f6f6;
`
