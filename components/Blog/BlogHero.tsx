import { Box, Display, Flex, ProgressiveImage, Sans, Spacer } from "components"
import React from "react"

export const BlogHero = ({ blogPost }) => {
  const node = blogPost?.node
  const category = node?.category
  const name = node?.name
  const image = node?.image

  return (
    <Flex width="100%" flexDirection="column" px={[0, 0, 2, 2, 2]}>
      <Spacer mb={10} />
      <Sans color="black50" size="2" style={{ textTransform: "uppercase" }}>
        {category}
      </Sans>
      <Spacer mb={0.5} />
      <Display size="10" style={{ maxWidth: "800px" }}>
        {name}
      </Display>
      <Spacer mb={5} />
      <Box style={{ maxWidth: "1100px" }}>
        <ProgressiveImage imageUrl={image?.url} size="hero" alt={`Image for ${name}`} aspectRatio={0.7} />
      </Box>
    </Flex>
  )
}
