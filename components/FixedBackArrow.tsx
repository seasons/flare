import { BackArrowIcon } from "components/Icons"
import { themeProps } from "lib/theme"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components"

import { Box } from "./Box"
import { Flex } from "./Flex"

type FixedBackArrowVariant = "blackBackground" | "whiteBackground" | "productBackground"

export const FixedBackArrow: React.FC<{
  navigation: any
  variant?: FixedBackArrowVariant
  onPress?: () => void
}> = ({ navigation, variant, onPress }) => {
  const getColorsForVariant = (variant: FixedBackArrowVariant) => {
    const {
      colors: { black100, white100, black10, productBackgroundColor },
    } = themeProps

    switch (variant) {
      case "blackBackground":
        return {
          backgroundColor: black100,
          arrowColor: white100,
        }
      case "whiteBackground":
        return {
          backgroundColor: white100,
          arrowColor: black100,
        }
      case "productBackground":
        return {
          backgroundColor: productBackgroundColor,
          arrowColor: black100,
        }
      default:
        return {
          backgroundColor: black10,
          arrowColor: black100,
        }
    }
  }

  const variantColors = getColorsForVariant(variant)

  return (
    <Wrapper>
      <TouchableOpacity onPress={!!onPress ? onPress : () => navigation.goBack()}>
        <ArrowWrapper backgroundColor={variantColors.backgroundColor}>
          <Arrow color={variantColors.arrowColor} />
        </ArrowWrapper>
      </TouchableOpacity>
    </Wrapper>
  )
}

const Arrow = styled(BackArrowIcon)`
  left: 4;
`

const Wrapper = styled(Box)`
  position: absolute;
  top: 40px;
  left: 7px;
  z-index: 2000;
`

const ArrowWrapper = styled(Flex)<{ backgroundColor: string }>`
  flex-direction: row;
  background-color: ${(p) => p.backgroundColor};
  border-radius: 100px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`
