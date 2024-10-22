import { Box, Button, CloseButton, Container, Flex, Sans, Spacer } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import React, { useState } from "react"
import { ScrollView } from "react-native"
import { Schema, useTracking } from "utils/analytics"
import { ADD_MEASUREMENTS } from "queries/customerQueries"

import { useMutation } from "@apollo/client"

import Item from "./Item"
import Measurements from "./Measurements"
import { SelectionTable } from "./SelectionTable"

interface GetMeasurementsPaneProps {
  initialMeasurements?: {
    shoeSize?: Item
    weight?: Item
    topSizeIndices?: number[]
    waistSizeIndices?: number[]
  }
  onGetMeasurements: () => void
  onRequestBack?: () => void
  // Whether this pane should use the layout for editing (like in the Account onboarding checklist)
  useEditingLayout?: boolean
}

export const GetMeasurementsPane: React.FC<GetMeasurementsPaneProps> = ({
  initialMeasurements,
  onGetMeasurements,
  onRequestBack,
  useEditingLayout = false,
}) => {
  const tracking = useTracking()

  const [shoeSize, setShoeSize] = useState(initialMeasurements?.shoeSize)
  const [weight, setWeight] = useState(initialMeasurements?.weight)
  const [topSizeIndices, setTopSizeIndices] = useState(initialMeasurements?.topSizeIndices || Array<number>())
  const [waistSizeIndices, setWaistSizeIndices] = useState(initialMeasurements?.waistSizeIndices || Array<number>())

  const [footerBoxHeight, setFooterBoxHeight] = useState(0)

  const [isMutating, setIsMutating] = useState(false)
  const { showPopUp, hidePopUp } = usePopUpContext()

  const [addMeasurements] = useMutation(ADD_MEASUREMENTS, {
    onCompleted: () => {
      setIsMutating(false)
      onGetMeasurements()
    },
    onError: (err) => {
      console.log("Error GetMeasurementsPane.tsx", err)
      const popUpData = {
        title: "Oops! Try again!",
        note: "There was an issue sending your measurements and sizing. Please retry.",
        buttonText: "Close",
        onClose: hidePopUp,
      }
      showPopUp(popUpData)
      setIsMutating(false)
    },
  })

  const submitMeasurements = async () => {
    if (isMutating) {
      return
    }

    if (!useEditingLayout) {
      tracking.trackEvent({
        actionName: Schema.ActionNames.GetMeasurementsFinishTapped,
        actionType: Schema.ActionTypes.Tap,
      })
    }

    setIsMutating(true)
    await addMeasurements({
      variables: {
        shoeSize: shoeSize.value,
        weight: { set: weight.value },
        topSizes: { set: topSizeIndices.map((i) => Measurements.topSizes[i].value) },
        waistSizes: { set: waistSizeIndices.map((i) => Measurements.waistSizes[i].value) },
      },
    })
  }

  return (
    <Container insetsTop={false} insetsBottom={false}>
      <CloseButton variant="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p={2} pt={useEditingLayout ? "80px" : "85px"}>
          <Sans color="black100" size="3">
            {useEditingLayout ? "Measurements" : "One last step"}
          </Sans>
          {!useEditingLayout && (
            <>
              <Spacer mb={1} />
              <Sans color="black50" size="3">
                Let's get your measurements and sizing info so we can make sure we have enough inventory for you.
              </Sans>
            </>
          )}

          <Spacer mb={5} />

          <Flex flexDirection="row">
            <Box style={{ flex: 0.5, marginRight: 6 }}>
              <Sans color="black100" size="3">
                Height
              </Sans>
              <Spacer mb={1} />
              {/* <BoxPicker
                onChange={(value) => setHeight(value)}
                title="Height"
                currentItem={height}
                items={Measurements.heights}
              /> */}
            </Box>
            <Box style={{ flex: 0.5, marginLeft: 6 }}>
              <Sans color="black100" size="3">
                Weight
              </Sans>
              <Spacer mb={1} />
              {/* <BoxPicker
                onChange={(value) => setWeight(value)}
                title="Weight"
                currentItem={weight}
                items={Measurements.weights}
              /> */}
            </Box>
          </Flex>

          <Spacer mb={5} />

          <Sans color="black100" size="3">
            What are your preferred top sizes?
          </Sans>
          <Spacer mb={1} />
          <SelectionTable
            items={Measurements.topSizes}
            onTap={(_, index) =>
              // Recreate a new array reference so that the component reloads
              setTopSizeIndices([
                ...(topSizeIndices.includes(index)
                  ? topSizeIndices.filter((i) => i !== index)
                  : topSizeIndices.concat([index])),
              ])
            }
            selectedItemIndices={topSizeIndices}
          />

          <Spacer mb={5} />

          <Sans color="black100" size="3">
            Your preferred waist size?
          </Sans>
          <Spacer mb={1} />
          <SelectionTable
            items={Measurements.waistSizes}
            onTap={(_, index) =>
              // Recreate a new array reference so that the component reloads
              setWaistSizeIndices([
                ...(waistSizeIndices.includes(index)
                  ? waistSizeIndices.filter((i) => i !== index)
                  : waistSizeIndices.concat([index])),
              ])
            }
            selectedItemIndices={waistSizeIndices}
          />
        </Box>
        <Box height={footerBoxHeight} />
      </ScrollView>

      <Spacer mb={2} />
      <Flex p={2} flexDirection="row">
        {useEditingLayout && (
          <>
            <Flex flex={1}>
              <Button block onPress={onRequestBack} variant="primaryWhite">
                Cancel
              </Button>
            </Flex>
            <Spacer mr={1} />
          </>
        )}
        <Flex flex={1}>
          <Button
            block
            disabled={!(shoeSize && weight && topSizeIndices.length && waistSizeIndices.length)}
            loading={isMutating}
            onPress={submitMeasurements}
            variant="primaryBlack"
          >
            {useEditingLayout ? "Save" : "Finish"}
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}
