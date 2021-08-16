import React from "react"

export const SuggestedAddressPopupNote = ({
  suggestedAddress,
  type,
}: {
  suggestedAddress: any
  type: "Reservation" | "Shipping"
}) => {
  const editShippingDetailText =
    "The address you entered is not recognized by UPS. Please use the suggested address above or enter a different one."
  const reservationDetailText =
    "The address you entered is not recognized by UPS. In order to place your reservation, please use the suggested address above or tap edit to enter a different value."
  return (
    <>
      <br />
      {suggestedAddress.street1}
      <br />
      {!!suggestedAddress.street2 ? (
        <>
          {suggestedAddress.street2}
          <br />
        </>
      ) : null}
      {suggestedAddress.city}, {suggestedAddress.state} {suggestedAddress.zip}
      <br />
      <br />
      {type === "Shipping" ? editShippingDetailText : reservationDetailText}
    </>
  )
}
