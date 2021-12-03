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
            variant = isSelected ? "primaryWhite" : "secondaryOutline"
          }

          let pr
          let pl

          if ((i % 4 === 0 || i === 1) && i !== 0) {
            pr = 0.5
            pl = 0.5
          } else if (i % 3 === 0) {
            pr = 1
            pl = 0
          } else {
            pr = 0
            pl = 1
          }

          return (
            <Col md="4" xs="6" key={i} pr={pr} pl={pl} pb={1}>
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
