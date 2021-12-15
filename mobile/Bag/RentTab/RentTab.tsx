import React from "react"
import { Box } from "@seasons/eclipse"
import { useBag } from "../useBag"
import { Flex } from "components"
import { BagSection } from "../Components/BagSection/BagSection"
import { EmptyBagItem } from "../Components/EmptyBagItem"
import { BagTabHeader } from "../Components/BagTabHeader"

export const RentTab: React.FC = () => {
  const { data, bagSections } = useBag()

  const totalBagItems = bagSections?.map((section) => section.bagItems.length).reduce((acc, curr) => acc + curr, 0)
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
          <EmptyBagItem text="Add an item" />
        </Flex>
      )}
    </Flex>
  )
}
