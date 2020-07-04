import React from "react"
import { Flex, Sans, Box, Spacer, Separator } from ".."
import { Media } from "../Responsive"
import { Grid } from "../Grid"
import { Picture } from "../Picture"

const vogueLogo = require("../../public/images/homepage/Vogue.png")
const nytLogo = require("../../public/images/homepage/NYT.png")
const wwdLogo = require("../../public/images/homepage/WWD.png")
const glossyLogo = require("../../public/images/homepage/Glossy.png")
const leanluxeLogo = require("../../public/images/homepage/Leanluxe.png")

const desktopIcons = [
  { iconHref: vogueLogo, alt: "Vogue logo" },
  { iconHref: nytLogo, alt: "New York Times logo" },
  { iconHref: wwdLogo, alt: "WWD logo" },
  { iconHref: glossyLogo, alt: "Glossy logo" },
  { iconHref: leanluxeLogo, alt: "Lean Luxe logo" },
]

const mobileIcons = [
  { iconHref: vogueLogo, alt: "Vogue logo" },
  { iconHref: nytLogo, alt: "New York Times logo" },
  { iconHref: wwdLogo, alt: "WWD logo" },
  { iconHref: glossyLogo, alt: "Glossy logo" },
]

export const AsSeenIn: React.FC = () => {
  return (
    <Grid>
      <Media greaterThanOrEqual="md">
        <Flex style={{ width: "100%" }} justifyContent="center">
          <Flex justifyContent="space-between" alignItems="center" style={{ width: "100%" }} p={0.5}>
            <Sans color="black50" size="5">
              As seen in
            </Sans>
            {desktopIcons.map((item, index) => {
              return (
                <Box p={1} key={index}>
                  <img style={{ height: "22px" }} src={item.iconHref} alt={item.alt} />
                </Box>
              )
            })}
          </Flex>
        </Flex>
      </Media>
      <Media lessThan="md">
        <Box px={2}>
          <Sans color="black50" size="6">
            As seen in
          </Sans>
        </Box>
        <Spacer mb={2} />
        <Separator />
        <Flex
          flexDirection="column"
          justifyContent="center"
          flexWrap="wrap"
          alignItems="center"
          style={{ width: "100%" }}
        >
          {mobileIcons.map((item, index) => {
            return (
              <Flex width="100%" key={index} justifyContent="center" flexDirection="column">
                <Flex justifyContent="center" my={2}>
                  <img style={{ height: "20px" }} src={item.iconHref} alt={item.alt} />
                </Flex>
                <Separator />
              </Flex>
            )
          })}
        </Flex>
      </Media>
    </Grid>
  )
}
