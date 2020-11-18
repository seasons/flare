import React from "react"

import { screenTrack } from "utils/analytics"
import { EditShippingAddress, ShippingAddress } from "mobile/Account/EditShippingAddress/EditShippingAddress"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { FixedBackArrow } from "components/FixedBackArrow"

interface Params {
  shippingAddress: ShippingAddress
  previousScreen?: "reservation"
}

export const ReservationShippingAddress: React.FC<Params> = screenTrack()((props) => {
  const { openDrawer } = useDrawerContext()

  const onNext = () => {
    openDrawer("reservation", { previousScreen: "reservationShippingAddress" })
  }

  return (
    <>
      <FixedBackArrow
        navigation={null}
        variant="whiteBackground"
        onPress={() => {
          if (props?.previousScreen === "reservation") {
            onNext()
          } else {
            openDrawer("bag")
          }
        }}
      />
      <EditShippingAddress
        onNext={onNext}
        shippingAddress={props?.shippingAddress}
        title="Add a shipping address"
        subtitle="Add your address to finish placing your reservation"
      />
    </>
  )
})
