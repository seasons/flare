import { Box, Display, Flex, Link, ProgressiveImage, Sans, Spacer } from "components"
import React from "react"
import ContentLoader from "react-content-loader"
import styled from "styled-components"

export const BlogHero: React.FC<{ blogPost: any; breakpoint: "desktop" | "mobile" }> = ({ blogPost, breakpoint }) => {
  const isDesktop = breakpoint === "desktop"
  const node = blogPost?.node
  const category = node?.category
  const name = node?.name
  const image = node?.image
  const slug = node?.slug
  const loading = !blogPost || true

  const TextContent = () => {
    return (
      <Box px={[2, 2, 0, 0, 0]}>
        <Sans color="black50" size="2" style={{ textTransform: "uppercase" }}>
          {category}
        </Sans>
        <Spacer mb={0.5} />
        <Display size={["7", "10"]} style={{ maxWidth: "800px" }}>
          {name}
        </Display>
      </Box>
    )
  }

  const TextLoader = () => {
    return (
      <>
        <ContentLoader width="100%" height={isDesktop ? "98px" : "74px"} style={{ maxWidth: "100%" }}>
          <rect x={0} y={0} width="50" height={12} />
          <rect x={0} y={isDesktop ? 24 : 24} width={isDesktop ? "600" : "250"} height={isDesktop ? 32 : 23} />
          <rect x={0} y={isDesktop ? 68 : 54} width="200" height={isDesktop ? 32 : 23} />
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
        <Box px={[2, 2, 0, 0, 0]}>{loading ? <TextLoader /> : <TextContent />}</Box>
        <Spacer pb={5} />
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
