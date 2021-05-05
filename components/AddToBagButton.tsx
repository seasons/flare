import { Button } from "components/Button"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import { Schema, useTracking } from "utils/analytics"
import { GET_BAG, ADD_TO_BAG, GET_LOCAL_BAG_ITEMS, ADD_OR_REMOVE_FROM_LOCAL_BAG } from "queries/bagQueries"
import { useMutation, useQuery } from "@apollo/client"

import { useDrawerContext } from "./Drawer/DrawerContext"
import { CheckWithBackground } from "./SVGs"

interface Props {
  disabled?: boolean
  variantInStock: boolean
  selectedVariant: any
  isInBag: boolean
  data: any
  onAdded?: (added: boolean) => void
}

const DEFAULT_ITEM_COUNT = 3

export const AddToBagButton: React.FC<Props> = (props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const { variantInStock, selectedVariant, data, onAdded } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { authState, toggleLoginModal } = useAuthContext()
  const { openDrawer } = useDrawerContext()
  const isUserSignedIn = authState?.isSignedIn

  useEffect(() => {
    if (typeof props?.isInBag === "boolean") {
      setAdded(props.isInBag)
    }
  }, [props])

  const { data: localItems } = useQuery(GET_LOCAL_BAG_ITEMS)
  const [addToBag] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      id: selectedVariant.id,
      productID: props.data?.product?.id,
      variantID: selectedVariant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { slug: props.data?.product?.slug },
      },
    ],
    onCompleted: (res) => {
      setIsMutating(false)
      setAdded(true)
      onAdded?.(true)
      const itemCount = data?.me?.customer?.membership?.plan?.itemCount || DEFAULT_ITEM_COUNT
      const bagItemCount = authState?.isSignedIn ? data?.me?.bag?.length : res.addOrRemoveFromLocalBag.length
      if (itemCount && bagItemCount && bagItemCount >= itemCount) {
        showPopUp({
          icon: <CheckWithBackground />,
          title: "Added to bag",
          note: "Your bag is full. Place your reservation.",
          buttonText: "Got It",
          secondaryButtonText: "Go to bag",
          secondaryButtonOnPress: () => {
            openDrawer("bag")
            hidePopUp()
          },
          onClose: () => hidePopUp(),
        })
        openDrawer("bag")
      }
    },
    onError: (err) => {
      setIsMutating(false)
      console.log("AddToBagButton: Error", err)
      if (err && err.graphQLErrors) {
        showPopUp({
          title: "Your bag is full",
          note: "Remove one or more items from your bag to continue adding this item.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
    },
  })

  const handleReserve = () => {
    if (!isMutating) {
      setIsMutating(true)
      addToBag()
    }
  }

  const isInBag = isUserSignedIn
    ? added
    : !!localItems?.localBagItems?.find((item) => item.variantID === selectedVariant.id) || false
  const disabled = !!props.disabled || isInBag || !variantInStock || isMutating

  let text = "Add to bag"
  if (isInBag) {
    text = "Added"
  }

  return (
    <Button
      loading={isMutating}
      disabled={disabled}
      variant="primaryBlack"
      block
      onClick={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        if (authState.isSignedIn) {
          handleReserve()
        } else {
          toggleLoginModal(true)
        }
      }}
    >
      {text}
    </Button>
  )
}
