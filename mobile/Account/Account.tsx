import { Box, Button, Flex, Sans, Separator, Skeleton, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import {
  ChevronIcon,
  LogoutIcon,
  MembershipInfoIcon,
  PaymentShippingIcon,
  PersonalPreferencesIcon,
  PrivacyPolicy,
  QuestionMark,
  TermsOfService,
} from "components/Icons"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Linking, ScrollView } from "react-native"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useQuery } from "@apollo/client"

import { Container } from "../Container"
import { AccountList, CustomerStatus, OnboardingChecklist } from "./Lists"

export enum UserState {
  Undetermined,
  Admitted,
  Waitlisted,
}

export enum State {
  CreateAccount = "CreateAccount",
  SendCode = "SendCode",
  VerifyCode = "VerifyCode",
  GetMeasurements = "GetMeasurements",
  Triage = "Triage",

  ChoosePlan = "ChoosePlan",
  CreditCardForm = "CreditCardForm",
  Welcome = "Welcome",

  Waitlisted = "Waitlisted",
}

export const GET_USER = gql`
  query GetUser {
    me {
      customer {
        id
        status
        onboardingSteps
        user {
          id
          firstName
          lastName
          email
          roles
          pushNotification {
            id
            status
          }
        }
        detail {
          id
          height
          weight
          topSizes
          waistSizes
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

export const Account = screenTrack()(({ navigation }) => {
  const tracking = useTracking()
  const router = useRouter()
  const { openDrawer, closeDrawer, isOpen, currentView } = useDrawerContext()

  const { signOut } = useAuthContext()
  const { data, refetch } = useQuery(GET_USER)

  useEffect(() => {
    if (currentView === "profile" && isOpen) {
      refetch()
    }
  }, [isOpen, currentView])

  const customer = data?.me?.customer
  const onboardingSteps = customer?.onboardingSteps
  const status = customer?.status

  const user = customer?.user
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName
  const pushNotification = user?.pushNotification
  const roles = user?.roles

  const detail = customer?.detail
  const shippingAddress = detail?.shippingAddress
  const stylePreferences = detail?.stylePreferences
  const rawMeasurements = {
    height: detail?.height,
    weight: detail?.weight,
    topSizes: detail?.topSizes,
    waistSizes: detail?.waistSizes,
  }

  const ListSkeleton = () => {
    return (
      <Box pt="5px">
        {[...Array(4)].map((_arr, index) => (
          <Box mb={index !== 3 ? "43px" : 0} key={index}>
            <Flex flexDirection="row" flexWrap="nowrap" alignItems="center" justifyContent="space-between">
              <Flex flexDirection="row" alignItems="center">
                <Skeleton width={22} height={27} />
                <Spacer mr={2} />
                <Skeleton width={150} height={20} />
              </Flex>
              <ChevronIcon />
            </Flex>
          </Box>
        ))}
      </Box>
    )
  }

  const topList = [
    {
      title: "Membership info",
      icon: <MembershipInfoIcon />,
      onPress: () => openDrawer("membershipInfo"),
      tracking: Schema.ActionNames.MembershipInfoTapped,
    },
    {
      title: "Personal preferences",
      icon: <PersonalPreferencesIcon />,
      onPress: () => openDrawer("personalPreferences"),
      tracking: Schema.ActionNames.PersonalPreferencesTapped,
    },
    {
      title: "Payment & shipping",
      icon: <PaymentShippingIcon />,
      onPress: () => openDrawer("paymentAndShipping"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
  ]

  const bottomList = [
    {
      title: "Help and support",
      icon: <QuestionMark />,
      onPress: () => Linking.openURL(`mailto:membership@seasons.nyc?subject=Support`),
      tracking: Schema.ActionNames.SupportTapped,
    },
    {
      title: "Privacy policy",
      icon: <PrivacyPolicy />,
      tracking: Schema.ActionNames.PrivacyPolicyTapped,
      onPress: () => {
        router.push("/privacy-policy")
      },
    },
    {
      title: "Terms of Service",
      icon: <TermsOfService />,
      tracking: Schema.ActionNames.TermsOfServiceTapped,
      onPress: () => {
        router.push("/terms-of-service")
      },
    },
    {
      title: "Log out",
      icon: <LogoutIcon />,
      tracking: Schema.ActionNames.LogOutTapped,
      onPress: () => {
        signOut()
        closeDrawer()
        router.push("/")
      },
    },
  ]

  const renderBody = () => {
    switch (status) {
      case CustomerStatus.Created:
      case CustomerStatus.Waitlisted:
        const userState = status == CustomerStatus.Created ? UserState.Undetermined : UserState.Waitlisted
        return (
          <OnboardingChecklist
            rawMeasurements={rawMeasurements}
            navigation={navigation}
            onboardingSteps={onboardingSteps}
            shippingAddress={shippingAddress}
            stylePreferences={stylePreferences}
            userState={userState}
          />
        )
      case CustomerStatus.Authorized:
        return (
          <Box pb={1}>
            <Flex alignItems="center" pb={3}>
              {/* <Image style={{ width: 136, height: 80 }} source={require("Assets/images/Sunset.png")} /> */}
            </Flex>
            <Sans size="5" color="black100" textAlign="center">
              You're in. Let's choose your plan
            </Sans>
            <Spacer mb={1} />
            <Sans size="4" color="black50" textAlign="center">
              You have 48 hours to choose your plan. If we don’t hear from you, your invite will go to the next person
              in line.
            </Sans>
            <Spacer mb={3} />
            <Button
              block
              variant="primaryWhite"
              onClick={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.ChoosePlanTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                openDrawer("choosePlan", { source: "Create" })
              }}
            >
              Choose plan
            </Button>
          </Box>
        )
      case CustomerStatus.Invited:
      case CustomerStatus.Active:
      case CustomerStatus.Suspended:
      case CustomerStatus.Paused:
      case CustomerStatus.Deactivated:
        return <AccountList list={topList} roles={roles} />
    }
  }

  return (
    <Container insetsBottom={false}>
      <ScrollView>
        <Box px={2} py={4}>
          {!!firstName && !!lastName ? (
            <Sans size="5" color="black100">
              {`${firstName} ${lastName}`}
            </Sans>
          ) : (
            <Box mt="3px">
              <Skeleton width={180} height={20} />
            </Box>
          )}
          {!!email ? (
            <Sans size="4" color="black50">
              {email}
            </Sans>
          ) : (
            <Box mt="13px">
              <Skeleton width={160} height={16} />
            </Box>
          )}
        </Box>
        <InsetSeparator />
        <Box px={2} py={4}>
          {!!data ? renderBody() : <ListSkeleton />}
        </Box>
        <InsetSeparator />
        <Spacer mb={4} />
        <Box px={2}>
          <AccountList list={bottomList} roles={roles} />
        </Box>
        <Spacer mb={10} />
      </ScrollView>
    </Container>
  )
})

const InsetSeparator = () => (
  <Box mx={2}>
    <Separator />
  </Box>
)
