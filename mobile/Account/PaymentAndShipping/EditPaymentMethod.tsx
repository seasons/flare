import { Box, Button, Container, FixedBackArrow, Flex, Sans, Spacer, TextInput } from "components"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { space } from "helpers/space"
import React, { useState } from "react"
import { FlatList, KeyboardAvoidingView } from "react-native"
import styled from "styled-components"
import { Schema, screenTrack, useTracking, identify } from "utils/analytics"

import { useMutation, useQuery } from "@apollo/client"
import { Radio } from "@material-ui/core"

export const EditPaymentMethod: React.FC<{
  navigation: any
  route: any
}> = screenTrack()(({ navigation, route }) => {
  const { openDrawer } = useDrawerContext()
  const goBack = () => {
    openDrawer("paymentAndShipping")
  }
  return (
    <>
      <Container insetsBottom={false}>
        <FixedBackArrow navigation={navigation} variant="whiteBackground" onPress={goBack} />
        <Box px={2}>
          <FlatList
            data={[]}
            ListHeaderComponent={() => (
              <Box pt={4}>
                <Spacer mb={80} />
                <Sans size="6">Edit Payment Method</Sans>
                <Spacer mb={4} />
              </Box>
            )}
            // ItemSeparatorComponent={() => <Spacer mb={6} />}
            // keyExtractor={(item, index) => item + String(index)}
            renderItem={() => <></>}
            // ListFooterComponent={() => <Spacer mb={2} />}
            // showsVerticalScrollIndicator={false}
          />
        </Box>
      </Container>
    </>
  )
})
