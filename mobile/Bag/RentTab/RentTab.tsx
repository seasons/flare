import { Flex } from "components"
import React from "react"

import { Box, Spacer } from "@seasons/eclipse"

import { BagSection } from "../Components/BagSection/BagSection"
import { BagTabHeader } from "../Components/BagTabHeader"
import { EmptyBagItem } from "../Components/EmptyBagItem"
import { useBag } from "../useBag"

export const RentTab: React.FC = () => {
  const { data, bagSections } = useBag()

  const totalBagItems = bagSections?.map((section) => section.bagItems.length).reduce((acc, curr) => acc + curr, 0) || 0
  const itemCount = data?.me?.customer?.membership?.plan?.itemCount ?? 6
  const showAddAnItemCard = totalBagItems < itemCount

  return (
    <Flex height="100%" flexDirection="column">
      {totalBagItems === 0 && <BagTabHeader title="Rent" />}
      {bagSections?.map((section, index) => {
        return (
          <Box key={index}>
            <BagSection section={section} sectionIndex={index} />
          </Box>
        )
      })}

      {showAddAnItemCard && (
        <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
          <EmptyBagItem text="Add an item" view="rent" />
        </Flex>
      )}
    </Flex>
  )
}
