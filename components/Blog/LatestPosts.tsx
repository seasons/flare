import { Box, Display, Flex, Link, ProgressiveImage, Sans, Spacer } from "components"
import { Grid, Row, Col } from "components/Grid"
import { Spinner } from "components/Spinner"
import React from "react"

export const LatestPosts = ({ blogPosts, imageContainerRef, aggregateCount }) => {
  return (
    <Grid width="100%" px={[0, 0, 2, 2, 2]}>
      <Box px={[2, 2, 0, 0, 0]}>
        <Display size={["7", "8"]}>Latest posts</Display>
      </Box>
      <Spacer mb={3} />
      <Row ref={imageContainerRef}>
        {blogPosts?.map((post, i) => {
          const node = post?.node
          const category = node?.category
          const name = node?.name
          const image = node?.image
          const author = node?.author
          const slug = node?.slug

          return (
            <Col col sm="4" xs="6" key={i}>
              <Link href="/blog/[BlogPost]" as={`/blog/${slug}`}>
                <Box p="2px">
                  <ProgressiveImage imageUrl={image?.url} size="small" alt={`Image for ${name}`} aspectRatio={0.7} />
                  <Spacer mb={1} />
                  <Sans color="black50" size="2" style={{ textTransform: "uppercase" }}>
                    {category}
                  </Sans>
                  <Sans size="4">{name}</Sans>
                  <Spacer mb={0.5} />
                  <Sans color="black50" size="2">
                    {`By ${author}`}
                  </Sans>
                  <Spacer mb={3} />
                </Box>
              </Link>
            </Col>
          )
        })}
        {!!aggregateCount && aggregateCount > blogPosts?.length && (
          <Box
            mb={5}
            style={{
              width: "100%",
              position: "relative",
              height: "30px",
            }}
          >
            <Spinner />
          </Box>
        )}
      </Row>
    </Grid>
  )
}
