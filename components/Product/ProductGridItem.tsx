import { Picture } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import { get } from "lodash"
import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

import { IMAGE_ASPECT_RATIO } from "../../utils/imageResize"
import { Box } from "../Box"
import { ProgressiveImage } from "../Image"
import { Link } from "../Link"
import { Spacer } from "../Spacer"
import { Sans } from "../Typography"
import { VariantSizes } from "../VariantSizes"

type Props = {
  product: {
    variants: any
    name: string
    slug: string
    id: string
    brand?: any
    retailPrice: string
    images: { url: string }[]
  }
  loading?: boolean
}

export const ProductGridItem: React.FC<Props> = ({ product, loading }) => {
  const [hover, setHover] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const thirdImageRef = React.useRef(null)
  const { authState } = useAuthContext()

  const image = product?.images?.[0]
  const thirdImage = product?.images?.[2]
  const tracking = useTracking()

  const name = product?.name
  let brandName = product?.brand?.name
  const brandSlug = product?.brand?.slug
  const retailPrice = product?.retailPrice

  if (brandName === "Vintage") {
    brandName = "Archive"
  }

  React.useEffect(() => {
    const image = thirdImageRef.current
    if (image && image.complete && !loaded) {
      setLoaded(true)
    }
  }, [thirdImageRef, setLoaded, loaded])

  if (!product || loading) {
    return (
      <Box m="2px">
        <ContentLoader viewBox="0 0 100 125">
          <rect x={0} y={0} width="100%" height="100%" />
        </ContentLoader>
        <Spacer mb="3px" />
        <ContentLoader width="100%" height="42px">
          <rect x={0} y={0} width="40%" height={10} />
          <rect x={0} y={15} width="53%" height={10} />
          <rect x={0} y={30} width={60} height={10} />
        </ContentLoader>
      </Box>
    )
  }

  return (
    <ProductContainer
      key={product.id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductTapped,
          actionType: Schema.ActionTypes.Tap,
          productName: product.name,
          productSlug: product.slug,
          productId: product.id,
        })
      }
    >
      <Link href="/product/[Product]" as={`/product/${product.slug}`}>
        <a href={`/product/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          {hover && (
            <ThirdImageWrapper loaded={loaded}>
              <Picture
                src={thirdImage?.url}
                key={thirdImage?.url}
                alt={`Image of ${product.name}`}
                imgRef={thirdImageRef}
                onLoad={() => {
                  setLoaded(true)
                }}
              />
            </ThirdImageWrapper>
          )}
          <ProgressiveImage imageUrl={image?.url} size="small" alt={`Image of ${product.name}`} />
          <Spacer mb={1} />
          <Link href="/designer/[Designer]" as={`/designer/${brandSlug}`}>
            <Sans size="2" mt="0.5">
              {brandName}
            </Sans>
          </Link>
          <Sans size="2" mt="0.5" color="black50">
            {name}
          </Sans>
          {retailPrice && (
            <>
              <LineThroughSans mt="0.5" size="2" color="black50" display="inline"></LineThroughSans>
              <Sans mt="0.5" size="2" color="black50" display="inline">
                {`Retail $${retailPrice}`}
              </Sans>
            </>
          )}
          <VariantSizes variants={product.variants} size="2" />
        </a>
      </Link>
    </ProductContainer>
  )
}

const LineThroughSans = styled(Sans)`
  text-decoration: line-through;
`

const ThirdImageWrapper = styled(Box)<{ loaded: boolean }>`
  z-index: 3;
  position: absolute;
  opacity: ${(p) => (p.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: calc(100% * ${IMAGE_ASPECT_RATIO});
`

const ProductContainer = styled(Box)`
  margin: 2px;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  position: relative;
`
