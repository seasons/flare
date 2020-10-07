import React from "react"
import { Nav } from "../components/Nav/Nav"
import {
  ColumnList,
  Hero,
  ProductRail,
  ChooseMembership,
  FAQ,
  Brands,
  MembershipBenefits,
  TheBag,
  TheApp,
  FromCommunity,
} from "../components/Homepage"
import { Spacer, Layout, Separator, Box } from "../components"
import { useQuery } from "@apollo/client"
import { screenTrack, Schema } from "../utils/analytics"
import { BRAND_LIST } from "../components/Homepage/Brands"
import { HOW_IT_WORKS_TEXT } from "../components/Product/HowItWorks"
import { initializeApollo } from "../lib/apollo"
import { HOME_QUERY } from "../queries/homeQueries"

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { data } = useQuery(HOME_QUERY, {
    variables: {
      brandSlugs: BRAND_LIST,
    },
  })

  const communityPosts = data?.blogPosts?.slice(1, 3)

  return (
    <Layout fixedNav>
      <Nav fixed />
      <Hero post={data?.blogPosts?.[0]} />
      <Spacer mb={10} />

      <ColumnList items={HOW_IT_WORKS_TEXT} />

      <Spacer mb={10} />
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <ProductRail title="Just added tops" products={data?.justAddedTops} />

      <Spacer mb={10} />
      <FromCommunity blogPosts={communityPosts} />

      {!!data?.justAddedBottoms?.length && (
        <>
          <Spacer mb={10} />
          <ProductRail title="Just added bottoms" products={data?.justAddedBottoms} />
          <Spacer mb={10} />
        </>
      )}

      {!!data?.newArchival?.length && (
        <>
          <ProductRail title="New to the archive" products={data?.newArchival} />
          <Spacer mb={10} />
        </>
      )}

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <ChooseMembership paymentPlans={data?.paymentPlans} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <TheApp />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <MembershipBenefits />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <TheBag />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <FAQ />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <Brands brands={data?.brands} />
      <Spacer mb={15} />
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: HOME_QUERY,
    variables: {
      brandSlugs: BRAND_LIST,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Home
