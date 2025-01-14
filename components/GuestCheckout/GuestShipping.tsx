import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { PaymentShippingAddress } from "components/Payment/PaymentShippingAddress"
import { Formik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { PaymentField } from "components/Payment/PaymentBillingAddress"
import { useMutation } from "@apollo/client"
import { CREATE_DRAFT_ORDER, GET_BAG } from "queries/bagQueries"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useBag } from "mobile/Bag/useBag"
import { localCartVar } from "lib/apollo/cache"

export const GuestShipping = () => {
  const { openDrawer } = useDrawerContext()
  const [isMutating, setIsMutating] = useState(false)
  const [email, setEmail] = useState("")
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { localCartItems } = useBag()
  const [shippingAddress, setShippingAddress] = useState(null)

  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setIsMutating(false)
      if (res?.createDraftedOrder) {
        openDrawer("reviewOrder", { order: res.createDraftedOrder, email, shippingAddress })
      }
    },
    onError: (error) => {
      if (error.message.includes("Customer is not a guest")) {
        showPopUp({
          title: "Please sign in",
          note: "To use this email, sign into your account before placing the order.",
          buttonText: "Okay",
          onClose: () => {
            hidePopUp()
          },
        })
      } else if (error.message === "Please remove unreservable unit from local cart") {
        const idToRemove = error.graphQLErrors?.[0]?.extensions?.productVariantId
        const storedItems = JSON.parse(localStorage.getItem("localCartItems"))
        const newStoredItems = (storedItems as Array<string>).filter((item) => item !== idToRemove)
        localCartVar(newStoredItems)
        localStorage.setItem("localCartItems", `[${newStoredItems}]`)
        showPopUp({
          title: "Sorry!",
          note: "One or more items is no longer available. It has been removed from your cart.",
          buttonText: "Okay",
          onClose: () => {
            hidePopUp()
          },
        })
      } else {
        showPopUp({
          title: "Sorry!",
          note: "There was an issue creating the order, please try again.",
          buttonText: "Okay",
          onClose: () => {
            hidePopUp()
          },
        })
      }
      console.log("error createDraftOrder ", error)
      setIsMutating(false)
    },
  })

  const initialValues = {}

  const valuesToAddressDetails = (values): { shippingDetails: any } => {
    const shippingDetails = {
      address: {
        name: `${values.shippingFirstName} ${values.shippingLastName}`,
        street1: values.shippingAddress1,
        street2: values.shippingAddress2,
        city: values.shippingCity,
        state: values.shippingState,
        postalCode: values.shippingPostalCode,
      },
      email: values.email,
    }

    return { shippingDetails }
  }

  const handleSubmit = async (values) => {
    setEmail(values.email)
    if (!isMutating) {
      setIsMutating(true)
      const { shippingDetails } = valuesToAddressDetails(values)
      setShippingAddress({
        ...shippingDetails.address,
        address1: values.shippingAddress1,
        address2: values.shippingAddress2,
        zipCode: values.shippingPostalCode,
      })

      createDraftOrder({
        variables: {
          input: {
            productVariantIds: localCartItems.map((i) => i.id),
            orderType: "Used",
            guest: {
              email: shippingDetails.email,
              shippingAddress: shippingDetails.address,
            },
          },
        },
      })
    }
  }

  return (
    <Container>
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          openDrawer("bag")
        }}
      />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={shippingValidation}
        height="100%"
        validateOnMount={true}
      >
        {({ handleSubmit, isValid, values }) => (
          <form onSubmit={handleSubmit} style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <Flex flexDirection="column" justifyContent="space-between" flex={1} height="100%">
              <Box px={2} pt={100}>
                <Sans size="7">Contact</Sans>
                <Spacer mt={2} />
                <PaymentField id="email" name="Email address" placeholder="Your email" />
                <Spacer mt={4} />
                <Sans size="7">Shipping address</Sans>
                <Spacer mt={2} />
                <PaymentShippingAddress />
                <Spacer mt={4} />
              </Box>
              <Box p={2}>
                <Button size="medium" type="submit" disabled={isMutating || !isValid} loading={isMutating} block>
                  Next
                </Button>
              </Box>
            </Flex>
          </form>
        )}
      </Formik>
    </Container>
  )
}

const shippingValidation = Yup.object().shape({
  email: Yup.string().trim().required("Required").email("Invalid email"),
  shippingFirstName: Yup.string().trim().required("Required"),
  shippingLastName: Yup.string().trim().required("Required"),
  shippingAddress1: Yup.string().trim().required("Required"),
  shippingCity: Yup.string().trim().required("Required"),
  shippingState: Yup.string().trim().required("Required"),
  shippingPostalCode: Yup.string()
    .trim()
    .required("Required")
    .matches(/^[0-9]{5}$/, "Must be exactly 5 digits"),
})
