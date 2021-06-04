import { Box, Button, Flex, Sans, Separator, Spacer } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { Spinner } from "components/Spinner"
import { color } from "helpers"
import { get, head } from "lodash"
import { ADD_TO_BAG, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { Image } from "mobile/Image"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { SavedTab_Query } from "queries/bagQueries"

interface BagItemProps {
  bagIsFull: boolean
  hasActiveReservation: boolean
  bagItem: any
  removeItemFromBag?: Function
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

export const SavedItem: React.FC<BagItemProps> = ({ bagIsFull, bagItem, removeItemFromBag, hasActiveReservation }) => {
  const [isMutating, setIsMutating] = useState(false)
  const [addingToBag, setAddingToBag] = useState(false)
  const tracking = useTracking()
  const { showPopUp, hidePopUp } = usePopUpContext()
  if (!bagItem) {
    return null
  }
  const variant = bagItem?.productVariant
  const product = variant?.product

  const imageURL = product?.images?.[0]?.url || ""
  const variantSize = variant?.displayLong
  const reservable = variant?.reservable

  const [addToBag] = useMutation(ADD_TO_BAG, {
    variables: {
      id: variant.id,
    },
    refetchQueries: [
      {
        query: GET_BAG,
      },
      { query: SavedTab_Query },
    ],
    onCompleted: () => {
      setIsMutating(false)
      setAddingToBag(false)
      if (bagIsFull) {
        showPopUp({
          title: "Added to bag",
          note: "Your bag is full. Place your reservation from the bag tab.",
          buttonText: "Got It",
          onClose: () => hidePopUp(),
        })
      }
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
      <TouchableWithoutFeedback>
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
                  <ColoredDot reservable={reservable} />
                  <Spacer mr={1} />
                  {!!reservable ? (
                    <>
                      {!hasActiveReservation ? (
                        <>
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
                        </>
                      ) : (
                        <Sans size="3" color="black50">
                          Available
                        </Sans>
                      )}
                    </>
                  ) : (
                    <Sans size="3" color="black50">
                      Unavailable
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
                    removeItemFromBag({
                      variables: {
                        id: variant.id,
                        saved: true,
                      },
                      refetchQueries: [
                        {
                          query: GET_BAG,
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
      </TouchableWithoutFeedback>
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
  overflow: hidden;
`

const ColoredDot = styled(Box)<{ reservable?: boolean }>`
  height: 10px;
  width: 10px;
  background-color: ${(p) => (!!p.reservable ? color("green") : color("black50"))};
  border-radius: 5px;
`
