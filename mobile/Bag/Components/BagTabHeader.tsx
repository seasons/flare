import { ReservationPhase } from "__generated__/globalTypes"
import { Box } from "components/Box"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { Flex } from "components/Flex"
import { Spacer } from "components/Spacer"
import { Spinner } from "components/Spinner"
import { Sans } from "components/Typography"
import gql from "graphql-tag"
import { DateTime } from "luxon"
import { GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"

import { useMutation } from "@apollo/client"

import { DeliveryStatus } from "./DeliveryStatus"

export const BagTabHeaderFragment_Query = gql`
  fragment BagTabHeaderFragment_Query on Query {
    me {
      id
      nextFreeSwapDate
      activeReservation {
        id
        createdAt
        returnAt
      }
      customer {
        id
        membership {
          id
          plan {
            id
            tier
          }
        }
      }
    }
  }
`

const getHeaderText = (status: string, phase: ReservationPhase, atHome: boolean) => {
  if (atHome) {
    return "At home"
  }
  switch (status) {
    case "Queued":
      return "We've got your order"
    case "Picked":
      return "Order being prepared"
    case "Packed":
      return "Your order ready to ship"
    case "Shipped":
      if (phase === "CustomerToBusiness") {
        return "Your return is on the way"
      } else {
        return "Your order is on the way"
      }
    case "Delivered":
      return "Your order was delivered"
    case "Hold":
      return "Your order is on hold"
    default:
      return "Your bag"
  }
}

const getSubHeaderText = (me, activeReservation, atHome) => {
  const nextSwapDate = me.nextFreeSwapDate
  const nextSwapDateLuxon = DateTime.fromISO(nextSwapDate)
  const swapAvailable = nextSwapDate < DateTime.local().toISO()

  let swapText
  if (swapAvailable) {
    swapText = "You have a swap available"
  } else {
    swapText = `You get a free swap ${nextSwapDateLuxon.weekdayLong}, ${nextSwapDateLuxon.monthLong} ${nextSwapDateLuxon.day}`
  }

  let subHeaderText
  if (atHome) {
    subHeaderText = swapText
  } else if (!activeReservation) {
    subHeaderText = "Reserve your order below"
  }
  return subHeaderText
}

const CANCEL_RETURN = gql`
  mutation CancelReturn {
    cancelReturn {
      id
    }
  }
`

export const BagTabHeader: React.FC<{
  me
  atHome: boolean
}> = ({ me, atHome }) => {
  const { openDrawer } = useDrawerContext()
  const [cancelingReturn, setCancelingReturn] = useState(false)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setCancelingReturn(false)
    },
    onError: (e) => {
      setCancelingReturn(false)
    },
  })

  const activeReservation = me?.activeReservation
  const status = activeReservation?.status
  const subHeaderText = getSubHeaderText(me, activeReservation, atHome)
  const markedAsReturned = !!activeReservation?.returnedAt

  const showDeliveryStatus = !!activeReservation && !atHome && !markedAsReturned
  const showSubHeaderText = !markedAsReturned && !showDeliveryStatus && !!subHeaderText

  return (
    <Box pt={4}>
      <Flex flexDirection="row" justifyContent="space-between" flexWrap="nowrap" px={2}>
        <Sans size="5">{getHeaderText(status, activeReservation?.phase, atHome)}</Sans>
        <Sans
          size="5"
          style={{ textDecorationLine: "underline" }}
          onPress={() => {
            openDrawer("faq")
          }}
        >
          FAQ
        </Sans>
      </Flex>
      {showDeliveryStatus && (
        <Box px={1.5}>
          <DeliveryStatus me={me} atHome={atHome} />
        </Box>
      )}
      {showSubHeaderText && (
        <Box px={2}>
          <Sans size="4" color="black50">
            {subHeaderText}
          </Sans>
        </Box>
      )}
      {markedAsReturned && (
        <Box px={2}>
          <Sans size="4" color="black50">
            Your bag will update after UPS scans the return label. Second thoughts?{" "}
            {cancelingReturn ? (
              <Flex flexDirection="row" width={130} height={20} justifyContent="center" alignItems="center">
                <Spinner size="small" />
              </Flex>
            ) : (
              <Sans
                size="4"
                onPress={() => {
                  setCancelingReturn(true)
                  cancelReturn({
                    awaitRefetchQueries: true,
                    refetchQueries: [{ query: GET_BAG }],
                  })
                }}
                color="black50"
                style={{ textDecorationLine: "underline" }}
              >
                Cancel your return
              </Sans>
            )}
          </Sans>
        </Box>
      )}
      <Spacer mb={3} />
    </Box>
  )
}
