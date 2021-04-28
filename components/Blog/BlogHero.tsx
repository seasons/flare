import { Box, Display, Flex, Link, ProgressiveImage, Sans, Spacer } from "components"
import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components"

export const BlogHero = ({ blogPost }) => {
  const node = blogPost?.node
  const category = node?.category
  const name = node?.name
  const image = node?.image
  const slug = node?.slug
  const loading = !blogPost

  const TextContent = () => {
    return (
      <>
        <Sans color="black50" size="2" style={{ textTransform: "uppercase" }}>
          {category}
        </Sans>
        <Spacer mb={0.5} />
        <Display size="10" style={{ maxWidth: "800px" }}>
          {name}
        </Display>
      </>
    )
  }

  const TextLoader = () => {
    return (
      <>
        <ContentLoader width="100%" height="98px" style={{ maxWidth: "100%" }}>
          <rect x={0} y={0} width="50" height={12} />
          <rect x={0} y={24} width="600" height={32} />
          <rect x={0} y={68} width="200" height={32} />
        </ContentLoader>
      </>
    )
  }

  const ImageLoader = () => {
    return (
      <ImageLoaderWrapper>
        <ContentLoader width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <rect x={0} y={0} width="100%" height="100%" />
        </ContentLoader>
      </ImageLoaderWrapper>
    )
  }

  return (
    <Flex width="100%" flexDirection="column" px={[0, 0, 2, 2, 2]}>
      <Spacer mb={10} />
      <Link href="/blog/[BlogPost]" as={`/blog/${slug}`}>
        {loading ? <TextLoader /> : <TextContent />}
        <Spacer mb={5} />
        <Box style={{ maxWidth: "1100px", position: "relative" }}>
          {loading ? (
            <ImageLoader />
          ) : (
            <ProgressiveImage imageUrl={image?.url} size="hero" alt={`Image for ${name}`} aspectRatio={0.7} />
          )}
        </Box>
      </Link>
    </Flex>
  )
}

const ImageLoaderWrapper = styled(Box)`
  width: 100%;
  height: 0;
  padding-bottom: calc(100% * 0.7);
  position: relative;
`
