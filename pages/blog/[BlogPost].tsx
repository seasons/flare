import { Box, Display, Flex, Layout, Sans, ProgressiveImage, Spacer } from "components"
import Head from "next/head"
import { withRouter } from "next/router"
import React from "react"
import styled from "styled-components"
import { Schema, screenTrack } from "utils/analytics"
import { useQuery } from "@apollo/client"
import { HEAD_META_TITLE } from "components/LayoutHead"
import { BlogPost_Query } from "queries/blogPostQueries"
import { initializeApollo } from "lib/apollo"
import { Blog_Query } from "."

const BlogPost = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.BlogPostPage,
    entitySlug: router?.query?.BlogPost,
    path: router?.asPath,
  }
})(({ router }) => {
  const slug = router.query.BlogPost || ""

  const { previousData, data = previousData } = useQuery(BlogPost_Query, {
    variables: {
      slug,
    },
  })

  const blogPost = data && data.blogPost
  const name = blogPost?.name
  const content = blogPost?.content
  const summary = blogPost?.summary
  const category = blogPost?.category
  const author = blogPost?.author

  return (
    <Layout includeDefaultHead={false}>
      <Head>
        <title>{!!name ? `Seasons | ${name}` : HEAD_META_TITLE}</title>
        <meta content={summary} name="description" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={summary} />
        <meta property="twitter:description" content={summary} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Seasons" />
        <meta property="og:url" content={`https://www.wearseasons.com/blog/${slug}`} />
        <meta
          property="og:image"
          content={
            blogPost?.image?.url.replace("fm=webp", "fm=jpg") ||
            "https://flare-web.s3.amazonaws.com/assets/og-image.jpg"
          }
        />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Box pt={[1, 5]} px={[2, 2, 2, 2, 2]}>
        <Spacer mt={10} />
        <Flex flexDirection="row" justifyContent="center" width="100%">
          <Box style={{ width: "80%", maxWidth: "770px" }}>
            <Display size="7" style={{ textTransform: "capitalize" }}>
              {category}
            </Display>
            <Spacer mb={3} />
            <Display size="11" color="black100">
              {name}
            </Display>
            <Spacer mb={3} />
            <Sans size="4" color="black50">
              {author}
            </Sans>
          </Box>
        </Flex>
        <Spacer mb={10} />

        <ProgressiveImage imageUrl={blogPost?.image?.url} size="hero" alt={`Image for ${name}`} aspectRatio={0.7} />
        <ContentWrapper>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
        </ContentWrapper>
      </Box>
    </Layout>
  )
})

const ContentWrapper = styled("div")`
  display: flex;
  padding: 60px 30px;
  justify-content: center;
  align-items: center;
`

const Content = styled("div")`
  display: block;
  max-width: 800px;

  p {
    font-family: "ProximaNova-Medium", sans-serif;
    color: #4d4d4d;
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 30px;
  }

  a {
    font-family: "ProximaNova-Medium", sans-serif;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    text-decoration: underline;
    text-transform: none;
  }

  strong {
    color: #000;
    font-weight: 700;
  }

  figcaption {
    font-family: "ProximaNova-Medium", sans-serif;
    margin-top: 5px;
    margin-bottom: 30px;
    color: #666;
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    text-align: left;
  }

  img {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  figure {
    margin: 0;
  }
`

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const response = await apolloClient.query({
    query: Blog_Query,
    variables: {
      first: 30,
      skip: 0,
    },
  })

  const paths = []

  const blogPosts = response?.data?.blogPosts?.edges

  blogPosts?.forEach((blogPost) => {
    paths.push({ params: { BlogPost: blogPost?.node?.slug } })
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const slug = params?.BlogPost

  try {
    await apolloClient.query({
      query: BlogPost_Query,
      variables: {
        slug: slug,
      },
    })
  } catch (e) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default withRouter(BlogPost)
