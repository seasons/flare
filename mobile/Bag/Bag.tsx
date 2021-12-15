import { Box, CloseButton, Spacer } from "components"
import { Container } from "mobile/Container"
import { TabBar } from "mobile/TabBar"
import { CHECK_ITEMS, CREATE_DRAFT_ORDER, DELETE_BAG_ITEM, GET_BAG } from "queries/bagQueries"
import React, { useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { gql, useMutation } from "@apollo/client"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useBag } from "./useBag"
import { BuyTab } from "./BuyTab/BuyTab"
import { RentTab } from "./RentTab/RentTab"
import { BagTabPrimaryCTA } from "./Components/BagTabPrimaryCTA"

export enum BagView {
  Rent = 0,
  Buy = 1,
}

export const BagFragment_Me = gql`
  fragment BagFragment_Me on Me {
    id
    customer {
      id
      user {
        id
      }
    }
  }
`

export const MAXIMUM_ITEM_COUNT = 6

export const Bag = screenTrack()(() => {
  const tracking = useTracking()
  const [currentView, setCurrentView] = useState<BagView>(BagView.Rent)
  const [deleteBagItem] = useMutation(DELETE_BAG_ITEM, { awaitRefetchQueries: true })
  const [isPrimaryCTAMutating, setIsPrimaryCtaMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const { bagSections, data } = useBag()

  const me = data?.me
  const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems

  const [createDraftOrder] = useMutation(CREATE_DRAFT_ORDER, {
    onCompleted: (res) => {
      setIsPrimaryCtaMutating(false)
      if (res?.createDraftedOrder) {
        openDrawer("reviewOrder", { order: res.createDraftedOrder })
      }
    },
    onError: (error) => {
      showPopUp({
        title: "Sorry!",
        note: "There was an issue creating the order, please try again.",
        buttonText: "Okay",
        onClose: () => {
          hidePopUp()
        },
      })
      console.log("error createDraftOrder ", error)
      setIsPrimaryCtaMutating(false)
    },
  })

  const [checkItemsAvailability] = useMutation(CHECK_ITEMS, {
    onCompleted: (res) => {
      setIsPrimaryCtaMutating(false)
      if (res.checkItemsAvailability) {
        openDrawer("reservation")
      }
    },
    onError: (e) => {
      setIsPrimaryCtaMutating(false)
      const { graphQLErrors } = e
      console.log("Bag.tsx handleReserve: ", graphQLErrors)
      const error = graphQLErrors.length > 0 ? graphQLErrors[0] : null
      if (error) {
        const { code } = error.extensions
        if (code === "515" || code === "511") {
          showPopUp({
            title: "One or more items have been reserved already",
            note:
              "Sorry, some of the items you had selected were confirmed before you, we've moved these to your saved items.",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        } else {
          showPopUp({
            title: "Sorry!",
            note: "We couldn't process your order because of an unexpected error, please try again later",
            buttonText: "Got it",
            onClose: () => hidePopUp(),
          })
        }
      }
    },
  })

  const CurrentTab = () => {
    switch (currentView) {
      case BagView.Buy:
        return <BuyTab items={me?.cartItems} />
      case BagView.Rent:
        return <RentTab />
    }
  }

  const startReservation = async () => {
    await checkItemsAvailability({
      variables: {
        items: addedItems.map((item) => item.productVariant.id),
      },
      refetchQueries: [
        {
          query: GET_BAG,
        },
      ],
      update(cache, { data, errors }) {
        console.log(data, errors)
      },
    })
  }

  const onCartCheckout = () => {
    if (isPrimaryCTAMutating) {
      return
    }
    setIsPrimaryCtaMutating(true)
    createDraftOrder({
      variables: {
        input: {
          productVariantIds: me?.cartItems?.map((item) => item.productVariant.id),
          orderType: "Used",
        },
      },
    })
  }

  return (
    <Container insetsBottom={false}>
      <Box>
        <CloseButton variant="light" />
        <Spacer mb={8} />
        <TabBar
          spaceEvenly
          tabs={[{ name: "Rent" }, { name: "Buy", badgeCount: me?.cartItems?.length }]}
          activeTab={currentView}
          goToPage={(page: BagView) => {
            tracking.trackEvent({
              actionName: () => {
                if (page === 0) {
                  return Schema.ActionNames.BagTabTapped
                } else if (page === 1) {
                  return Schema.ActionNames.SavedTabTapped
                } else {
                  return Schema.ActionNames.ReservationHistoryTabTapped
                }
              },
              actionType: Schema.ActionTypes.Tap,
            })

            setCurrentView(page)
          }}
        />
      </Box>

      <CurrentTab />

      <BagTabPrimaryCTA
        activeTab={currentView}
        data={data}
        sections={bagSections}
        isMutating={isPrimaryCTAMutating}
        setIsMutating={setIsPrimaryCtaMutating}
        startReservation={startReservation}
        onCartCheckout={onCartCheckout}
      />
    </Container>
  )
})
