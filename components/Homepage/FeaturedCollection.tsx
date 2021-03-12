import React from "react"
import { Sans, Spacer, Flex, MaxWidth, Box, Link, Picture } from "../"
import { Display } from "../Typography"
import { head } from "lodash"
import styled from "styled-components"
import { ProductGridItem } from "@seasons/eclipse"
import { imageResize } from "utils/imageResize"

export const FeaturedCollection: React.FC<{ collections: any }> = ({ collections }) => {
  const collection = head(collections)
  if (!collection) {
    return null
  }

  const title = collection.title
  const subTitle = collection.subTitle
  const products = collection.products
  const url = collection.images?.[0].url
  const imageSRC = imageResize(url, "small")

  return (
    <MaxWidth>
      <Box px={[2, 2, 2, 5, 5]} width="100%">
        <Flex flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
          <Display size="8">{title}</Display>
          <Link href={`/collection/${collection.slug}`}>
            <Sans size="4" style={{ textDecoration: "underline" }}>
              View collection
            </Sans>
          </Link>
        </Flex>
        <Spacer mb={2} />
        <Flex flexDirection="row" width="100%">
          <Box width="23.7%" px="2px" py="2px">
            <Picture src={imageSRC} />
            <Spacer mb={1} />
            <Sans size="3">{subTitle}</Sans>
          </Box>
          <Flex flexDirection="row" style={{ flex: 1 }}>
            {products?.map((product, index) => {
              return (
                <Box key={index} width="25%">
                  <ProductGridItem product={product} />
                </Box>
              )
            })}
          </Flex>
        </Flex>
      </Box>
    </MaxWidth>
  )
}

const BackgroundImage = styled.div<{ image: string }>`
  background: url(${(p) => p.image}) no-repeat center center;
  background-size: cover;
  height: 0;
  width: 100%;
  padding-bottom: calc(100% * 1.25);
`
