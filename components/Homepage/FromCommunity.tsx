import React from "react"
import { Grid } from "../Grid"
import { Sans, Spacer, Box, Flex } from "../"
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
          <Spacer mb={3} />
          <Sans size={["5", "6"]}>{post.name}</Sans>
          {post.author && (
            <>
              <Spacer mb={1} />
              <Sans size="3" color="black50">
                By {post.author === "Seasons" ? "The Seasons Team" : post.author}
              </Sans>
            </>
          )}
        </Box>
      </StyledAnchor>
    )
  }
  return (
    <Grid>
      <Box px={[2, 0]}>
        <Sans size={["5", "6"]} px={0.5}>
          Latest from our community
        </Sans>
      </Box>
      <Spacer mb={2} />
      <Media greaterThanOrEqual="md">
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" px={0.5}>
          {blogPosts.map((post, index) => {
            let pr = 1
            let pl = 1
            if (index === 0) {
              pl = 0
            } else if (index === blogPosts.length - 1) {
              pr = 0
            } else {
              pr = 0.5
              pl = 0.5
            }
            return (
              <Flex key={"desktop" + index} pr={pr} pl={pl} style={{ flex: 3 }}>
                <BlogPost post={post} />
              </Flex>
            )
          })}
        </Flex>
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
