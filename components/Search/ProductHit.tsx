import { Box, Link, ProgressiveImage, Sans, Spacer } from "components"
import React from "react"

export const ProductHit = ({ hit }) => {
  const product = hit

  const Text = () => {
    const { brandName } = product
    return (
      <>
        {!!product?.name && (
          <>
            <Sans size="4" mt="0.5">
              {product?.name}
            </Sans>
            <Sans size="2" mt="0.5">
              {brandName}
            </Sans>
          </>
        )}
      </>
    )
  }

  return (
    <>
      <Box p={2}>
        <Link href="/product/[Product]" as={`/product/${product.slug}`}>
          <a href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            <ProgressiveImage
              imageUrl={product.image}
              size="small"
              style={{ height: 1.25 * 200 + "px", width: 200 + "px" }}
            />
            <Spacer mb={1} />
            <Text />
          </a>
        </Link>
      </Box>
    </>
  )
}
