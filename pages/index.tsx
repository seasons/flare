import { Box, Separator, Spacer } from "components"
import {
  HowItWorks,
  Hero,
  FeaturedIn,
  TheApp,
  BrowseAllWithImage,
  HomepageFitPics,
  FromCommunity,
  Testimonials,
  Plans,
} from "components/Homepage"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useEffect, useRef } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { useQuery } from "@apollo/client"
import { Layout } from "components/Layout"
import { ProductsRail } from "@seasons/eclipse"
import { useRouter } from "next/router"
import { LaunchCalendar } from "components/Homepage/LaunchCalendar"
import { Home_Query } from "queries/homeQueries"
import { PartnerModal } from "components/Partner/PartnerModal"
import { imageResize } from "utils/imageResize"

// TODO: Make this not hardcoded later
const SHOW_PARTNER_MODAL_CAMPAIGNS = ["onedapperstreet", "threadability"]

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { previousData, data = previousData, refetch } = useQuery(Home_Query)
  const { updateUserSession, authState } = useAuthContext()
  const router = useRouter()

  const newestBrand = data?.newestBrandProducts?.[0]?.brand
  const communityPosts = data?.blogPosts?.slice(1, 3)
  const isUserSignedIn = authState?.isSignedIn
  const userSignedIn = useRef(isUserSignedIn)

  const showPartnerModal = SHOW_PARTNER_MODAL_CAMPAIGNS.includes(router.query["utm_campaign"] as string)

  useEffect(() => {
    if (!!data?.me?.customer) {
      updateUserSession({ cust: data?.me?.customer })
    }
  }, [data])

  useEffect(() => {
    // Keep track of when a user signs in and refresh the page if they do
    if (isUserSignedIn !== userSignedIn.current) {
      refetch()
      userSignedIn.current = isUserSignedIn
      console.log("userSignedIn.current", userSignedIn.current)
    }
  }, [isUserSignedIn])

  const SeparatorWithPadding = () => {
    return (
      <Box px={[2, 2, 2, 2, 2]}>
        <Separator />
      </Box>
    )
  }

  const partnerData = getPartnerDataFromUTMCampaign(router.query["utm_campaign"])
  return (
    <Layout showIntercom>
      <Hero post={data?.blogPosts?.[0]} />

      <FeaturedIn />
      <SeparatorWithPadding />

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
            imageIndex={2}
            items={data?.newestBrandProducts}
          />
          <Spacer mb={10} />
        </>
      )}

      <Spacer mb="128px" />
      <HowItWorks />
      <Spacer mb="135px" />

      <BrowseAllWithImage />

      <Spacer mb={10} />
      <SeparatorWithPadding />
      <Spacer mb={3} />

      <Plans plans={data?.paymentPlans} />
      <Spacer mb={3} />

      <SeparatorWithPadding />
      <Spacer mb={10} />

      {data?.newArchival.length > 0 && (
        <>
          <ProductsRail
            title="New to the archive"
            underlineTitleOnClick={() => {
              router.push(`/browse}`)
            }}
            items={data?.newArchival}
          />
          <Spacer mb={10} />
        </>
      )}

      <SeparatorWithPadding />
      <Spacer mb={10} />

      {data?.fitPics?.length > 0 && (
        <>
          <HomepageFitPics fitPics={data.fitPics} />
          <Spacer mb={10} />
          <Box px={[2, 2, 2, 2, 2]}>
            <Separator />
          </Box>
          <Spacer mb={10} />
        </>
      )}

      <Testimonials />
      <Spacer mb={10} />

      <SeparatorWithPadding />

      <Spacer mb={10} />

      <FromCommunity blogPosts={communityPosts} />

      <Spacer mb={10} />

      <SeparatorWithPadding />

      <Spacer mb={10} />

      <LaunchCalendar launches={data?.launches} />

      <Spacer mb="112px" />
      <TheApp />
      <Spacer mb={10} />
      <PartnerModal open={showPartnerModal} {...partnerData} />
    </Layout>
  )
})

const getPartnerDataFromUTMCampaign = (utm_campaign) => {
  let data = {}
  switch (utm_campaign) {
    case "threadability":
      data["partnerName"] = "Threadability"
      data["detail"] = "Subscribe today to get 25% off your first month's membership dues."
      // TODO: Add image url
      break
    case "onedapperstreet":
      data["partnerName"] = "One Dapper Street"
      data["detail"] = "Subscribe today to get 25% off your first month's membership dues."
      // TODO: Replace with real image later
      data["imageURL"] = imageResize("https://seasons-images.s3.amazonaws.com/MarcelPlaceholder.jpg", "medium")
      break
    default:
      break
  }
  return data
}
export async function getStaticProps() {
  const apolloClient = initializeApollo()
  await Promise.all([
    apolloClient.query({
      query: Home_Query,
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
