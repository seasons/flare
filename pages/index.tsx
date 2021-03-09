import { Box, Layout, Media, Separator, Spacer } from "components"
import { HowItWorks, FAQ, FromCommunity, Hero, Plans, TheApp } from "components/Homepage"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { useQuery } from "@apollo/client"
import { HOME_QUERY_WEB, ProductsRail } from "@seasons/eclipse"

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { previousData, data = previousData } = useQuery(HOME_QUERY_WEB, { fetchPolicy: "cache-and-network" })
  const { updateUserSession } = useAuthContext()

  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const communityPosts = data?.blogPosts?.slice(1, 3)
  const featuredBrandItems = navigationData?.brands || []

  useEffect(() => {
    if (!!data?.me?.customer) {
      updateUserSession({ cust: data?.me?.customer })
    }
  }, [data])

  return (
    <Layout showIntercom brandItems={featuredBrandItems}>
      <Hero post={data?.blogPosts?.[0]} />
      <Spacer mb={10} />

      <HowItWorks />

      <Spacer mb={10} />
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <ProductsRail title="Just added tops" items={data?.justAddedTops} />
      <Spacer mb={10} />

      {data?.collections?.map((collection) => {
        return (
          <>
            <Spacer mb={10} />
            <ProductsRail title={collection.title} items={collection?.products} collectionSlug={collection.slug} />
            <Spacer mb={10} />
          </>
        )
      })}

      <FromCommunity blogPosts={communityPosts} />

      {!!data?.newArchival?.length && (
        <>
          <ProductsRail title="New to the archive" items={data?.newArchival} />
          <Spacer mb={10} />
        </>
      )}

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Plans plans={data?.paymentPlans} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <TheApp />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

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
      query: HOME_QUERY_WEB,
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
