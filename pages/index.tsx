import { Box, Layout, Media, Separator, Spacer } from "components"
import {
  ColumnList, FAQ, FromCommunity, Hero, MembershipBenefits, Plans, ProductRail, TheApp, TheBag
} from "components/Homepage"
import { Nav } from "components/Nav"
import { HOW_IT_WORKS_TEXT } from "components/Product/HowItWorks"
import { ServiceableModal } from "components/ServiceableModal"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { HOME_QUERY } from "queries/homeQueries"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect } from "react"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { data } = useQuery(HOME_QUERY, { fetchPolicy: "cache-and-network" })
  const { updateUserSession, userSession } = useAuthContext()

  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const communityPosts = data?.blogPosts?.slice(1, 3)
  const featuredBrandItems = navigationData?.brands || []
  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled

  useEffect(() => {
    if (!!data?.me?.customer) {
      updateUserSession({ cust: data?.me?.customer })
    }
  }, [data])

  return (
    <Layout fixedNav showIntercom brandItems={featuredBrandItems}>
      <Hero post={data?.blogPosts?.[0]} />
      <Spacer mb={10} />

      <ColumnList items={HOW_IT_WORKS_TEXT} />

      <Spacer mb={10} />
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      {!!data?.justAddedOuterwear?.length && (
        <>
          <Spacer mb={10} />
          <ProductRail title="Just added outerwear" products={data?.justAddedOuterwear} />
          <Spacer mb={10} />
        </>
      )}

      <Spacer mb={10} />
      <ProductRail title="Just added tops" products={data?.justAddedTops} />
      <Spacer mb={10} />

      {!!data?.collection?.length && (
        <>
          <Spacer mb={10} />
          <ProductRail title="The revival collection" products={data?.collection} tag="Revival Collection" />
          <Spacer mb={10} />
        </>
      )}

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

      <Plans plans={data?.paymentPlans} allAccessEnabled={allAccessEnabled} />

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
      <Spacer mb={15} />
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await Promise.all([
    apolloClient.query({
      query: HOME_QUERY,
    }),
    apolloClient.query({
      query: NAVIGATION_QUERY,
    }),
  ])

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default Home
