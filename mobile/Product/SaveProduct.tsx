import {
  Box, Button, FixedBackArrow, Flex, ProgressiveImage, Sans, Separator, Spacer
} from "components"
import { color, space } from "helpers"
import { Loader } from "mobile/Loader"
import { SavedTab_Query } from "queries/bagQueries"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useState } from "react"
import { FlatList, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking } from "utils/analytics"

import { useMutation } from "@apollo/client"
import Radio from "@material-ui/core/Radio"

import { SAVE_ITEM } from "./SaveProductButton"

interface SaveProductProps {
  onDismiss: () => void
  product: any
}

export const SaveProduct: React.FC<SaveProductProps> = screenTrack()(({ product, onDismiss }) => {
  const tracking = useTracking()
  const [selectedVariantID, setSelectedVariantID] = useState(null)
  const [saveItem] = useMutation(SAVE_ITEM, {
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          slug: product?.slug,
        },
      },
      {
        query: SavedTab_Query,
      },
    ],
  })

  if (!product) {
    return (
      <>
        <FixedBackArrow onPress={onDismiss} />
        <Loader />
      </>
    )
  }

  // largeImages come from product query and images come from browse query
  const images = product?.largeImages || product.images

  const { description, name, type, variants } = product

  const brandName = product?.brand?.name

  if (!type) {
    return (
      <>
        <FixedBackArrow onPress={onDismiss} variant="whiteBackground" />
        <Loader />
      </>
    )
  }

  const onSelectSize = (variantID) => {
    tracking.trackEvent({
      actionName: Schema.ActionNames.SizeButtonTapped,
      actionType: Schema.ActionTypes.Tap,
    })
    setSelectedVariantID(variantID)
  }

  const renderItem = (item) => {
    switch (item.type) {
      case "Header":
        return (
          <>
            <Spacer mt={2} />
            <Flex flexDirection="row" justifyContent="space-between">
              <Flex flex={2} flexDirection="column" justifyContent="flex-end">
                <Sans size="3">{name}</Sans>
                {!!brandName && (
                  <Sans size="3" color={color("black50")}>
                    {brandName}
                  </Sans>
                )}
              </Flex>
              <ImageContainer>
                <ProgressiveImage alt={`Image of ${product?.name}`} size="small" imageUrl={images?.[0]?.url || ""} />
              </ImageContainer>
            </Flex>
            <Spacer mt={2} />
            <Sans size="3" color={color("black50")}>
              {description}
            </Sans>
            <Spacer mt={2} />
            <Separator />
          </>
        )
      case "Sizes":
        const renderSizeRow = (item) => {
          const { id, isSaved, displayLong } = item

          return (
            <TouchableWithoutFeedback onPress={() => onSelectSize(id)}>
              <Box>
                <Spacer mt={20} />
                <Flex flexDirection="row" justifyContent="space-between">
                  <Flex flexDirection="row" alignItems="center">
                    <Radio checked={id === selectedVariantID} value={id} onChange={() => onSelectSize(id)} />
                    <Sans color={color("black100")} ml={1} size="3" weight="medium">
                      {displayLong}
                    </Sans>
                  </Flex>
                  {isSaved && (
                    <Sans color={color("black50")} size="3" weight="medium">
                      (Saved)
                    </Sans>
                  )}
                </Flex>
                <Spacer mt={20} />
                <Separator color={color("black10")} />
              </Box>
            </TouchableWithoutFeedback>
          )
        }
        return (
          <FlatList
            extraData={{ selectedVariantID }}
            data={item?.variants || []}
            keyExtractor={(_item, index) => String(index)}
            renderItem={({ item }) => renderSizeRow(item)}
          />
        )
      default:
        return null
    }
  }

  const onPressSaveBtn = () => {
    saveItem({
      variables: {
        item: selectedVariantID,
        save: true,
      },
      optimisticResponse: {
        __typename: "Mutation",
        saveProduct: {
          __typename: "Product",
          id: product.id,
          productVariant: {
            __typename: "ProductVariant",
            isSaved: true,
            id: selectedVariantID,
          },
        },
      },
    })
    onDismiss()
  }

  const buttonHeight = 48
  const sections = [{ type: "Header" }, { type: "Sizes", variants }]

  return (
    <Container>
      <Box px={2}>
        <FlatList
          data={sections}
          keyExtractor={(_item, index) => String(index)}
          renderItem={({ item }) => renderItem(item)}
          ListFooterComponent={() => <Spacer mb={buttonHeight + space(4)} />}
        />
      </Box>
      <Flex alignItems={"stretch"} mb={2} px={2}>
        <Box flex={1}>
          <Button
            block
            variant="primaryWhite"
            onClick={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.SaveProductModalCancelTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              onDismiss()
            }}
          >
            Cancel
          </Button>
        </Box>
        <Spacer ml={2} />
        <Box flex={1}>
          <Button
            block
            disabled={selectedVariantID === null}
            variant="primaryBlack"
            onClick={() => {
              tracking.trackEvent({
                actionName: Schema.ActionNames.SaveProductModalSaveTapped,
                actionType: Schema.ActionTypes.Tap,
              })
              onPressSaveBtn()
            }}
          >
            Save
          </Button>
        </Box>
      </Flex>
    </Container>
  )
})

const Container = styled.div`
  max-height: 100vh;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${color("white100")};
  border: solid 1px ${color("black100")};
`

const ImageContainer = styled.div`
  background: #f6f6f6;
  flex: 1;
`
