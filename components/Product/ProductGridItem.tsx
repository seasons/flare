import React from "react"
import { imageResize } from "../../utils/imageResize"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "../Link"
import { get } from "lodash"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"

export const ProductGridItem = ({ product }) => {
  if (!product) {
    return null
  }

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "large")

  const brandName = get(product, "brand.name")

  return (
    <ProductContainer key={product.id}>
      <Link href="/product/[Product]" as={`/product/${product.slug}`}>
        <div>
          <img src={resizedImage} />
          <Box py="1" pb="2">
            <Sans size="3" mt="0.5">
              {brandName}
            </Sans>
            <Sans size="3" my="0.5" color="black50">
              {product.name}
            </Sans>
            <VariantSizes variants={product.variants} size="1" />
          </Box>
        </div>
      </Link>
    </ProductContainer>
  )
}

const ProductContainer = styled(Box)`
  margin: 5px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
`
