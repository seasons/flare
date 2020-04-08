import React from "react"
import { Flex, Sans, Box, Spacer } from "../../../components"
import { Media } from "../../../components/Responsive"
import { Grid } from "../../../components/Grid"

const desktopIcons = [
  { iconHref: require("../../../public/images/homepage/Vogue.png") },
  { iconHref: require("../../../public/images/homepage/NYT.png") },
  { iconHref: require("../../../public/images/homepage/WWD.png") },
  { iconHref: require("../../../public/images/homepage/Glossy.png") },
  { iconHref: require("../../../public/images/homepage/Leanluxe.png") },
]

const mobileIcons = [
  { iconHref: require("../../../public/images/homepage/WWD.png") },
  { iconHref: require("../../../public/images/homepage/Vogue.png") },
  { iconHref: require("../../../public/images/homepage/NYT.png") },
  { iconHref: require("../../../public/images/homepage/Glossy.png") },
]

export const AsSeenIn: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 0]}>
        <Media greaterThanOrEqual="md">
          <Flex style={{ width: "100%" }} justifyContent="center">
            <Flex justifyContent="space-between" alignItems="center" style={{ width: "100%" }} p={0.5}>
              <Sans color="black50" size="6">
                As seen in
              </Sans>
              {desktopIcons.map((item) => {
                return (
                  <Box p={1}>
                    <img src={item.iconHref} style={{ maxHeight: "20px" }} />
                  </Box>
                )
              })}
            </Flex>
          </Flex>
        </Media>
        <Media lessThan="md">
          <Box p={0.5}>
            <Sans color="black50" size="6">
              As seen in
            </Sans>
            <Spacer mb={2} />
            <Flex flexDirection="row" flexWrap="wrap" alignItems="center" style={{ width: "100%" }}>
              {mobileIcons.map((item) => {
                return (
                  <Box mr={2} mb={2}>
                    <img src={item.iconHref} style={{ maxHeight: "20px" }} />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Media>
      </Box>
    </Grid>
  )
}
