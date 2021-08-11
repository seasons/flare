import { Box, Button, Flex, Sans, Spacer } from "components"
import { Spinner } from "components/Spinner"
import { color } from "helpers"
import { useAuthContext } from "lib/auth/AuthContext"
import { get, head } from "lodash"
import { useRouter } from "next/router"
import { ADD_OR_REMOVE_FROM_LOCAL_BAG, GET_BAG } from "queries/bagQueries"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useState } from "react"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"
import { Schema, useTracking } from "utils/analytics"
import { Check } from "components/SVGs/Check"

import { useMutation } from "@apollo/client"

interface BagItemProps {
  bagItem: any
  index?: number
  navigation?: any
  removeItemFromBag?: Function
  removeFromBagAndSaveItem?: Function
  onShowBuyAlert: ({ bagItem, variantToUse }: any) => void
}

export const BagItem: React.FC<BagItemProps> = ({
  bagItem,
  index,
  removeItemFromBag,
  removeFromBagAndSaveItem,
  onShowBuyAlert,
}) => {
  const router = useRouter()
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

  // Show buy alert whenever a sellable status is enabled, regardless of underlying availability
  const isBuyable = variantToUse?.price?.buyNewEnabled || variantToUse?.price?.buyUsedEnabled
  const purchased = variantToUse?.purchased

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
  const handleShowBuyAlert = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    onShowBuyAlert({ variantToUse, bagItem })
  }

  const maxCharForName = 40
  const name = product?.name?.length > maxCharForName ? `${product?.name?.slice(0, maxCharForName)}...` : product?.name

  const ReservedItemContent = () => {
    return (
      <Flex
        style={{
          flex: 2,
          width: "100%",
        }}
        flexWrap="nowrap"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box style={{ width: "100%" }} p={2}>
          <Sans size="3">{`${index + 1}.`}</Sans>
          <Spacer mb={1} />
          <Sans size="3">{product?.brand?.name}</Sans>
          <Sans size="3" color="black50">
            {name}
          </Sans>
          <Sans size="3" color="black50">
            Size {variantToUse?.displayShort}
          </Sans>
        </Box>
        <Box p={2}>
          {process.env.ENABLE_BUY_USED && isBuyable && !purchased && (
            <Button size="small" variant="secondaryOutline" onClick={handleShowBuyAlert}>
              Buy
            </Button>
          )}
          {purchased && (
            <Flex flexDirection="row" alignItems="center">
              <Check color={color("black50")} />
              <Spacer mr={1} />
              <Sans size="3" color="black50">
                Purchased
              </Sans>
            </Flex>
          )}
        </Box>
      </Flex>
    )
  }

  const NonReservedItemContent = () => {
    return (
      <Flex style={{ flex: 2 }} flexWrap="nowrap" flexDirection="column" justifyContent="space-between">
        <Box>
          <Box style={{ width: "100%" }}>
            <Sans size="3">{`${index + 1}. ${product?.brand?.name}`}</Sans>
            <Sans size="3" color="black50">
              {product.name}
            </Sans>
            <Sans size="3" color="black50">
              Size {variantToUse?.displayShort}
            </Sans>
            <Spacer mb={3} />
            {authState.isSignedIn && (
              <TouchableOpacity
                onPress={() => {
                  if (!isMutating) {
                    setIsMutating(true)
                    tracking.trackEvent({
                      actionName: Schema.ActionNames.BagItemSaved,
                      actionType: Schema.ActionTypes.Tap,
                      productSlug: product.slug,
                      productId: product.id,
                      variantId: variantId,
                    })
                    removeFromBagAndSaveItem({
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
                <Sans size="3" style={{ textDecorationLine: "underline", cursor: "pointer" }}>
                  Save for later
                </Sans>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        {!isReserved && (
          <Flex flexDirection="row" pt={1} pb="2px">
            <Box>
              <Button
                size="small"
                variant="secondaryOutline"
                disabled={isMutating}
                onClick={(e) => {
                  e.stopPropagation()
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.BagItemRemoved,
                    actionType: Schema.ActionTypes.Tap,
                    productSlug: product.slug,
                    productId: product.id,
                    variantId: variantId,
                  })
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
                        {
                          query: GET_PRODUCT,
                          variables: { slug: product?.slug },
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
        boxShadow: "0 4px 12px 0 rgba(100, 100, 100, 0.2)",
      }
    : {}

  return (
    <Box key={product.id}>
      <TouchableWithoutFeedback
        onPress={() => {
          tracking.trackEvent({
            actionName: Schema.ActionNames.ProductTapped,
            actionType: Schema.ActionTypes.Tap,
            productSlug: product.slug,
            productId: product.id,
          })
          router.push(`/product/${product.slug}`)
        }}
      >
        <Box>
          <BagItemContainer isReserved={isReserved} style={shadowStyles}>
            <Flex flexDirection="row">
              {isReserved ? <ReservedItemContent /> : <NonReservedItemContent />}
              <Flex style={{ flex: 2 }} flexDirection="row" justifyContent="flex-end" alignItems="center">
                {!!imageURL && <ImageContainer src={imageURL} alt={`Image of ${product.name}`} />}
              </Flex>
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
  overflow: hidden;
  background-color: ${color("white100")};
  border-color: ${color("black10")};
  border-width: ${(p) => (p.isReserved ? "1px" : "0px")};
  border-radius: ${(p) => (p.isReserved ? "8px" : "0px")};
  border-style: solid;
`

const ImageContainer = styled.img`
  object-fit: cover;
  height: 100%;
  width: 170;
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
