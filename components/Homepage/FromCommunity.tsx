import React from "react"
import { Grid } from "../Grid"
import { Sans, Spacer, Box, Flex, Link, Display } from "../"
import { Media } from "../Responsive"
import { imageResize } from "utils/imageResize"

const BlogPost = ({ post }) => {
  const imageSRC = imageResize(post?.image?.url ?? "", "large")

  return (
    <Link href={`/blog/${post.slug}`}>
      <Flex flexDirection="row" alignItems="center">
        <Box style={{ width: "40%", height: "112px", borderRadius: "8px", overflow: "hidden" }}>
          <img
            src={imageSRC}
            alt={post.image?.alt ?? `Image for ${post.name}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        <Flex flexDirection="column" px={2} justifyContent="center" width="60%">
          {post.author && (
            <>
              <Spacer mb={1} />
              <Sans size="3" color="black50">
                {post.author === "Seasons" ? "The Seasons Team" : post.author}
              </Sans>
            </>
          )}
          <Sans size="4">{post.name}</Sans>
        </Flex>
      </Flex>
    </Link>
  )
}

export const FromCommunity: React.FC<{ blogPosts: any }> = ({ blogPosts }) => {
  if (!blogPosts) {
    return null
  }

  return (
    <Grid>
      <Flex px={[2, 2, 2, 2, 2]} flexDirection="row" justifyContent="space-between">
        <Display size={["7", "9"]}>Latest thoughts</Display>
        <Link href="/blog">
          <Display size={["7", "9"]} style={{ textDecoration: "underline" }}>
            See all
          </Display>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Media greaterThanOrEqual="md">
        <Box px={[0, 0, 0, 0, 0]}>
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between">
            {blogPosts.map((post, index) => {
              return (
                <Flex key={"desktop" + index} px={2} style={{ flex: 3 }}>
                  <BlogPost post={post} />
                </Flex>
              )
            })}
          </Flex>
        </Box>
      </Media>
      <Media lessThan="md">
        {blogPosts.map((post, index) => {
          return (
            <Box key={"mobile" + index} px={2}>
              <BlogPost post={post} />
              <Spacer mb={4} />
            </Box>
          )
        })}
      </Media>
    </Grid>
  )
}
