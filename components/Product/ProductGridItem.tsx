import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "../Link"
import { get } from "lodash"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"
import ContentLoader from "react-content-loader"
import { ProgressiveImage } from "../Image"

export const ProductGridItem: React.FC<{ product: any; loading?: boolean; showName?: boolean }> = ({
  product,
  loading,
  showName,
}) => {
  const image = get(product, "images[0]", { url: "" })
  let showBrand = true

  const brandName = product?.brand?.name
  const brandSlug = product.brand?.slug

  if (showName || brandName === "Vintage") {
    showBrand = false
  }

  const Text = () => {
    if (showBrand && brandName && brandSlug) {
      return (
        <Link href="/designer/[Product]" as={`/designer/${brandSlug}`}>
          <Sans size="2" mt="0.5">
            {brandName}
          </Sans>
          <VariantSizes variants={product.variants} size="2" />
        </Link>
      )
    } else {
      return (
        <>
          {!!product?.name && (
            <>
              <Sans size="2" mt="0.5">
                {product?.name}
              </Sans>
              <VariantSizes variants={product.variants} size="2" />
            </>
          )}
        </>
      )
    }
  }

  return (
    <ProductContainer key={product.id}>
      <Link href="/product/[Product]" as={`/product/${product.slug}`}>
        <div>
          {loading ? (
            <ContentLoader viewBox="0 0 100 125">
              <rect x={0} y={0} width="100%" height="100%" />
            </ContentLoader>
          ) : (
            <ProgressiveImage imageUrl={image?.url} size="small" alt="product image" />
          )}
          <Box py="1" pb="2">
            {loading ? (
              <ContentLoader width="100%" height="56px">
                <rect x={0} y={0} width="40%" height={12} />
                <rect x={0} y={19} width={37} height={12} />
              </ContentLoader>
            ) : (
              <Text />
            )}
          </Box>
        </div>
      </Link>
    </ProductContainer>
  )
}

const ProductContainer = styled(Box)`
  margin: 2px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
`
