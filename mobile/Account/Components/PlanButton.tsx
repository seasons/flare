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
      <PriceFlexBox>
        <Sans color="black50" size="3">
          This month
        </Sans>
        <Box width="5px"></Box>
        <Sans color="black50" size="3" style={{ textDecorationLine: "line-through", textDecorationStyle: "solid" }}>
          ${originalPrice}
        </Sans>
        <Box width="5px"></Box>
        <Sans color="black100" size="3">
          ${finalPrice}
        </Sans>
      </PriceFlexBox>
    ) : (
      <PriceFlexBox>
        <Sans color="black50" size="3" mr="3">
          Per month
        </Sans>
        <Box width="5px"></Box>
        <Sans color="black100" size="3">
          {"   "}${originalPrice}
        </Sans>
      </PriceFlexBox>
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

  console.log({ selected, plan, selectedColor })
  return (
    <TouchableOpacity onPress={() => onPress(plan)}>
      <PlanSelectionBorder width="100%" p={0.5} selected={selected} selectedColor={selectedColor}>
        <StyledFlex width="100%" height={48} px={2}>
          <Sans color="black100" size="4">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </Sans>
          <PriceText originalPrice={price} finalPrice={finalPrice} />
        </StyledFlex>
      </PlanSelectionBorder>
    </TouchableOpacity>
  )
}

const PriceFlexBox = styled(Box)`
  display: flex;
`
const StyledFlex = styled(Box)`
  border-radius: 4px;
  background-color: ${color("black04")};
  z-index: 10;
  elevation: 6;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const PlanSelectionBorder = styled(Box)<{ selected: boolean; selectedColor: string }>`
  border-radius: 4px;
  border-color: ${(p) => (p.selected ? p.selectedColor : color("white100"))};
  border-width: 1px;
  border-style: solid;
  background: ${color("white100")};
  z-index: 0;
  display: flex;
`
