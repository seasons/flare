import { Box } from "components"
import { SaveIcon } from "components/Icons"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { useAuthContext } from "lib/auth/AuthContext"
import { useTracking, Schema } from "utils/analytics"
import { GET_PRODUCT } from "queries/productQueries"
import { GET_BAG } from "queries/bagQueries"
import styled from "styled-components"
import { SaveProduct } from "./SaveProduct"
import { Modal } from "@material-ui/core"

export const SAVE_ITEM = gql`
  mutation SaveProductButton_SaveItem($item: ID!, $save: Boolean!) {
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
  height?: number
  width?: number
  showSizeSelector?: boolean
}

export const SaveProductButton: React.FC<SaveProductButtonProps> = ({
  product,
  selectedVariant,
  onPressSaveButton,
  height,
  width,
  showSizeSelector,
}) => {
  const isSaved = selectedVariant?.isSaved
    ? selectedVariant?.isSaved
    : product?.variants?.filter((variant) => variant.isSaved).length > 0
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
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
  const { userSession, toggleLoginModal, loginModalOpen } = useAuthContext()

  const isLoggedIn = !!userSession

  useEffect(() => {
    setEnabled(isSaved)
  }, [isSaved])

  if (product?.variants?.length === 0) {
    return null
  }

  const handleSaveButton = () => {
    onPressSaveButton?.()
    if (!isLoggedIn && !loginModalOpen) {
      toggleLoginModal(true)
      return
    }

    if (showSizeSelector && !isSaved) {
      // Open size selector window, e.g. user is on browse page
      setIsPopUpVisible(true)
    } else {
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
    }
  }

  const handlePopUpDismiss = () => {
    setIsPopUpVisible(false)
  }

  return (
    <>
      <Wrapper pl={2} pb={2} pt={0.5} onClick={handleSaveButton}>
        <SaveIcon width={width ? width : 16} height={height ? height : 22} enabled={enabled} />
      </Wrapper>
      <Modal open={isPopUpVisible} onClose={handlePopUpDismiss}>
        <ModalRoot>
          <SaveProduct product={product} onDismiss={handlePopUpDismiss} />
        </ModalRoot>
      </Modal>
    </>
  )
}

const ModalRoot = styled(Box)`
  max-width: 800px;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled(Box)`
  cursor: pointer;
  &:hover {
    path {
      fill: #000;
    }
  }
`
