import { Box, Separator, Spacer } from "components"
import {
  BrowseAllWithImage,
  FeaturedIn,
  FromCommunity,
  Hero,
  HomepageFitPics,
  HowItWorks,
  Plans,
  Testimonials,
  TheApp,
} from "components/Homepage"
import { LaunchCalendar } from "components/Homepage/LaunchCalendar"
import { Layout } from "components/Layout"
import { PartnerModal } from "components/Partner/PartnerModal"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import { HomeMe_Query, Home_Query } from "queries/homeQueries"
import React, { useEffect, useRef } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { imageResize } from "utils/imageResize"

import { useQuery } from "@apollo/client"
import { ProductsRail } from "@seasons/eclipse"
import { CarbonFootprint } from "components/Homepage/CarbonFootprint"

// TODO: Make this not hardcoded later
const SHOW_PARTNER_MODAL_CAMPAIGNS = ["onedapperstreet", "threadability"]

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { previousData, data = previousData } = useQuery(Home_Query)
  const { previousData: mePreviousData, data: meData = mePreviousData, refetch: meRefetch } = useQuery(HomeMe_Query)
  const { updateUserSession, authState, toggleLoginModal } = useAuthContext()
  const router = useRouter()

  const newestBrand = data?.newestBrandProducts?.[0]?.brand
  const communityPosts = data?.blogPosts?.slice(1, 3)
  const isUserSignedIn = authState?.isSignedIn
  const userSignedIn = useRef(isUserSignedIn)

  const showPartnerModal = SHOW_PARTNER_MODAL_CAMPAIGNS.includes(router.query["utm_campaign"] as string)

  useEffect(() => {
    if (!!meData?.me?.customer) {
      updateUserSession({ cust: meData?.me?.customer })
    }
  }, [meData])

  useEffect(() => {
    // Keep track of when a user signs in and refresh the page if they do
    if (isUserSignedIn !== userSignedIn.current) {
      meRefetch()
      userSignedIn.current = isUserSignedIn
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
            authState={authState}
            onShowLoginModal={() => toggleLoginModal(true)}
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

      {data?.newBottoms.length > 0 && (
        <>
          <ProductsRail
            title="Just added bottoms"
            underlineTitleOnClick={() => {
              router.push(`/browse}`)
            }}
            items={data?.newBottoms}
            authState={authState}
            onShowLoginModal={() => toggleLoginModal(true)}
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
      <CarbonFootprint />
      <Spacer mb={2} />
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
      data["secondaryCTA"] = "browseItems"
      data["imageURL"] = imageResize("https://seasons-images.s3.amazonaws.com/DavidSplashPage.jpg", "medium")
      // TODO: Add image url
      break
    case "onedapperstreet":
      data["partnerName"] = "One Dapper Street"
      data["detail"] = "Subscribe today to get 25% off your first month's membership dues."
      // TODO: Replace with real image later
      data["imageURL"] = imageResize("https://seasons-images.s3.amazonaws.com/MarcelSplashPage.jpg", "medium")
      data["secondaryCTA"] = "browseItems"
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
