import { Box, Button, Container, Flex, Sans, Spacer } from "components"
import { color } from "helpers/color"
import Measurements from "mobile/GetMeasurementsPane/Measurements"
import { MultiSelectionTable } from "mobile/GetMeasurementsPane/MultiSelectionTable"
import React, { useState } from "react"
import { FlatList } from "react-native"

enum Section {
  Height_Weight,
  TopSizes,
  WaistSizes,
}

const parseMeasurements = (rawMeasurements) => {
  const height = rawMeasurements?.height
  const weightRange = rawMeasurements?.weight
  const topSizes = rawMeasurements?.topSizes
  const waistSizes = rawMeasurements?.waistSizes

  const measurements = { height: null, weight: null, topSizeIndices: null, waistSizeIndices: null }

  if (height) {
    measurements.height = Measurements.heights.find((item) => item.value == height)
  }

  if (weightRange && weightRange?.length == 2) {
    measurements.weight = Measurements.weights.find(
      (item) => item.value[0] == weightRange[0] && item.value[1] == weightRange[1]
    )
  }

  if (topSizes) {
    measurements.topSizeIndices = Measurements.topSizes.reduce(
      (accumulator, item, index) => (topSizes.includes(item.value) ? [...accumulator, index] : accumulator),
      [] as number[]
    )
  }

  if (waistSizes) {
    measurements.waistSizeIndices = Measurements.waistSizes.reduce(
      (accumulator, item, index) => (waistSizes.includes(item.value) ? [...accumulator, index] : accumulator),
      [] as number[]
    )
  }
  return measurements
}

export const SizingTab: React.FC<{ navigation: any; rawMeasurements }> = ({ navigation, rawMeasurements }) => {
  const [footerBoxHeight, setFooterBoxHeight] = useState(0)
  const measurements = parseMeasurements(rawMeasurements)

  const renderSection = (section: Section) => {
    switch (section) {
      case Section.Height_Weight:
        return (
          <Flex flexDirection="row">
            <Box style={{ flex: 0.5, marginRight: 6 }}>
              <Sans color="black100" size="4">
                Height
              </Sans>
              <Spacer mb={1} />
              {/* <UninteractableBoxPicker text={measurements.height?.label} /> */}
            </Box>
            <Box style={{ flex: 0.5, marginLeft: 6 }}>
              <Sans color="black100" size="4">
                Weight
              </Sans>
              <Spacer mb={1} />
              {/* <UninteractableBoxPicker text={measurements.weight?.label} /> */}
            </Box>
          </Flex>
        )
      case Section.TopSizes:
        return (
          <>
            <Sans color="black100" size="4">
              What are your preferred top sizes?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable
              disabled
              items={Measurements.topSizes}
              selectedItemIndices={measurements.topSizeIndices}
            />
          </>
        )
      case Section.WaistSizes:
        return (
          <>
            <Sans color="black100" size="4">
              Your preferred waist size?
            </Sans>
            <Spacer mb={1} />
            <MultiSelectionTable
              disabled
              items={Measurements.waistSizes}
              selectedItemIndices={measurements.waistSizeIndices}
            />
          </>
        )
    }
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <FlatList
        data={[Section.Height_Weight, Section.TopSizes, Section.WaistSizes]}
        keyboardDismissMode="interactive"
        ItemSeparatorComponent={() => <Spacer mb={5} />}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={() => <Spacer mb={4} />}
        ListFooterComponent={() => <Spacer height={footerBoxHeight + 16} />}
        renderItem={({ item }) => renderSection(item)}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16, flex: 1 }}
      />
      <Box width="100%" style={{ position: "absolute", bottom: 0 }}>
        <Spacer mb={2} />
        <Flex p={2} flexDirection="row">
          <Button
            block
            onPress={() =>
              navigation.navigate("Modal", {
                screen: "EditMeasurements",
                params: { measurements },
              })
            }
            variant="primaryWhite"
          >
            Edit
          </Button>
        </Flex>
      </Box>
    </Container>
  )
}

const UninteractableBoxPicker: React.FC<{ text: string }> = ({ text }) => (
  <Flex
    height={48}
    style={{
      borderColor: color("black10"),
      borderWidth: 1,
      padding: 12,
      borderRadius: 4,
    }}
  >
    <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
      <Sans size="4">{text}</Sans>
    </Flex>
  </Flex>
)
