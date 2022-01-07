import { gql, useMutation } from "@apollo/client"
import { Button } from "components"
import { useAuthContext } from "lib/auth/AuthContext"
import { DELETE_BAG_ITEM, GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useEffect, useState } from "react"
import { Schema, useTracking } from "utils/analytics"
import { removeLocalCartItem } from "utils/localCart"

export const BagItemRemoveButtonFragment_BagItem = gql`
  fragment BagItemRemoveButtonFragment_BagItem on BagItem {
    id
    productVariant {
      id
      product {
        id
        slug
      }
    }
  }
`

export const BagItemRemoveButton = ({ bagItem }) => {
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM, { awaitRefetchQueries: true })
  const { authState } = useAuthContext()
  const isUserSignedIn = authState?.isSignedIn

  useEffect(() => {
    return setIsMutating(false)
  }, [])

  const variant = bagItem?.productVariant
  const product = variant?.product

  if (!product) {
    return null
  }

  return (
    <Button
      size="small"
      variant="secondaryWhite"
      loading={isMutating}
      disabled={isMutating}
      onClick={() => {
        setIsMutating(true)
        tracking.trackEvent({
          actionName: Schema.ActionNames.BagItemRemoved,
          actionType: Schema.ActionTypes.Tap,
          productSlug: product.slug,
          productId: product.id,
          variantId: variant.id,
        })
        if (isUserSignedIn) {
          deleteBagItem({
            variables: {
              itemID: bagItem?.id,
            },
            refetchQueries: [
              {
                query: GET_BAG,
              },
              {
                query: GET_PRODUCT,
                variables: {
                  slug: product?.slug,
                },
              },
            ],
          })
        } else {
          removeLocalCartItem(variant.id)
        }
      }}
    >
      Remove
    </Button>
  )
}
