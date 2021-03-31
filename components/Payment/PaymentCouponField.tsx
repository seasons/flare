import gql from "graphql-tag"
import React, { useState } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"
import { Schema as TrackSchema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"
import { Input } from "@material-ui/core"
import { Box, Sans, Spacer } from "components"

const CHECK_COUPON = gql`
  mutation CheckCoupon($couponID: String!) {
    checkCoupon(couponID: $couponID) {
      id
      amount
      percentage
      type
    }
  }
`
interface PaymentCouponFieldProps {
  onApplyPromoCode: (amount, percentage, type, code) => void
}

export const PaymentCouponField: React.FC<PaymentCouponFieldProps> = ({ onApplyPromoCode }) => {
  const tracking = useTracking()

  const [promoCode, setPromoCode] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [error, setError] = useState(null)
  const [isMutating, setIsMutating] = useState(false)

  const [checkCoupon] = useMutation(CHECK_COUPON, {
    onCompleted: (data) => {
      const { id, amount, percentage, type } = data?.checkCoupon
      setIsMutating(false)
      onApplyPromoCode(amount, percentage, type, id)
    },
    onError: (err) => {
      setError("Sorry! We couldn't find that promo code")
      console.log("Error ApplyPromoCodePane.tsx", err)
      setIsMutating(false)
    },
  })

  const onPromoCodeChange = (val: string) => {
    setError(null)
    setPromoCode(val)
    setIsFormValid(val.length > 0)
  }

  const applyPromoCode = async () => {
    setError(null)
    if (isMutating) {
      return
    }
    tracking.trackEvent({
      actionName: TrackSchema.ActionNames.ApplyPromoCodeTapped,
      actionType: TrackSchema.ActionTypes.Tap,
    })
    checkCoupon({
      variables: {
        couponID: promoCode,
      },
    })

    setIsMutating(true)
  }

  return (
    <>
      <Container>
        <Input
          value={promoCode}
          placeholder={"Enter promo code"}
          onChange={(e) => {
            onPromoCodeChange(e.target.value)
          }}
          disableUnderline
          style={{ flex: 1 }}
        />

        <TouchableOpacity onPress={applyPromoCode}>
          <Sans size={5} style={{ textDecoration: "underline", cursor: "pointer" }}>
            Apply
          </Sans>
        </TouchableOpacity>
      </Container>
      {error && (
        <>
          <Spacer mt={2} />
          <ErrorResult size="3">{error}</ErrorResult>
        </>
      )}
    </>
  )
}

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 20px;
  font-family: ProximaNova-Medium, sans-serif;
  border: 1px solid #d9d9d9;
  transition: all 0.25s;
`

const ErrorResult = styled((props) => <Sans {...props} />)`
  color: red;
`
