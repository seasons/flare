import { Flex } from "components"
import { ButtonVariant } from "components/Button/Button.shared"
import Link from "next/link"
import React from "react"
import { Schema, useTracking } from "utils/analytics"
import { Button } from "../Button"

export const MembershipCTA: React.FC<{
  variant?: ButtonVariant
  block?: boolean
  userSession: any
  authState: any
}> = ({ variant = "primaryWhiteNoBorder", block = true }) => {
  const tracking = useTracking()

  let ctaData = { text: "Browse the collection", link: "/browse", actionName: "BrowseTheCollectionTapped" }

  return (
    <Flex flexDirection="row">
      <Link href={ctaData.link}>
        <Button
          size="large"
          block={block}
          variant={variant}
          onClick={() => {
            tracking.trackEvent({
              actionName: Schema.ActionNames[ctaData.actionName],
              actionType: Schema.ActionTypes.Tap,
            })
          }}
        >
          {ctaData.text}
        </Button>
      </Link>
    </Flex>
  )
}
