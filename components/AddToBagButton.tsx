import { Button } from "components/Button"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { MAXIMUM_ITEM_COUNT } from "mobile/Bag/Bag"
import { useBag } from "mobile/Bag/useBag"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, ADD_TO_BAG, GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { ButtonSize } from "./Button/Button.shared"
import { useDrawerContext } from "./Drawer/DrawerContext"
import { CheckWithBackground } from "./SVGs"

interface Props {
  disabled?: boolean
  variantInStock: boolean
  selectedVariant: any
  isInBag: boolean
  data: any
  size?: ButtonSize
  onAdded?: (added: boolean) => void
}

export const AddToBagButton: React.FC<Props> = (props) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const { variantInStock, selectedVariant, onAdded, size } = props
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { authState, toggleLoginModal } = useAuthContext()
  const { data } = useBag()
  const { openDrawer } = useDrawerContext()
  const isUserSignedIn = authState?.isSignedIn

  useEffect(() => {
    if (typeof props?.isInBag === "boolean") {
      setAdded(props.isInBag)
    }
  }, [props])
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
      const itemCount = data?.me?.customer?.membership?.plan?.itemCount || MAXIMUM_ITEM_COUNT
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

  const disabled = !!props.disabled || added || !variantInStock || isMutating

  let text = "Add to bag"
  if (added) {
    text = "Added"
  }

  return (
    <Button
      loading={isMutating}
      disabled={disabled}
      size={size}
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
      borderRadius={8}
    >
      {text}
    </Button>
  )
}
