import { Box, Layout, Separator, Spacer } from "components"
import { HowItWorks, Hero, FeaturedIn, TheApp, BrowseAllWithImage } from "components/Homepage"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useEffect } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { useQuery } from "@apollo/client"
import { HOME_QUERY_WEB, ProductsRail } from "@seasons/eclipse"
import { useRouter } from "next/router"

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { previousData, data = previousData } = useQuery(HOME_QUERY_WEB, { fetchPolicy: "cache-and-network" })
  const { updateUserSession } = useAuthContext()
  const router = useRouter()
  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const featuredBrandItems = navigationData?.brands || []

  const newestBrand = data?.newestBrandProducts?.[0]?.brand

  useEffect(() => {
    if (!!data?.me?.customer) {
      updateUserSession({ cust: data?.me?.customer })
    }
  }, [data])

  return (
    <Layout showIntercom brandItems={featuredBrandItems}>
      <Hero post={data?.blogPosts?.[0]} />

      <FeaturedIn />
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      {!!data?.newestBrandProducts?.length && newestBrand && (
        <>
          <Spacer mb={10} />
          <ProductsRail
            title="New arrivals from"
            underlineTitleText={newestBrand?.name}
            showProductName
            underlineTitleOnClick={() => {
              router.push(`/designer/${newestBrand?.slug}`)
            }}
            imageIndex={1}
            items={data?.newestBrandProducts}
          />
          <Spacer mb={10} />
        </>
      )}
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <HowItWorks />
      <Spacer mb={10} />

      <BrowseAllWithImage />

      <Spacer mb={10} />
      <TheApp />
      <Spacer mb={10} />
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
