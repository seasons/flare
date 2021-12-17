import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { Spinner } from "components/Spinner"
import gql from "graphql-tag"
import { color } from "helpers"
import { ADD_TO_BAG, DELETE_BAG_ITEM, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { Image } from "mobile/Image"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"
import { GET_PRODUCT, UPSERT_RESTOCK_NOTIF } from "queries/productQueries"
import { SavedTab_Query } from "../queries"
import { useRouter } from "next/router"
interface BagItemProps {
  navigation?: any
  bagItem: any
}

export const SavedItemFragment_BagItem = gql`
  fragment SavedItemFragment_BagItem on BagItem {
    id
    saved
    productVariant {
      id
      reservable
      displayLong
      hasRestockNotification
      product {
        id
        slug
        name
        brand {
          id
          name
        }
        images(size: Thumb) {
          id
          url
        }
      }
    }
  }
`

export const SavedItem: React.FC<BagItemProps> = ({ bagItem }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [upsertingRestockNotif, setIsUpsertingRestockNotif] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM, { awaitRefetchQueries: true })

  const tracking = useTracking()
  const router = useRouter()

  const variant = bagItem?.productVariant
  const product = variant?.product
  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variant?.displayLong?.toLowerCase()
  const reservable = variant?.reservable > 0
  const hasRestockNotification = variant?.hasRestockNotification

  const [upsertRestockNotification] = useMutation(UPSERT_RESTOCK_NOTIF, {
    variables: {
      variantID: variant.id,
      shouldNotify: !hasRestockNotification,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: SavedTab_Query,
      },
    ],
    onCompleted: () => {
      setIsUpsertingRestockNotif(false)
      setIsMutating(false)
    },
    onError: (e) => {
      console.log("error", e)
      setIsMutating(false)
      setIsUpsertingRestockNotif(false)
    },
  })

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: variant.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
      {
        query: SavedTab_Query,
      },
    ],
    onCompleted: () => {
      setIsMutating(false)
      setAddingToBag(false)
    },
    onError: (err) => {
      setIsMutating(false)
      setAddingToBag(false)
      if (err && err.graphQLErrors) {
        if (err.graphQLErrors?.[0]?.message?.includes("Bag is full")) {
          showPopUp({
            title: "Your bag is full",
            note: "Remove one or more items from your bag to continue adding this item.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        } else {
          console.log("err SavedItem.tsx", err)
          showPopUp({
            title: "Oops!",
            note: "There was a problem adding your item to your bag.",
            buttonText: "Got It",
            onClose: () => hidePopUp(),
          })
        }
      }
    },
  })

  return (
    <Box py={1} key={product.id}>
      <BagItemContainer>
        <Flex flexDirection="row" px={2}>
          <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
            <Box>
              <Sans size="3">{product.brand.name}</Sans>
              <Sans size="3" color={color("black50")}>
                {product.name}
              </Sans>
              <Sans size="3" color={color("black50")}>
                Size {variantSize}
              </Sans>
              <Spacer mb={3} />

              <Flex flexDirection="row" alignItems="center">
                {!!reservable && (
                  <Sans
                    size="3"
                    style={{ textDecorationLine: "underline", cursor: "pointer" }}
                    onClick={() => {
                      if (!addingToBag) {
                        setAddingToBag(true)
                        addToBag()
                        tracking.trackEvent({
                          actionName: Schema.ActionNames.SavedItemAddedToBag,
                          actionType: Schema.ActionTypes.Tap,
                          productSlug: product.slug,
                          productId: product.id,
                          variantId: variant.id,
                        })
                      }
                    }}
                  >
                    Add to bag
                  </Sans>
                )}
              </Flex>
            </Box>
            <Box>
              <Button
                onClick={() => {
                  setIsMutating(true)
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.BagItemRemoved,
                    actionType: Schema.ActionTypes.Tap,
                    productSlug: product.slug,
                    productId: product.id,
                    variantId: variant.id,
                  })
                  deleteBagItem({
                    variables: {
                      itemID: bagItem?.id,
                    },
                    refetchQueries: [
                      {
                        query: SavedTab_Query,
                      },
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
                }}
                variant="secondaryOutline"
                size="small"
                disabled={isMutating || addingToBag}
                loading={isMutating}
              >
                Remove
              </Button>
            </Box>
          </Flex>
          <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
            {!!imageURL && (
              <Image style={{ height: 170 * 1.3, width: 170 }} resizeMode="contain" source={{ uri: imageURL }} />
            )}
          </Flex>
        </Flex>
      </BagItemContainer>
      <Spacer mb={2} />
      <Separator color={color("black10")} />
      {addingToBag && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </Box>
  )
}

const Overlay = styled(Box)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`

const BagItemContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: 210px;
`

const ColoredDot = styled(Box)<{ reservable: boolean }>`
  height: 8;
  width: 8;
  background-color: ${(p) => (!!p.reservable ? color("green100") : color("black50"))};
  border-radius: 4;
`
