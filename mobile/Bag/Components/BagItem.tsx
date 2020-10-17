import { Box, Button, Flex, Sans, Spacer } from "components"
import { ProgressiveImage } from "components/Image"
import { Spinner } from "components/Spinner"
import gql from "graphql-tag"
import { color } from "helpers"
import { get, head } from "lodash"
import { useAuthContext } from "mobile/Navigation/AuthContext"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"

import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_BAG } from "./BagQueries"

interface BagItemProps {
  bagItem: any
  index?: number
  navigation?: any
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  removeItemFromBag,
  removeFromBagAndSaveItem,
}) => {
  const { authState } = useAuthContext()
  const [isMutating, setIsMutating] = useState(false)
  const tracking = useTracking()
  if (!bagItem) {
    return null
  }
  const variantToUse = head(
    (get(bagItem, "productVariant.product.variants") || []).filter((a) => a.id === bagItem.productVariant.id)
  )
  const product = get(bagItem, "productVariant.product")
  if (!product) {
    return null
  }

  const isReserved = bagItem.status !== "Added"
  const imageURL = product?.images?.[0]?.url || ""

  const variantSize = get(variantToUse, "internalSize.display")
  const variantId = bagItem.variantID

  const [removeFromLocalBag] = useMutation(ADD_OR_REMOVE_FROM_LOCAL_BAG, {
    variables: {
      productID: product.id,
      variantID: variantToUse.id,
    },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BAG,
      },
    ],
  })

  const ReservedItemContent = () => {
    return (
      <Flex
        style={{
          flex: 2,
          width: "100%",
        }}
        flexWrap="nowrap"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Box style={{ width: "100%" }} p={2}>
          <Sans size="4">{`${index + 1}.`}</Sans>
          <Spacer mb={1} />
          <Sans size="4">{product?.brand?.name}</Sans>
          <Sans size="4" color="black50">
            {product.name}
          </Sans>
          <Sans size="4" color="black50">
            Size {variantSize}
          </Sans>
        </Box>
      </Flex>
    )
  }

  const NonReservedItemContent = () => {
    return (
      <Flex style={{ flex: 2, width: "100%" }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        <Box>
          <Box style={{ width: "100%" }}>
            <Sans size="4">{`${index + 1}. ${product?.brand?.name}`}</Sans>
            <Sans size="4" color="black50">
              {product.name}
            </Sans>
            <Sans size="4" color="black50">
              Size {variantSize}
            </Sans>
            <Spacer mb={3} />
            {authState.isSignedIn && (
              <TouchableOpacity
                onPress={() => {
                  if (!isMutating) {
                    setIsMutating(true)
                    // tracking.trackEvent({
                    //   actionName: Schema.ActionNames.BagItemSaved,
                    //   actionType: Schema.ActionTypes.Tap,
                    //   productSlug: product.slug,
                    //   productId: product.id,
                    //   variantId: variantId,
                    // })
                    removeFromBagAndSaveItem({
                      variables: {
                        id: variantId,
                        saved: false,
                      },
                      refetchQueries: [
                        {
                          query: GET_BAG,
                        }
                      ],
                    })
                  }
                }}
              >
                <Sans size="4" style={{ textDecorationLine: "underline" }}>
                  Save for later
                </Sans>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        {!isReserved && (
          <Flex flexDirection="row" pt={1}>
            <Box>
              <Button
                size="small"
                variant="secondaryWhite"
                disabled={isMutating}
                onPress={() => {
                  // tracking.trackEvent({
                  //   actionName: Schema.ActionNames.BagItemRemoved,
                  //   actionType: Schema.ActionTypes.Tap,
                  //   productSlug: product.slug,
                  //   productId: product.id,
                  //   variantId: variantId,
                  // })
                  if (!authState.isSignedIn) {
                    removeFromLocalBag()
                  } else {
                    removeItemFromBag({
                      variables: {
                        id: variantId,
                        saved: false,
                      },
                      refetchQueries: [
                        {
                          query: GET_BAG,
                        },
                      ],
                    })
                  }
                }}
              >
                Remove
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>
    )
  }

  const shadowStyles = isReserved
    ? {
        shadowColor: "black",
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        elevation: 1,
      }
    : {}

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          // tracking.trackEvent({
          //   actionName: Schema.ActionNames.ProductTapped,
          //   actionType: Schema.ActionTypes.Tap,
          //   productSlug: product.slug,
          //   productId: product.id,
          // })
          // navigation?.navigate("Product", { id: product.id, slug: product.slug })
        }}
      >
        <Box style={shadowStyles}>
          <BagItemContainer isReserved={isReserved} flexDirection="row">
            {isReserved ? <ReservedItemContent /> : <NonReservedItemContent />}
            <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
              {!!imageURL && (
                <ImageContainer
                  style={{ height: 170 * 1.3, width: 170 }}
                  resizeMode="contain"
                  source={{ uri: imageURL }}
                />
              )}
            </Flex>
          </BagItemContainer>
          <Spacer mb={isReserved ? 1 : 2} />
        </Box>
      </TouchableWithoutFeedback>
      {isMutating && (
        <Overlay>
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        </Overlay>
      )}
    </Box>
  )
}

const BagItemContainer = styled(Box)<{ isReserved: boolean }>`
  height: 216px;
  overflow: hidden;
  background-color: ${color("white100")};
  border-color: ${color("black10")};
  border-width: ${(p) => (p.isReserved ? "1px" : "0px")};
  border-radius: ${(p) => (p.isReserved ? "8px" : "0px")};
`

const ImageContainer = styled(ProgressiveImage)`
  height: 214;
`

const Overlay = styled(Box)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`
