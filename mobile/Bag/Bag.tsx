import { CloseButton, Spacer } from "components"
import { Container } from "mobile/Container"
import { TabBar } from "mobile/TabBar"
import { CHECK_ITEMS, CREATE_DRAFT_ORDER, GET_BAG } from "queries/bagQueries"
import React, { useEffect, useState } from "react"
import { Schema, screenTrack, useTracking } from "utils/analytics"
import { gql, useMutation } from "@apollo/client"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { useBag } from "./useBag"
import { FlatList } from "react-native"
import { BuyTab } from "./BuyTab/BuyTab"
import { RentTab } from "./RentTab/RentTab"
import { BagTabPrimaryCTA } from "./Components/BagTabPrimaryCTA"
import { Loader } from "mobile/Loader"
import { useAuthContext } from "lib/auth/AuthContext"

export enum BagView {
  Buy = 0,
  Rent = 1,
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

export const Bag = screenTrack()(({ initialTab }) => {
  const tracking = useTracking()
  const [currentView, setCurrentView] = useState<BagView>(BagView.Buy)
  const [isPrimaryCTAMutating, setIsPrimaryCtaMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()
  const { openDrawer } = useDrawerContext()
  const { bagSections, data, localCartItems } = useBag()
  const { authState } = useAuthContext()

  const isLoggedIn = !!authState.isSignedIn

  const me = data?.me
  const addedItems = bagSections?.find((section) => section.status === "Added")?.bagItems

  const isBuyView = currentView === BagView.Buy

  useEffect(() => {
    if (initialTab === BagView.Buy || initialTab === BagView.Rent) {
      setCurrentView(initialTab)
    }
  }, [initialTab, setCurrentView])

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

  if (!data) {
    return (
      <>
        <CloseButton variant="light" />
        <Loader />
      </>
    )
  }

  const remoteCartItems = me?.cartItems ?? []
  const cartItems = [...remoteCartItems, ...localCartItems]

  const renderItem = () => {
    if (isBuyView) {
      return <BuyTab items={cartItems} />
    } else {
      return <RentTab />
    }
  }

  return (
    <Container insetsBottom={false}>
      <CloseButton variant="light" />
      <Spacer mb={8} />
      {isLoggedIn && (
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
      )}

      <FlatList
        style={{ flex: 1 }}
        data={[{ data: null }]}
        contentContainerStyle={{ flexGrow: 1, flex: 1 }}
        keyExtractor={(item, index) => String(index) + String(currentView)}
        renderItem={() => {
          return renderItem()
        }}
      />

      <Spacer mb="100px" />
      <BagTabPrimaryCTA
        activeTab={currentView}
        data={data}
        cartItems={cartItems}
        sections={bagSections}
        isMutating={isPrimaryCTAMutating}
        setIsMutating={setIsPrimaryCtaMutating}
        startReservation={startReservation}
        onCartCheckout={onCartCheckout}
      />
    </Container>
  )
})
