import { Container, FixedBackArrow } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import React from "react"
import { screenTrack } from "utils/analytics"
import { Elements } from "@stripe/react-stripe-js"
import { gql, useQuery } from "@apollo/client"
import { loadStripe } from "@stripe/stripe-js"
import { EditPaymentForm, EditPaymentFormFragment_Query } from "./EditPaymentForm"

const stripePromise = loadStripe(process.env.STRIPE_API_KEY)

export const EditPaymentMethod_Query = gql`
  query EditPaymentMethod_Query {
    ...EditPaymentFormFragment_Query
  }
  ${EditPaymentFormFragment_Query}
`

export const EditPaymentMethod: React.FC = screenTrack()(() => {
  const { openDrawer } = useDrawerContext()
  const goBack = () => {
    openDrawer("paymentAndShipping")
  }
  const { previousData, data = previousData } = useQuery(EditPaymentMethod_Query, {
    fetchPolicy: "network-only",
  })

  return (
    <Elements stripe={stripePromise}>
      <Container insetsBottom={false}>
        <FixedBackArrow variant="whiteBackground" onPress={goBack} />
        <EditPaymentForm data={data} />
      </Container>
    </Elements>
  )
})
