import { Box, MaxWidth, Media, Separator, Spacer } from "components"
import { FeaturedIn, FromCommunity, Hero, HomepageFitPics, HowItWorks, Plans, TheApp } from "components/Homepage"
import { Layout } from "components/Layout"
import { PartnerModal } from "components/Partner/PartnerModal"
import { initializeApollo } from "lib/apollo/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import { HomeMe_Query, Home_Query } from "queries/homeQueries"
import React, { useEffect, useRef, useState } from "react"
import { Schema, screenTrack } from "utils/analytics"
import { imageResize } from "utils/imageResize"
import { useQuery } from "@apollo/client"
import { ProductCarousel } from "components/ProductCarousel"
import { Discover } from "components/Homepage/Discover"
import { color } from "helpers"
import { DESKTOP_NAV_HEIGHT } from "components/Nav/DesktopNav"
import { ButtonVariant } from "components/Button/Button.shared"

// TODO: Make this not hardcoded later
const SHOW_PARTNER_MODAL_CAMPAIGNS = ["onedapperstreet", "threadability"]

export const DESKTOP_HERO_HEIGHT = 700

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const defaultNavStyles = {
    backgroundColor: "transparent",
    textColor: color("white100"),
    buttonVariant: "transparentOutlineWhite" as ButtonVariant,
  }
  const { previousData, data = previousData, error } = useQuery(Home_Query)
  const { previousData: mePreviousData, data: meData = mePreviousData, refetch: meRefetch } = useQuery(HomeMe_Query)
  const { updateUserSession, authState, toggleLoginModal } = useAuthContext()
  const [navStyles, setNavStyles] = useState(defaultNavStyles)
  const router = useRouter()

  const onScroll = () => {
    if (typeof window !== undefined) {
      if (window.pageYOffset >= DESKTOP_HERO_HEIGHT - DESKTOP_NAV_HEIGHT) {
        setNavStyles({
          backgroundColor: color("white100"),
          textColor: color("black100"),
          buttonVariant: "primaryWhite" as ButtonVariant,
        })
      } else {
        setNavStyles(defaultNavStyles)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll)
    }
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

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
    <Layout showIntercom disableMaxWidth navStyles={navStyles}>
      <Hero />
      <MaxWidth>
        <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
          <FeaturedIn />
          <SeparatorWithPadding />
        </Box>
      </MaxWidth>

      {!!data?.newArrivals?.length && (
        <>
          <Spacer mb={10} />
          <ProductCarousel title="New arrivals" products={data?.newArrivals} saveProductRefetchQueries={[]} />
          <Spacer mb={10} />
        </>
      )}

      <Media greaterThanOrEqual="md">
        <MaxWidth>
          <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
            <Spacer mb="128px" />
            <HowItWorks />
            <Spacer mb={10} />
          </Box>
        </MaxWidth>
      </Media>

      {data?.upcomingProducts.length > 0 && (
        <>
          <ProductCarousel title="Upcoming releases" products={data?.upcomingProducts} saveProductRefetchQueries={[]} />
          <Spacer mb={10} />
        </>
      )}

      <MaxWidth>
        <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
          <Discover />
          <Media lessThan="md">
            <Spacer mb={10} />
            <HowItWorks />
            <Spacer mb={10} />
          </Media>
        </Box>
      </MaxWidth>

      <Spacer mb={160} />
      <Plans plans={data?.paymentPlans} />
      <Spacer mb={160} />

      <MaxWidth>
        <Box style={{ flexGrow: 1, position: "relative", width: "100%" }}>
          {data?.fitPics?.length > 0 && (
            <>
              <HomepageFitPics fitPics={data.fitPics} />
              <Spacer mb={10} />
            </>
          )}

          <Spacer mb={160} />
          <TheApp />
          <Spacer mb={10} />

          <FromCommunity blogPosts={data?.blogPosts} />

          <Spacer mb={6} />
          <PartnerModal open={showPartnerModal} {...partnerData} />
        </Box>
      </MaxWidth>
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
