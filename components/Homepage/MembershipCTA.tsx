import { Flex } from "components"
import { ButtonVariant } from "components/Button/Button.shared"
import Link from "next/link"
import React from "react"
import { Schema, useTracking } from "utils/analytics"
import { useDrawerContext } from "../../components/Drawer/DrawerContext"
import { Button } from "../Button"

export const MembershipCTA: React.FC<{ variant?: ButtonVariant; userSession: any; authState: any }> = ({
  userSession,
  authState,
  variant = "primaryWhiteNoBorder",
}) => {
  const tracking = useTracking()
  const isUserSignedIn = authState?.isSignedIn

  const { openDrawer } = useDrawerContext()

  const browseData = { text: "Browse the collection", link: "/browse", actionName: "BrowseTheCollectionTapped" }
  const applyData = { text: "Apply for membership", link: "/signup", actionName: "ApplyForMembershipTapped" }

  let ctaData = browseData as any
  if (isUserSignedIn) {
    switch (userSession?.customer?.status) {
      case "Created":
        ctaData = { text: "Finish your application", link: "/signup", actionName: "FinishYourApplicationTapped" }
        break
      case "Waitlisted":
      case "Deactivated":
        ctaData = { text: "Request Access", link: "https://szns.co/requestAccess", actionName: "RequestAccessTapped" }
        break
      case "Authorized":
      case "Invited":
        ctaData = { text: "Choose your plan", link: "/signup", actionName: "ChoosePlanTapped" }
        break
      case "Paused":
        ctaData = {
          text: "Resume Membership",
          link: "/",
          actionName: "ResumeMembershipTapped",
          onClick: () => openDrawer("membershipInfo"),
        }
        break
    }
  } else {
    ctaData = applyData
  }

  return (
    <Flex flexDirection="row" justifyContent="flex-end">
      <Link href={ctaData.link}>
        <Button
          size="large"
          block
          variant={variant}
          onClick={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames[ctaData.actionName],
              actionType: Schema.ActionTypes.Tap,
            })
            ctaData.onClick?.()
          }}
        >
          {ctaData.text}
        </Button>
      </Link>
    </Flex>
  )
}
