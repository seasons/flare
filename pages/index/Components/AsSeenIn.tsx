import React from "react"
import { Flex, Sans, Box, Spacer } from "../../../components"
import { Media } from "../../../components/Responsive"
import { Grid } from "../../../components/Grid"

const vogueLogo = require("../../../public/images/homepage/Vogue.png")
const nytLogo = require("../../../public/images/homepage/NYT.png")
const wwdLogo = require("../../../public/images/homepage/WWD.png")
const glossyLogo = require("../../../public/images/homepage/Glossy.png")
const leanluxeLogo = require("../../../public/images/homepage/Leanluxe.png")

const desktopIcons = [
  { iconHref: vogueLogo },
  { iconHref: nytLogo },
  { iconHref: wwdLogo },
  { iconHref: glossyLogo },
  { iconHref: leanluxeLogo },
]

const mobileIcons = [{ iconHref: wwdLogo }, { iconHref: vogueLogo }, { iconHref: nytLogo }, { iconHref: glossyLogo }]

export const AsSeenIn: React.FC = () => {
  return (
    <Grid>
      <Box px={[2, 0]}>
        <Media greaterThanOrEqual="md">
          <Flex style={{ width: "100%" }} justifyContent="center">
            <Flex justifyContent="space-between" alignItems="center" style={{ width: "100%" }} p={0.5}>
              <Sans color="black50" size="5">
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
