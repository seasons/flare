import React, { useState } from "react"
import { useMutation, ApolloError, gql, useQuery } from "@apollo/client"
import { FixedButton, LineItem, OrderFragment_Customer, OrderItem } from "@seasons/eclipse"
import { GET_BAG } from "queries/bagQueries"
import { SUBMIT_ORDER } from "queries/orderQueries"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { getDrawerWidth } from "components/Drawer/Drawer"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { ScrollView } from "react-native"
import { useRouter } from "next/router"
import { Schema, useTracking } from "utils/analytics"
import { Container, FixedBackArrow, Flex, Box, Spacer, Sans, Separator } from "components"
import { SectionHeader } from "mobile/Reservation/Components/SectionHeader"
import { space } from "helpers"
import { Loader } from "mobile/Loader"

type Props = {
  order: any
  email?: string
  shippingAddress?: any
}

export const ReviewOrder_Query = gql`
  query ReviewOrder_Query {
    me {
      id
      customer {
        id
        status
        ...OrderFragment_Customer
      }
    }
  }
  ${OrderFragment_Customer}
`

export const ReviewOrder: React.FC<Props> = ({ order, email, shippingAddress }) => {
  const { closeDrawer, openDrawer } = useDrawerContext()
  const { previousData, data = previousData } = useQuery(ReviewOrder_Query)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [isMutating, setIsMutating] = useState(false)
  const router = useRouter()
  const tracking = useTracking()
  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
    awaitRefetchQueries: true,
  })

  const customer = data?.me?.customer
  const isGuestCheckout = !customer || customer.status !== "Active"

  const handleOrderItemPressed = (product) => {
    router.push(`/product/${product.slug}`)
  }

  const onSubmitOrder = async () => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.PlaceOrderTapped,
      actionType: Schema.ActionTypes.Tap,
    })

    if (customer?.status === "Active") {
      const result = await submitOrder({
        variables: {
          input: {
            orderID: order.id,
          },
        },
      })

      if (result.errors) {
        handleError((result.errors as any) as readonly ApolloError[])
      } else {
        openDrawer("orderConfirmation", { order, customer })
      }
    } else {
      openDrawer("guestPayment", { order, email, shippingAddress })
    }
  }

  const handleError = (error) => {
    console.error(error)
    showPopUp({
      title: "Oops! Try again!",
      note: "There was an issue purchasing this item. Please retry or contact us.",
      buttonText: "Close",
      onClose: () => {
        hidePopUp()
      },
    })
  }

  const onBackPressed = () => {
    if (isGuestCheckout) {
      openDrawer("guestShipping")
    } else {
      openDrawer("bag")
    }
  }

  const windowWidth = getDrawerWidth()

  const displayCurrency = (value: number): string =>
    (value || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  const phoneNumber = customer?.detail?.phoneNumber
  const address = customer?.detail?.shippingAddress || shippingAddress
  const paymentMethod = customer?.billingInfo?.last_digits
  const paymentBrand = customer?.billingInfo?.brand
  const totalInDollars = order?.total / 100
  const subTotalDollars = order?.subTotal / 100
  const totalSalesTaxDollars = order?.salesTaxTotal / 100
  const productVariantItems = order?.lineItems?.filter((i) => !!i.productVariant)
  const needsShipping = order?.lineItems?.some((item) => item.needShipping)

  if (!data) {
    return (
      <>
        <FixedBackArrow onPress={onBackPressed} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  return (
    <Container insetsTop insetsBottom={false} backgroundColor="white100">
      <FixedBackArrow onPress={onBackPressed} variant="whiteBackground" />
      <Flex style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Box px={2}>
            <Spacer mb={100} />
            <Box pb={1}>
              <Sans size="7" color="black100">
                Review your order
              </Sans>
            </Box>
            <Spacer mb={4} />
            {!!order && (
              <Box mb={4}>
                <SectionHeader title="Purchase summary" />
                {order?.lineItems?.map((item, index) => {
                  const itemPriceInDollars = item?.price / 100
                  let displayName
                  if (item.recordType === "Package") {
                    displayName = "Shipping"
                  } else if (item.recordType === "Credit" || item.recordType === "PurchaseCredit") {
                    return null
                  } else {
                    displayName = item?.productVariant?.product?.name
                  }

                  return (
                    <LineItem
                      leftText={displayName}
                      rightText={displayCurrency(itemPriceInDollars)}
                      key={item?.productVariant?.id ?? index}
                      windowWidth={windowWidth}
                    />
                  )
                })}
                <Spacer mb={2} />
                <LineItem leftText="Subtotal" windowWidth={windowWidth} rightText={displayCurrency(subTotalDollars)} />
                <LineItem
                  leftText="Sales tax"
                  windowWidth={windowWidth}
                  rightText={displayCurrency(totalSalesTaxDollars)}
                />
                {order?.lineItems?.map((item, index) => {
                  if (item.recordType === "Credit") {
                    const itemPriceInDollars = item?.price / 100
                    return (
                      <LineItem
                        leftText="Credits"
                        rightText={displayCurrency(itemPriceInDollars)}
                        key={item?.productVariant?.id ?? index}
                        windowWidth={windowWidth}
                      />
                    )
                  } else if (item.recordType === "PurchaseCredit") {
                    const itemPriceInDollars = item?.price / 100
                    return (
                      <LineItem
                        leftText="Membership discount"
                        rightText={displayCurrency(itemPriceInDollars)}
                        key={item?.productVariant?.id ?? index}
                        windowWidth={windowWidth}
                      />
                    )
                  } else {
                    return null
                  }
                })}
                <LineItem
                  leftText="Total"
                  windowWidth={windowWidth}
                  rightText={displayCurrency(totalInDollars)}
                  color="black100"
                />
              </Box>
            )}
            {!!paymentMethod && (
              <Box mb={4}>
                <SectionHeader title="Payment method" />
                <Sans size="4" color="black50" mt={1}>
                  {`${paymentBrand} ending in ${paymentMethod}`}
                </Sans>
              </Box>
            )}
            {!!address && needsShipping && (
              <Box mb={4}>
                <SectionHeader title="Shipping address" />
                <Sans size="4" color="black50" mt={1}>
                  {`${address.address1}${address.address2 ? " " + address.address2 : ""},`}
                </Sans>
                <Sans size="4" color="black50">
                  {`${address.city}, ${address.state} ${address.zipCode}`}
                </Sans>
              </Box>
            )}
            {!!phoneNumber && (
              <Box mb={4}>
                <SectionHeader title="Phone number" />
                <Sans size="4" color="black50" mt={1}>
                  {phoneNumber}
                </Sans>
              </Box>
            )}
            <Box mb={5}>
              <SectionHeader title={productVariantItems?.length === 1 ? "Item" : "Items"} />
              <Box mt={2} mb={4} pb={6}>
                {productVariantItems?.map((item, i) => {
                  return (
                    <Box key={i}>
                      <OrderItem
                        productVariant={item.productVariant}
                        onPress={() => handleOrderItemPressed(item.productVariant.product)}
                      />
                      <Spacer mb={1} />
                      {i !== productVariantItems.length - 1 && <Separator />}
                      <Spacer mb={1} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </Flex>
      <FixedButton
        positionBottom={space(2)}
        // @ts-ignore
        loading={isMutating}
        disabled={isMutating}
        onPress={() => onSubmitOrder()}
        block
      >
        {isGuestCheckout ? "Next" : "Place order"}
      </FixedButton>
    </Container>
  )
}
