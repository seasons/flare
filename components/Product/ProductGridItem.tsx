import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "../Link"
import { get } from "lodash"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"
import ContentLoader from "react-content-loader"
import { ProgressiveImage } from "../Image"
import { Spacer } from "../Spacer"

export const ProductGridItem: React.FC<{ product: any; loading?: boolean; showName?: boolean }> = ({
  product,
  loading,
  showName,
}) => {
  const image = get(product, "images[0]", { url: "" })
  let showBrand = true

  const brandName = product?.brand?.name
  const brandSlug = product?.brand?.slug

  if (showName || brandName === "Vintage") {
    showBrand = false
  }

  // console.log('product', product)
  // console.log('loading', loading)

  if(!product || loading){
    return (
      <Box m="2px">
        <ContentLoader viewBox="0 0 100 125">
          <rect x={0} y={0} width="100%" height="100%" />
        </ContentLoader>
        <Spacer mb="5px"/>
        <ContentLoader width="100%" height="42px">
          <rect x={0} y={0} width="40%" height={12} />
          <rect x={0} y={19} width={37} height={12} />
        </ContentLoader>
      </Box>
    )
  }

  const Text = () => {
    if (showBrand && brandName && brandSlug) {
      return (
        <Link href="/designer/[Designer]" as={`/designer/${brandSlug}`}>
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
        <ProgressiveImage imageUrl={image?.url} size="small" alt="product image" />
        <Spacer mb={1}/>
        <Text/>
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
