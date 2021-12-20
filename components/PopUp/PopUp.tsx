import { Box, Button, Flex, Sans, Separator, Spacer, Theme } from "components"
import { usePopUpContext } from "components/PopUp/PopUpContext"
import { color, space } from "helpers"
import React from "react"
import styled from "styled-components"

import { Paper, Slide } from "@material-ui/core"

const twoButtonWidth = 180 - (space(2) + space(0.5))

export const PopUp: React.FC = () => {
  const { popUpState, hidePopUp } = usePopUpContext()
  const { data, show } = popUpState

  const colorsForTheme = (theme) => {
    switch (theme) {
      case "dark":
        return {
          backgroundColor: color("grayGreen"),
          primaryText: color("white100"),
          secondaryText: color("lightGreen"),
          separator: color("lightGreen"),
        }
      case "light":
        return {
          backgroundColor: color("white100"),
          primaryText: color("black100"),
          secondaryText: color("black50"),
          separator: "transparent",
        }
    }
  }

  const colors = colorsForTheme(data?.theme ? data.theme : "light")
  const showSecondaryButton = !!data?.secondaryButtonText && !!data?.secondaryButtonOnPress

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Container color={colors?.backgroundColor || color("white100")}>
        <Paper elevation={4}>
          <Box p={2}>
            {!!data?.icon && <Box mt={2}>{data?.icon}</Box>}
            <Spacer mt={2} />
            <Box>
              <Sans size="4" color={colors?.primaryText}>
                {data?.title}
              </Sans>
              {data?.note && (
                <>
                  <Spacer mb={0.5} />
                  <Sans size="3" color={colors?.secondaryText}>
                    {data?.note}
                  </Sans>
                </>
              )}
            </Box>
            <Spacer mb={3} />
            <Separator color={colors?.separator} />
            <Flex flexDirection="row">
              {showSecondaryButton && (
                <>
                  <Button width={twoButtonWidth} variant="primaryWhite" onClick={data?.secondaryButtonOnPress}>
                    {data?.secondaryButtonText}
                  </Button>
                  <Spacer mr={1} />
                </>
              )}
              <Button
                width={showSecondaryButton ? twoButtonWidth : null}
                variant="primaryBlack"
                block={!showSecondaryButton}
                onClick={() => {
                  hidePopUp()
                  data?.onClose?.()
                }}
              >
                {data?.buttonText}
              </Button>
            </Flex>
          </Box>
        </Paper>
      </Container>
    </Slide>
  )
}

const Container = styled(Box)`
  position: fixed;
  width: 320px;
  bottom: 20px;
  left: 20px;
  z-index: 1400;
`
