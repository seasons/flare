import { Button } from "components"
import React from "react"
import { Schema, useTracking } from "utils/analytics"
import { Col, Grid, Row } from "components/Grid"

export const sizeToName = (size) => {
  switch (size) {
    case "XS":
      return "X-Small"
    case "S":
      return "Small"
    case "M":
      return "Medium"
    case "L":
      return "Large"
    case "XL":
      return "X-Large"
  }
}

export const VariantSelect = ({ setSelectedVariant, selectedVariant, onSizeSelected, product, variantInStock }) => {
  const variants = product?.variants
  const tracking = useTracking()

  return (
    <Grid width="100%">
      <Row>
        {variants?.map((size, i) => {
          const isSelected = selectedVariant?.id === size.id
          const nonReservable = size.reservable === 0
          let variant
          if (nonReservable) {
            variant = isSelected ? "secondaryGraySelected" : "secondaryGray"
          } else {
            variant = isSelected ? "primaryBlack" : "primaryWhite"
          }

          return (
            <Col md="4" xs="6" key={i} px={0.5} pb={1}>
              <Button
                boxShadow={isSelected && size.reservable !== 0}
                block
                variant={variant}
                onClick={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.ProductVariantSelected,
                    actionType: Schema.ActionTypes.Tap,
                    size: size?.displayShort,
                    variantID: size?.id,
                  })
                  setSelectedVariant(size)
                  onSizeSelected(size)
                }}
              >
                {size.displayLong}
              </Button>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}
