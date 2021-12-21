import { Box, Button, Flex, Sans } from "components"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { BagItemRemoveButton, BagItemRemoveButtonFragment_BagItem } from "./BagItemRemoveButton"
import { Schema, useTracking } from "utils/analytics"
import { GET_BAG } from "queries/bagQueries"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useAuthContext } from "lib/auth/AuthContext"
import { GET_PRODUCT, UPSERT_CART_ITEM } from "queries/productQueries"
import { GET_BROWSE_PRODUCTS } from "queries/brandQueries"
import { SAVE_ITEM } from "@seasons/eclipse/src/components/SaveProductButton/queries"
import { SavedTab_Query } from "mobile/Account/SavedAndHistory/queries"

const CANCEL_RETURN = gql`
  mutation CancelReturn($bagItemId: ID!) {
    cancelReturn(bagItemId: $bagItemId) {
      id
    }
  }
`

export const BagItemCTAsFragment_BagItem = gql`
  fragment BagItemCTAsFragment_BagItem on BagItem {
    id
    productVariant {
      id
      purchased
      isInCart
      price {
        id
        buyNewEnabled
        buyUsedEnabled
        buyUsedPrice
        buyNewPrice
      }
      product {
        id
        slug
      }
    }
    ...BagItemRemoveButtonFragment_BagItem
  }
  ${BagItemRemoveButtonFragment_BagItem}
`

export const BagItemCTAs = ({ bagItem, sectionStatus, size }) => {
  const isLarge = size === "large"
  const { openDrawer } = useDrawerContext()

  const [isMutating, setIsMutating] = useState(false)
  const { authState } = useAuthContext()
  const tracking = useTracking()
  const [saveItem] = useMutation(SAVE_ITEM)
  const [cancelReturn] = useMutation(CANCEL_RETURN, {
    onCompleted: () => {
      setIsMutating(false)
    },
    onError: (e) => {
      setIsMutating(false)
    },
  })

  const userHasSession = !!authState?.userSession
  const variant = bagItem?.productVariant
  const product = variant?.product
  const isInCart = variant?.isInCart

  const [upsertCartItem] = useMutation(UPSERT_CART_ITEM, {
    variables: {
      productVariantId: variant?.id,
      addToCart: !isInCart,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: { slug: product?.slug },
      },
      {
        query: GET_BAG,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      openDrawer("bag", { initialTab: 1 })
    },
    onError: (error) => {
      console.log("error upsertRestockNotification Product.tsx", error)
      setIsMutating(false)
    },
  })

  const onSaveForLater = () => {
    if (!isMutating) {
      setIsMutating(true)
      tracking.trackEvent({
        actionName: Schema.ActionNames.BagItemSaved,
        actionType: Schema.ActionTypes.Tap,
        productSlug: product.slug,
        productId: product.id,
        variantId: variant.id,
      })
      saveItem({
        variables: {
          item: bagItem.id,
          save: true,
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: SavedTab_Query },
          {
            query: GET_BAG,
          },
          {
            query: GET_PRODUCT,
            variables: {
              slug: product.slug,
            },
          },
          {
            query: GET_BROWSE_PRODUCTS,
            variables: {
              name: "all",
              categoryName: "all",
              first: 10,
              skip: 0,
              orderBy: "publishedAt_DESC",
              sizes: [],
            },
          },
        ],
      })
    }
  }

  const isBuyNewEnabled = bagItem?.productVariant?.price?.buyNewEnabled
  const isBuyUsedEnabled = bagItem?.productVariant?.price?.buyUsedEnabled
  const buyNewPrice = bagItem?.productVariant?.price?.buyNewPrice
  const buyUsedPrice = bagItem?.productVariant?.price?.buyUsedPrice
  const isBuyable = isBuyNewEnabled || isBuyUsedEnabled
  const purchased = bagItem?.productVariant?.purchased
  const price = isBuyNewEnabled ? buyNewPrice : buyUsedPrice

  const showBuyButton = isBuyable && !purchased && price && userHasSession

  const CTAs = () => {
    switch (sectionStatus) {
      case "Added":
      case "Cart":
        return (
          <Flex flexDirection="row" flexWrap="nowrap" justifyContent="space-between" alignItems="center" width="100%">
            <Box onClick={onSaveForLater}>
              <Sans size="3" style={{ textDecorationLine: "underline" }}>
                Save for later
              </Sans>
            </Box>
            <BagItemRemoveButton bagItem={bagItem} />
          </Flex>
        )
      case "ReturnPending":
        return (
          <Box
            onClick={async (e) => {
              e.stopPropagation()
              if (isMutating) {
                return
              }
              setIsMutating(true)
              await cancelReturn({
                variables: {
                  bagItemId: bagItem.id,
                },
                awaitRefetchQueries: true,
                refetchQueries: [{ query: GET_BAG }],
              })
            }}
          >
            <Sans size="3" style={{ textDecorationLine: "underline" }}>
              Cancel return
            </Sans>
          </Box>
        )
      default:
        if (showBuyButton) {
          return (
            <Flex
              flexDirection={isLarge ? "column" : "row"}
              flexWrap="nowrap"
              justifyContent="space-between"
              alignItems={isLarge ? "flex-start" : "center"}
              width="100%"
              height="100%"
            >
              <Sans size="3">${price / 100} to buy</Sans>
              <Button
                size="small"
                loading={isMutating}
                variant="secondaryWhite"
                onClick={(e) => {
                  e.stopPropagation()
                  if (isMutating) {
                    return
                  }
                  setIsMutating(true)
                  upsertCartItem()
                }}
              >
                Buy
              </Button>
            </Flex>
          )
        } else {
          return null
        }
    }
  }

  return (
    <Flex height={isLarge ? 80 : 35} width="100%">
      <CTAs />
    </Flex>
  )
}
