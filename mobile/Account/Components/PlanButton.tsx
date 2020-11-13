import { Box, Flex, Sans } from "components"
import { color } from "helpers/color"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styled from "styled-components"
import { calcFinalPrice, Coupon } from "utils/calcFinalPrice"
import { Schema as TrackSchema, useTracking } from "utils/analytics"

// TODO: This will change on web?
export enum PaymentMethod {
  ApplePay = "ApplePay",
  CreditCard = "CreditCard",
}

interface PlanButtonProps {
  shouldSelect: (plan: any) => void
  selected: boolean
  plan: any
  selectedColor?: string
  coupon?: Coupon
}

export const PlanButton: React.FC<PlanButtonProps> = ({ shouldSelect, selected, plan, selectedColor, coupon }) => {
  const tracking = useTracking()
  const { price, itemCount } = plan
  const finalPrice = calcFinalPrice(price, coupon)
  const PriceText = ({ originalPrice, finalPrice }) => {
    originalPrice /= 100
    finalPrice /= 100
    const isDiscounted = originalPrice !== finalPrice && !!finalPrice
    return isDiscounted ? (
      <Text>
        <Sans color="black50" size="3">
          This month
        </Sans>
        <Sans color="black100" size="3">
          {" "}
        </Sans>
        <Sans color="black50" size="3" style={{ textDecorationLine: "line-through", textDecorationStyle: "solid" }}>
          ${originalPrice}
        </Sans>
        <Sans color="black100" size="3">
          {" "}
          ${finalPrice}
        </Sans>
      </Text>
    ) : (
      <Text>
        <Sans color="black50" size="3">
          Per month
        </Sans>
        <Sans color="black100" size="3">
          {" "}
          ${originalPrice}
        </Sans>
      </Text>
    )
  }

  const onPress = (plan) => {
    shouldSelect(plan)
    // TODO: Fix tracking
    // tracking.trackEvent({
    //   actionName: TrackSchema.ActionNames.PlanTapped,
    //   actionType: TrackSchema.ActionTypes.Tap,
    //   planID: plan?.id,
    //   planName: plan?.name,
    // })
  }

  return (
    <TouchableOpacity onPress={() => onPress(plan)}>
      <PlanSelectionBorder width="100%" p={0.5} selected={selected} selectedColor={selectedColor}>
        <StyledFlex
          alignItems="center"
          flexDirection="row"
          width="100%"
          height={48}
          px={2}
          justifyContent="space-between"
        >
          <Sans color="black100" size="4">
            {itemCount} items
          </Sans>
          {/* <PriceText originalPrice={price} finalPrice={finalPrice} /> */}
        </StyledFlex>
      </PlanSelectionBorder>
    </TouchableOpacity>
  )
}

const StyledFlex = styled(Box)`
  border-radius: 40%;
  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
  display: flex;
`

const PlanSelectionBorder = styled(Box)<{ selected: boolean; selectedColor: string }>`
  border-radius: 40%;
  border-color: ${(p) => (p.selected ? p.selectedColor : color("white100"))};
  border-width: 1px;
  background: ${color("white100")};
  z-index: 0;
  display: flex;
`

// const PlanSelectionBorder = styled(Box)<{ selected: boolean; selectedColor: string }>`
//   border-radius: 28;
//   border-color: #000000;
//   border-width: 1px;
//   border-style: solid;
//   background: ${color("white100")};
//   z-index: 0;
//   display: flex;
// `
