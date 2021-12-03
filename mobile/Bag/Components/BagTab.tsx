import { Box, Flex, Separator, Spacer } from "components"
import { Loader } from "mobile/Loader"
import React from "react"
import { useBag } from "../useBag"
import { ScrollView } from "react-native"
import { EmptyBagItem } from "./EmptyBagItem"
import { BagSection } from "./BagSection/Index"
import { BagTabFooter } from "./BagTabFooter/BagTabFooter"

export const BagTab: React.FC<{
  startReservation: () => void
  setPrimaryCtaMutating: (x: boolean) => void
  primaryCtaMutating: boolean
}> = ({ startReservation, setPrimaryCtaMutating, primaryCtaMutating }) => {
  const { data, bagSections } = useBag()

  const totalBagItems = bagSections?.map((section) => section.bagItems.length)?.reduce((acc, curr) => acc + curr, 0)

  const itemCount = data?.me?.customer?.membership?.plan?.itemCount ?? 6
  const showAddAnItemCard = totalBagItems < itemCount

  let lastVisibleSection
  bagSections?.forEach((section) => {
    if (section.bagItems.length > 0) {
      lastVisibleSection = section.status
    }
  })

  if (!data) {
    return (
      <Flex height={"100%"} width="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Loader />
      </Flex>
    )
  }

  return (
    <>
      <ScrollView>
        {bagSections?.map((section, index) => {
          const showSeperator =
            (lastVisibleSection != section.status || (section.status === "Added" && showAddAnItemCard)) &&
            section.bagItems.length > 0
          return (
            <Box key={index}>
              <BagSection section={section} sectionIndex={index} />
              {showSeperator && (
                <Box px={2}>
                  <Spacer mb={2} />
                  <Separator />
                </Box>
              )}
            </Box>
          )
        })}

        {showAddAnItemCard && (
          <Flex style={{ flex: 1 }} justifyContent="center" alignItems="center">
            <EmptyBagItem text="Add an item" />
          </Flex>
        )}

        <Box mt={3}>{!showAddAnItemCard && <Spacer mb={90} />}</Box>
      </ScrollView>

      <BagTabFooter
        sections={bagSections}
        data={data}
        startReservation={startReservation}
        setPrimaryCtaMutating={setPrimaryCtaMutating}
        primaryCtaMutating={primaryCtaMutating}
      />
    </>
  )
}
