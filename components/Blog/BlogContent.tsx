import {  Spacer } from "components"
import React from "react"
import { BlogHero } from "components/Blog/BlogHero"
import { LatestPosts } from "components/Blog/LatestPosts"

export const BlogContent: React.FC<{
  breakpoint: "desktop" | "mobile"
  blogPosts
  aggregateCount: number
  imageContainerRef
}> = ({ breakpoint, blogPosts, imageContainerRef, aggregateCount }) => {
  return (
    <>
      <BlogHero blogPost={blogPosts?.[0]} breakpoint={breakpoint} />
      <Spacer mb={[6, 10]} />
      <LatestPosts
        blogPosts={blogPosts?.slice(1)}
        imageContainerRef={imageContainerRef}
        aggregateCount={aggregateCount}
      />
      <Spacer mb={6} />
    </>
  )
}
