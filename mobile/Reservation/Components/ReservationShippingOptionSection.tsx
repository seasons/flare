import { Box, Separator, Spacer, Sans } from "components"
import React, { useState } from "react"
import { ReservationPickupTimePicker } from "./ReservationPickupTimePicker"
import { SectionHeader } from "./SectionHeader"
import { ShippingOption } from "./ShippingOption"

export const ReservationShippingOptionsSection = ({
  shippingOptions,
  onShippingOptionSelected,
  onTimeWindowSelected,
}) => {
  const [selectedOptionIndex, setSelectedShippingOptionIndex] = useState(0)

  const selectedMethod = shippingOptions?.[selectedOptionIndex]?.shippingMethod

  return (
    <Box mb={4}>
      {shippingOptions?.length > 0 && (
        <Box mb={4}>
          <SectionHeader title="Select shipping" />
          <Spacer mb={1} />
          {shippingOptions.map((option, index) => {
            return (
              <Box key={option?.id || index}>
                <ShippingOption
                  option={option}
                  index={index}
                  onSelect={() => {
                    if (option.shippingMethod.code !== "Pickup") {
                      onTimeWindowSelected(null)
                    }
                    setSelectedShippingOptionIndex(index)
                    onShippingOptionSelected?.(option)
                  }}
                  selected={index === selectedOptionIndex}
                />
                <Separator />
              </Box>
            )
          })}
          <Spacer mb={2} />
          <Sans size="3" color="black50">
            UPS Ground shipping averages 1-2 days in the NY metro area, 3-4 days for the Midwest + Southeast, and 5-7
            days on the West coast.
          </Sans>
        </Box>
      )}
      <Box my={2}>
        {selectedMethod?.code === "Pickup" && (
          <ReservationPickupTimePicker
            timeWindows={selectedMethod?.timeWindows}
            onTimeWindowSelected={onTimeWindowSelected}
          />
        )}
      </Box>
    </Box>
  )
}
