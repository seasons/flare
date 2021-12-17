import { Box, Flex, Link, MaxWidth, Media, Picture, Sans, Spacer } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import { head } from "lodash"
import { GET_PRODUCT } from "queries/productQueries"
import React from "react"
import { imageResize } from "utils/imageResize"

import { ProductGridItem } from "@seasons/eclipse"

import { Display } from "../Typography"
import { SavedTab_Query } from "mobile/Account/SavedAndHistory/queries"

export const FeaturedCollection: React.FC<{ collections: any }> = ({ collections }) => {
  const { authState, toggleLoginModal } = useAuthContext()
  const collection = head(collections)
  if (!collection) {
    return null
  }

  const title = collection.title
  const products = collection.products
  const url = collection.images?.[0]?.url
  const imageSRC = url ? imageResize(url, "large") : ""

  const Content = ({ platform }) => {
    const isDesktop = platform === "desktop"

    return (
      <MaxWidth>
        <Box px={[2, 2, 2, 2, 2]} width="100%">
          <Flex flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
            <Display size="8">{title}</Display>
            <Link href={`/collection/${collection.slug}`}>
              <Sans size="4" style={{ textDecoration: "underline", textAlign: "right" }}>
                View collection
              </Sans>
            </Link>
          </Flex>
          <Spacer mb={2} />
          <Flex flexDirection="row" width="100%">
            <Box width={isDesktop ? "29.35%" : "100%"} px={isDesktop ? "2px" : "0"} py={isDesktop ? "2px" : "0"}>
              <Link href={`/collection/${collection.slug}`}>
                <Picture src={imageSRC} />
              </Link>
            </Box>
            {isDesktop && (
              <Flex flexDirection="row" style={{ flex: 1 }}>
                {products?.map((product, index) => {
                  return (
                    <Box key={index} width="33.33%">
                      <ProductGridItem
                        product={product}
                        authState={authState}
                        onShowLoginModal={() => toggleLoginModal(true)}
                        saveProductButtonRefetchQueries={[
                          { query: SavedTab_Query },
                          { query: GET_PRODUCT, variables: { slug: product?.slug } },
                        ]}
                      />
                    </Box>
                  )
                })}
              </Flex>
            )}
          </Flex>
        </Box>
      </MaxWidth>
    )
  }

  return (
    <>
      <Media greaterThan="sm">
        <Content platform="desktop" />
      </Media>
      <Media lessThan="md">
        <Content platform="mobile" />
      </Media>
    </>
  )
}
