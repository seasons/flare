import { Layout, Media, Spacer } from "components"
import { withRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { gql, useQuery } from "@apollo/client"
import { BlogHero } from "components/Blog/BlogHero"
import { LatestPosts } from "components/Blog/LatestPosts"
import { debounce } from "lodash"

export const Blog_Query = gql`
  query Blog_Query($first: Int!, $skip: Int!) {
    connection: blogPostsConnection(where: { published: true }) {
      aggregate {
        count
      }
    }
    blogPosts: blogPostsConnection(first: $first, skip: $skip, where: { published: true }) {
      edges {
        node {
          id
          slug
          url
          name
          author
          category
          image {
            id
            url
          }
        }
      }
    }
  }
`

const Blog = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.BlogPage,
    path: router?.asPath,
  }
})(({ router }) => {
  const [first, setFirst] = useState(10)
  const imageContainerRef = useRef(null)

  const { previousData, data = previousData, loading, fetchMore } = useQuery(Blog_Query, {
    variables: {
      first,
      skip: 0,
    },
  })

  const blogPosts = data?.blogPosts?.edges
  const aggregateCount = data?.connection?.aggregate?.count

  const onScroll = debounce(() => {
    const shouldLoadMore =
      !loading &&
      !!aggregateCount &&
      aggregateCount > blogPosts?.length &&
      window.innerHeight >= imageContainerRef?.current?.getBoundingClientRect().bottom - 200

    if (shouldLoadMore) {
      fetchMore({
        variables: {
          skip: blogPosts?.length,
        },
      }).then((fetchMoreResult: any) => {
        setFirst(blogPosts.length + fetchMoreResult?.data?.blogPosts?.edges?.length)
      })
    }
  }, 100)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll)
    }
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  const Content: React.FC<{ breakpoint: "desktop" | "mobile" }> = ({ breakpoint }) => {
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

  return (
    <Layout>
      <Media greaterThan="sm">
        <Content breakpoint="desktop" />
      </Media>
      <Media lessThan="md">
        <Content breakpoint="mobile" />
      </Media>
    </Layout>
  )
})

export default withRouter(Blog)
