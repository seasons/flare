import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "../Link"
import { get } from "lodash"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"
import ContentLoader from "react-content-loader"
import { ProgressiveImage } from "../Image"

export const ProductGridItem = ({ product }) => {
  const image = get(product, "images[0]", { url: "" })

  const brandName = get(product, "brand.name")

  return (
    <ProductContainer key={product.id}>
      <Link href="/product/[Product]" as={`/product/${product.slug}`}>
        <div>
          <ProgressiveImage imageUrl={image?.url} size="small" alt="product image" />
          <Box py="1" pb="2">
            {!product ? (
              <ContentLoader width="100%" height="56px">
                <rect x={0} y={7} width="40%" height={13} />
                <rect x={0} y={26} width={37} height={13} />
              </ContentLoader>
            ) : (
              <>
                <Sans size="2" mt="0.5">
                  {brandName}
                </Sans>
                <VariantSizes variants={product.variants} size="0" />
              </>
            )}
          </Box>
        </div>
      </Link>
    </ProductContainer>
  )
}

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
