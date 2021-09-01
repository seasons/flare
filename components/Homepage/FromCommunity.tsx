import React from "react"
import { Grid } from "../Grid"
import { Sans, Spacer, Box, Flex, Link } from "../"
import { Header } from "../Typography"
import styled from "styled-components"
import { Media } from "../Responsive"
import { imageResize } from "utils/imageResize"

const BlogPost = ({ post }) => {
  const imageSRC = imageResize(post?.image?.url ?? "", "large")

  return (
    <Link href={`/blog/${post.slug}`}>
      <Flex flexDirection="row">
        <img
          src={imageSRC}
          alt={post.image?.alt ?? `Image for ${post.name}`}
          style={{ width: "40%", borderRadius: "8px" }}
        />
        <Flex flexDirection="column" p={2} justifyContent="center">
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
        <Header size="9">Latest thoughts</Header>
        <Link href="/blog">
          <Header size="9" style={{ textDecoration: "underline" }}>
            See all
          </Header>
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
