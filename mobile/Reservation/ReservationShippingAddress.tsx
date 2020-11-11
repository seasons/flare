import React from "react"

import { screenTrack } from "utils/analytics"
import { EditShippingAddress, ShippingAddress } from "mobile/Account/EditShippingAddress/EditShippingAddress"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { FixedBackArrow } from "components/FixedBackArrow"

interface Params {
  shippingAddress: ShippingAddress
}

export const ReservationShippingAddress: React.FC<Params> = screenTrack()((props) => {
  const { openDrawer } = useDrawerContext()

  const onNext = () => {
    console.log("on next")
    openDrawer("reservation")
  }

  return (
    <>
      <FixedBackArrow
        navigation={null}
        variant="whiteBackground"
        onPress={() => {
          openDrawer("bag")
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
