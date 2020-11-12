import { Box } from "components"
import { SaveIcon } from "components/Icons"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { useAuthContext } from "lib/auth/AuthContext"
import { useTracking, Schema } from "utils/analytics"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { GET_PRODUCT } from "queries/productQueries"
import { GET_BAG } from "queries/bagQueries"
import styled from "styled-components"

export const SAVE_ITEM = gql`
  mutation SaveItem($item: ID!, $save: Boolean!) {
    saveProduct(item: $item, save: $save) {
      id
      productVariant {
        id
        isSaved
      }
    }
  }
`

export interface SaveProductButtonProps {
  product: any
  selectedVariant: any
  onPressSaveButton?: () => void
  grayStroke?: boolean
  height?: number
  width?: number
  noModal?: boolean
}

export const SaveProductButton: React.FC<SaveProductButtonProps> = ({
  product,
  selectedVariant,
  onPressSaveButton,
  grayStroke,
  height,
  width,
  noModal,
}) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const isSaved = selectedVariant?.isSaved
    ? selectedVariant?.isSaved
    : product?.variants?.filter((variant) => variant.isSaved).length > 0
  const [enabled, setEnabled] = useState(isSaved)
  const tracking = useTracking()
  const [saveItem] = useMutation(SAVE_ITEM, {
    refetchQueries: [
      {
        query: GET_PRODUCT,
        variables: {
          slug: product?.slug,
        },
      },
      {
        query: GET_BAG,
      },
    ],
  })
  const { authState } = useAuthContext()
  const userHasSession = !!authState?.userSession

  useEffect(() => {
    setEnabled(isSaved)
  }, [isSaved])

  if (product?.variants?.length === 0) {
    return null
  }

  const handleSaveButton = () => {
    onPressSaveButton?.()
    if (!userHasSession) {
      //   navigation.navigate("Modal", { screen: NavigationSchema.PageNames.SignInModal })
      return
    }

    const updatedState = !isSaved
    // Open SaveProductModal if:
    // 1) User wants to save a specific variant inside ProductDetails screen OR
    // 2) User wants to save the product, i.e. clicked button outside of ProductDetails screen
    // if ((updatedState || !selectedVariant) && !noModal) {
    //   navigation.navigate("Modal", {
    //     screen: NavigationSchema.PageNames.SaveProductModal,
    //     params: {
    //       hidePopUp,
    //       product,
    //       showPopUp,
    //     },
    //   })
    // } else {
    tracking.trackEvent({
      actionName: Schema.ActionNames.ProductSaved,
      actionType: Schema.ActionTypes.Tap,
      saved: !isSaved,
    })
    setEnabled(!isSaved)
    saveItem({
      variables: {
        item: selectedVariant.id,
        save: !isSaved,
      },
      awaitRefetchQueries: true,
      optimisticResponse: {
        __typename: "Mutation",
        saveProduct: {
          __typename: "Product",
          id: product.id,
          productVariant: {
            __typename: "ProductVariant",
            isSaved: !isSaved,
            id: selectedVariant.id,
          },
        },
      },
    })
    // }
  }

  return (
    <Wrapper pl={2} pb={2} pt={0.5} onClick={handleSaveButton}>
      <SaveIcon width={width ? width : 16} height={height ? height : 22} enabled={enabled} grayStroke={grayStroke} />
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  cursor: pointer;
  &:hover {
    path {
      fill: #000;
    }
  }
`
