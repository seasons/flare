import React from "react"
import { imageResize, IMAGE_ASPECT_RATIO } from "../../utils/imageResize"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "../Link"
import { get } from "lodash"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"
import ContentLoader from "react-content-loader"
import { color } from "../../helpers"

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
          <ImageWrapper>
            <LoaderWrapper>
              <ContentLoader viewBox="0 0 100 125">
                <rect x={0} y={0} width="100%" height="100%" />
              </ContentLoader>
            </LoaderWrapper>
            <img
              src={resizedImage}
              style={{ width: "100%", backgroundColor: color("black04") }}
              alt="image of the product"
            />
          </ImageWrapper>
          <Box py="1" pb="2">
            {!product ? (
              <ContentLoader width="100%" height="56px">
                <rect x={0} y={7} width="40%" height={13} />
                <rect x={0} y={26} width={37} height={13} />
              </ContentLoader>
            ) : (
              <>
                <Sans size="3" mt="0.5">
                  {brandName}
                </Sans>
                <VariantSizes variants={product.variants} size="1" />
              </>
            )}
          </Box>
        </div>
      </Link>
    </ProductContainer>
  )
}

const ImageWrapper = styled(Box)`
  height: 0;
  padding-bottom: calc(100% * ${IMAGE_ASPECT_RATIO});
  width: 100%;
  overflow: hidden;
  position: relative;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const ProductContainer = styled(Box)`
  margin: 2px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
`
