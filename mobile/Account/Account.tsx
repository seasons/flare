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
import { AppleSVG, InstagramSVG } from "components/SVGs"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { DateTime } from "luxon"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { ScrollView } from "react-native"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useQuery } from "@apollo/client"
import { WaitlistedCTA } from "@seasons/eclipse"

import { Container } from "../Container"
import { CreditBalance, CreditBalanceFragment_Customer } from "./Components/CreditBalance"
import { ReferAFriend } from "./Components/ReferAFriend"
import { AccountList, CustomerStatus, OnboardingChecklist } from "./Lists"
import { SaveAndHistoryIcon } from "components/Icons/SaveAndHistoryIcon"

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
    view(viewID: "Referral") {
      id
      title
      caption
    }
    me {
      customer {
        id
        status
        referralLink
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
        authorizedAt
        ...CreditBalanceFragment_Customer
      }
    }
  }
  ${CreditBalanceFragment_Customer}
`

export const Account = screenTrack()(({ navigation }) => {
  const tracking = useTracking()
  const router = useRouter()
  const { openDrawer, closeDrawer, isOpen, currentView } = useDrawerContext()

  const { signOut, updateUserSession } = useAuthContext()
  const { previousData, data = previousData, refetch } = useQuery(GET_USER, { fetchPolicy: "cache-and-network" })

  useEffect(() => {
    if (currentView === "profile" && isOpen) {
      refetch()
    }
  }, [isOpen, currentView])

  useEffect(() => {
    if (!!data) {
      updateUserSession({ cust: data?.me?.customer, user: data?.me?.customer?.user })
    }
  }, [data])

  const customer = data?.me?.customer
  const status = customer?.status

  const user = customer?.user
  const email = user?.email
  const firstName = user?.firstName
  const lastName = user?.lastName
  const roles = user?.roles
  const referralLink = customer?.referralLink

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
    {
      title: "Saved items & order history",
      icon: <SaveAndHistoryIcon />,
      onPress: () => openDrawer("SavedAndHistory"),
      tracking: Schema.ActionNames.PaymentAndShippingTapped,
    },
  ]

  const middleList = [
    {
      title: "Frequently asked questions",
      icon: <PaymentShippingIcon />,
      onPress: () => openDrawer("faq", { previousScreen: "profile" }),
      tracking: Schema.ActionNames.FAQTapped,
    },
    {
      title: "Follow us on Instagram",
      icon: <InstagramSVG opaque />,
      onPress: () => window.open("https://www.instagram.com/seasons.ny", "_blank"),
      tracking: Schema.ActionNames.InstagramFollowTapped,
    },
    {
      title: "Download the iOS app",
      icon: <AppleSVG width="20px" height="23px" opacity={0.3} />,
      tracking: Schema.ActionNames.GetTheIOSAppTapped,
      onPress: () => window.open("https://szns.co/app", "_blank"),
    },
  ]

  const bottomList = [
    {
      title: "Help and support",
      icon: <QuestionMark />,
      onPress: () => window.open(`mailto:membership@seasons.nyc?subject=Support`),
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
        if (status === CustomerStatus.Waitlisted) {
          return (
            <WaitlistedCTA
              authorizedAt={!!customer?.authorizedAt ? DateTime.fromISO(customer?.authorizedAt) : null}
              onPressLearnMore={() =>
                tracking.trackEvent({
                  actionName: Schema.ActionNames.LearnMoreTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
              }
              onPressRequestAccess={() =>
                tracking.trackEvent({
                  actionName: Schema.ActionNames.RequestAccessTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
              }
              version="web"
            />
          )
        }
        return <OnboardingChecklist userState={userState} />
      case CustomerStatus.Authorized:
        return (
          <Box pb={1}>
            <Sans size="4">You're in.</Sans>
            <Spacer mb={3} />
            <Button
              block
              onClick={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.ChoosePlanTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                router.push("/signup")
                closeDrawer()
              }}
            >
              Choose plan
            </Button>
            <Spacer mb={1} />
            <Button
              block
              variant="primaryWhite"
              onClick={() => {
                tracking.trackEvent({
                  actionName: Schema.ActionNames.LearnMoreTapped,
                  actionType: Schema.ActionTypes.Tap,
                })
                router.push("/signup")
                closeDrawer()
              }}
            >
              FAQ
            </Button>
          </Box>
        )
      case CustomerStatus.Invited:
      case CustomerStatus.Active:
      case CustomerStatus.Suspended:
      case CustomerStatus.Paused:
      case CustomerStatus.Deactivated:
      case CustomerStatus.PaymentFailed:
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
        <CreditBalance membership={customer?.membership} />
        <InsetSeparator />
        <Box px={2} py={4}>
          {!!data ? renderBody() : <ListSkeleton />}
        </Box>
        {referralLink && (
          <>
            <InsetSeparator />
            <ReferAFriend referralLink={referralLink} referralData={data?.view} />
          </>
        )}
        <InsetSeparator />
        <Spacer mb={4} />
        <Box px={2}>
          <AccountList list={middleList} roles={roles} />
        </Box>
        <Spacer mb={4} />
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
