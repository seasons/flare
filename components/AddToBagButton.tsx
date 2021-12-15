import { Button } from "components/Button"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { MAXIMUM_ITEM_COUNT } from "mobile/Bag/Bag"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, ADD_TO_BAG, GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT, UPSERT_RESTOCK_NOTIF } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import { Schema, useTracking } from "utils/analytics"
import { useMutation } from "@apollo/client"
import { ButtonSize } from "./Button/Button.shared"
import { useDrawerContext } from "./Drawer/DrawerContext"
import { CheckWithBackground } from "./SVGs"
import { ListCheck } from "./SVGs/ListCheck"

interface Props {
  disabled?: boolean
  variantInStock: boolean
  selectedVariant: any
  isInBag: boolean
  data: any
  size?: ButtonSize
  onAdded?: (added: boolean) => void
}

export const AddToBagButton: React.FC<Props> = ({
  disabled,
  isInBag,
  variantInStock,
  selectedVariant,
  data,
  onAdded,
  size,
}) => {
  const [isMutating, setIsMutating] = useState(false)
  const [added, setAdded] = useState(false)
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { authState, toggleLoginModal } = useAuthContext()
  const { openDrawer } = useDrawerContext()
  const isUserSignedIn = authState?.isSignedIn
  const hasRestockNotification = selectedVariant?.hasRestockNotification
  const product = data?.product

  useEffect(() => {
    if (typeof isInBag === "boolean") {
      setAdded(isInBag)
    }
  }, [isInBag])

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: selectedVariant.id,
      shouldNotify: !hasRestockNotification,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: { slug: product?.slug },
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (e) => {
      console.log("error", e)
      setIsMutating(false)
    },
  })

  const [addToBag] = useMutation(isUserSignedIn ? ADD_TO_BAG : ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      id: selectedVariant.id,
      productID: product?.id,
      variantID: selectedVariant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: GET_PRODUCT,
        variables: { slug: product?.slug },
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

  const _disabled = disabled || added || isMutating
  const isInCart = selectedVariant?.isInCart

  let text = "Rent"
  if (added && !isInCart) {
    text = "Added to bag"
  } else if (hasRestockNotification) {
    text = "We'll notify you when it's back"
  } else if (!variantInStock) {
    text = "Notify me when available"
  }

  return (
    <Button
      loading={isMutating}
      disabled={_disabled}
      size={size}
      variant="primaryBlack"
      block
      onClick={() => {
        tracking.trackEvent({
          actionName: Schema.ActionNames.ProductAddedToBag,
          actionType: Schema.ActionTypes.Tap,
        })
        if (authState.isSignedIn) {
          if (variantInStock) {
            handleReserve()
          } else {
            upsertRestockNotification()
          }
        } else {
          toggleLoginModal(true)
        }
      }}
      borderRadius={8}
    >
      {hasRestockNotification && (
        <>
          <ListCheck color={color("white100")} />{" "}
        </>
      )}
      {text}
    </Button>
  )
}
