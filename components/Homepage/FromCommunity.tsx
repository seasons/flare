import React from "react"
import { Grid } from "../Grid"
import { Sans, Spacer, Box, Flex } from "../"
import { Display } from "../Typography"
import styled from "styled-components"
import { Media } from "../Responsive"

export const FromCommunity: React.FC<{ blogPosts: any }> = ({ blogPosts }) => {
  if (!blogPosts) {
    return null
  }
  const BlogPost = ({ post }) => {
    return (
      <StyledAnchor href={post.url}>
        <Box>
          <img src={post.imageURL} alt={post.name} />
          <Spacer mb={2} />
          <Sans size="7">{post.name}</Sans>
          {post.author && (
            <>
              <Spacer mb={1} />
              <Sans size="3" color="black50">
                {post.author === "Seasons" ? "The Seasons Team" : post.author}
              </Sans>
            </>
          )}
        </Box>
      </StyledAnchor>
    )
  }
  return (
    <Grid>
      <Box px={[2, 2, 2, 2, 2]}>
        <Display size="7">Latest thoughts</Display>
      </Box>
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

const StyledAnchor = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`
