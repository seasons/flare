import { Box, Button, Container, FixedBackArrow, Sans, Separator, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import gql from "graphql-tag"
import { color } from "helpers/color"
import { Loader } from "mobile/Loader"
import React from "react"
import { ScrollView } from "react-native"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"

import { PauseButtons } from "../Components/Pause"
import { MembershipCard } from "./Components"

export const GET_MEMBERSHIP_INFO = gql`
  query GetMembershipInfo {
    me {
      customer {
        id
        status
        invoices {
          id
          subscriptionId
          dueDate
        }
        user {
          id
        }
        membership {
          id
          pauseRequests(orderBy: createdAt_DESC) {
            id
            resumeDate
            pauseDate
            pausePending
          }
          plan {
            id
            price
            description
            tier
          }
        }
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export const MembershipInfo = screenTrack()(({ navigation }) => {
  const { openDrawer } = useDrawerContext()
  const { previousData, data = previousData } = useQuery(GET_MEMBERSHIP_INFO)
  const customer = data?.me?.customer
  const firstName = data?.me?.user?.firstName
  const lastName = data?.me?.user?.lastName
  const plan = customer?.membership?.plan

  if (!plan) {
    return (
      <>
        <FixedBackArrow
          navigation={navigation}
          variant="whiteBackground"
          onPress={() => {
            openDrawer("profile")
          }}
        />
        <Loader />
      </>
    )
  }

  const whatsIncluded = plan?.description?.split("\n")

  return (
    <Container insetsBottom={false}>
      <FixedBackArrow
        navigation={navigation}
        variant="whiteBackground"
        onPress={() => {
          openDrawer("profile")
        }}
      />
      <ScrollView>
        <Box px={2} pt={4}>
          <Spacer mb={80} />
          <Sans size="6">Membership info</Sans>
          <Spacer mb={3} />
          <MembershipCard memberName={`${firstName} ${lastName}`} planTier={plan?.tier} />
          <Spacer mb={4} />
          {!!plan?.price && (
            <>
              <Sans size="4">What you pay</Sans>
              <Spacer mb={2} />
              <Separator />
              <Spacer mb={1} />
              <Sans size="4" color={color("black50")}>
                {`$${plan.price / 100}`} / per month
              </Sans>
            </>
          )}
          {!!whatsIncluded && (
            <>
              <Spacer mb={4} />
              <Sans size="4">Whats included</Sans>
              <Spacer mb={2} />
              <Separator />
              {whatsIncluded.map((text) => (
                <Box key={text}>
                  <Spacer mb={1} />
                  <Sans size="4" color={color("black50")}>
                    {text.trim()}
                  </Sans>
                </Box>
              ))}
            </>
          )}
          <Spacer mb={4} />
          <Sans size="4">Change your plan</Sans>
          <Spacer mb={2} />
          <Button variant="secondaryOutline" block onClick={() => openDrawer("choosePlan", { source: "Update" })}>
            View membership options
          </Button>
          <Spacer mb={4} />
          <Sans size="4">Pause or cancel</Sans>
          <Spacer mb={2} />
          <PauseButtons customer={customer} />
        </Box>
      </ScrollView>
    </Container>
  )
})
