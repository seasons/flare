import { Box, Container, FixedBackArrow, Flex, Sans } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import gql from "graphql-tag"
import { Loader } from "mobile/Loader"
import { TabBar } from "mobile/TabBar"
import React, { useEffect, useState } from "react"
import { StatusBar } from "react-native"
import { screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

import { PersonalTab } from "./PersonalTab"
import { SizingTab } from "./SizingTab"

const GET_PREFERENCES = gql`
  query GetUserPreferences {
    me {
      customer {
        id
        user {
          id
          createdAt
          firstName
          lastName
          email
        }
        detail {
          id
          height
          weight
          topSizes
          waistSizes
          phoneNumber
          shippingAddress {
            id
            name
            address1
            address2
            zipCode
            city
            state
          }
          stylePreferences {
            id
            styles
            patterns
            colors
            brands
          }
        }
      }
    }
  }
`

export enum Tab {
  Personal,
  Sizing,
}

export const PersonalPreferences = screenTrack()(({ navigation, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab ? initialTab : Tab.Personal)
  const { openDrawer } = useDrawerContext()
  const { error, previousData, data = previousData, refetch } = useQuery(GET_PREFERENCES)

  useEffect(() => {
    const unsubscribe = navigation?.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content")
      refetch?.()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  useEffect(() => {}, [data])

  if (!data) {
    return (
      <Flex>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" />
        <Loader />
      </Flex>
    )
  }

  if (error) {
    console.error("error PersonalPreferences.tsx: ", error)
    return null
  }

  const customer = data?.me?.customer
  const stylePreferences = customer?.detail?.stylePreferences
  const phoneNumber = customer?.detail?.phoneNumber
  const measurements = {
    height: customer?.detail?.height,
    weight: customer?.detail?.weight,
    topSizes: customer?.detail?.topSizes,
    waistSizes: customer?.detail?.waistSizes,
  }
  const user = customer?.user
  const createdAt = user?.createdAt
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName

  const renderItem = (tab: Tab) => {
    switch (tab) {
      case Tab.Personal:
        return (
          <PersonalTab
            createdAt={createdAt}
            email={email}
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
          />
        )
      case Tab.Sizing:
        return <SizingTab navigation={navigation} rawMeasurements={measurements} />
    }
  }

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => {
          openDrawer("profile")
        }}
      />
      <Box mt={80} pt={4} mb={3} mx={2}>
        <Sans size="6">Sizing & Preferences</Sans>
      </Box>
      <TabBar
        spaceEvenly
        tabs={["Personal", "Sizing"]}
        disabledTabs={[]}
        activeTab={activeTab}
        goToPage={(tab: Tab) => {
          // analytics
          setActiveTab(tab)
        }}
      />

      {renderItem(activeTab)}
    </Container>
  )
})
