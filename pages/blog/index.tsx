import { Layout, Media } from "components"
import { withRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { gql, useQuery } from "@apollo/client"
import { BlogContent } from "components/Blog/BlogContent"
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
  const PAGE_LENGTH = 10
  const [first, setFirst] = useState(PAGE_LENGTH)
  const imageContainerRef = useRef(null)
  const imageContainerRefMobile = useRef(null)

  const { previousData, data = previousData, loading, fetchMore } = useQuery(Blog_Query, {
    variables: {
      first,
      skip: 0,
    },
  })

  const blogPosts = data?.blogPosts?.edges
  const aggregateCount = data?.connection?.aggregate?.count

  const onScroll = debounce(() => {
    const desktopContainerBottom = imageContainerRef?.current?.getBoundingClientRect().bottom
    const mobileContainerBottom = imageContainerRefMobile?.current?.getBoundingClientRect().bottom
    const shouldLoadMore =
      !loading &&
      !!aggregateCount &&
      aggregateCount > blogPosts?.length &&
      ((window.innerHeight >= desktopContainerBottom - 200 && desktopContainerBottom > 0) ||
        (window.innerHeight >= imageContainerRef?.current?.getBoundingClientRect().bottom - 200 &&
          mobileContainerBottom > 0))

    if (shouldLoadMore) {
      fetchMore({
        variables: {
          skip: blogPosts?.length,
        },
      }).then(() => {
        setFirst(PAGE_LENGTH + blogPosts?.length)
      })
    }
  }, 300)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll)
    }
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  return (
    <Layout>
      <Media greaterThan="sm">
        <BlogContent
          breakpoint="desktop"
          blogPosts={blogPosts}
          aggregateCount={aggregateCount}
          imageContainerRef={imageContainerRef}
        />
      </Media>
      <Media lessThan="md">
        <BlogContent
          breakpoint="mobile"
          blogPosts={blogPosts}
          aggregateCount={aggregateCount}
          imageContainerRef={imageContainerRefMobile}
        />
      </Media>
    </Layout>
  )
})

export default withRouter(Blog)
