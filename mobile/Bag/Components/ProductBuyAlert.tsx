import React from "react"
import { ProductBuyAlert as ProductBuyAlertBase } from "@seasons/eclipse"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { CREATE_DRAFT_ORDER_MUTATION } from "queries/orderQueries"
import { useMutation } from "@apollo/client"
import { Modal } from "@material-ui/core"
import styled from "styled-components"

export const ProductBuyAlert = ({ productVariantId, tabs, initialTab, onDismiss, onCreateDraftOrder }) => {
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER_MUTATION)

  const handleNavigateToBrand = (href: string) => {
    window.location.href = href
  }
  const handleError = (error) => {
    console.error(error)
    showPopUp({
      title: "Sorry! There was a problem",
      note: "There was an issue purchasing this item, please contact us if the issue persists.",
      buttonText: "Got it",
      onClose: () => {
        hidePopUp()
      },
    })
  }

  const handleCreateDraftOrder = async (orderType) => {
    try {
      const result = await createDraftOrder({
        variables: {
          input: {
            productVariantID: productVariantId,
            orderType,
          },
        },
      })
      if (result.errors) {
        handleError(result.errors)
      }

      openDrawer("reviewOrder", { order: result.createDraftedOrder })
    } catch (error) {
      handleError(error)
    }
  }
  const handleNotifyMe = () => {
    /** TODO: implement **/
    return Promise.resolve()
  }

  return (
    <Modal open={true} onClose={onDismiss}>
      <ModalRoot>
        <ProductBuyAlertBase
          onDismiss={onDismiss}
          tabs={tabs}
          initialTab={initialTab}
          onNavigateToBrand={handleNavigateToBrand}
          onCreateDraftOrder={handleCreateDraftOrder}
          onNotifyMe={handleNotifyMe}
        />
      </ModalRoot>
    </Modal>
  )
}

const ModalRoot = styled.div`
  width: 375px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: auto;
  position: absolute;
  top: 0;
  bottom 0;
  left: 0;
  right: 0;
  height: 325px;
`
