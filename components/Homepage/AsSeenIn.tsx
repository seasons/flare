import React from "react"
import { Flex, Sans, Box, Spacer } from ".."
import { Media } from "../Responsive"
import { Grid } from "../Grid"
import { FLARE_IMGIX_BASE } from "../../helpers/constants"
import { Picture } from "../Picture"
import { imageResize } from "../../utils/imageResize"

const vogueLogo = `${FLARE_IMGIX_BASE}/Vogue.png`
const nytLogo = `${FLARE_IMGIX_BASE}/NYT.png`
const wwdLogo = `${FLARE_IMGIX_BASE}/WWD.png`
const glossyLogo = `${FLARE_IMGIX_BASE}/Glossy.png`
const leanluxeLogo = `${FLARE_IMGIX_BASE}/Leanluxe.png`

const desktopIcons = [
  { iconHref: vogueLogo, alt: "Vogue logo" },
  { iconHref: nytLogo, alt: "New York Times logo" },
  { iconHref: wwdLogo, alt: "WWD logo" },
  { iconHref: glossyLogo, alt: "Glossy logo" },
  { iconHref: leanluxeLogo, alt: "Lean Luxe logo" },
]

const mobileIcons = [
  { iconHref: wwdLogo, alt: "WWD logo" },
  { iconHref: vogueLogo, alt: "Vogue logo" },
  { iconHref: nytLogo, alt: "New York Times logo" },
  { iconHref: glossyLogo, alt: "Glossy logo" },
]

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
              {desktopIcons.map((item, index) => {
                return (
                  <Box p={1} key={index}>
                    <Picture
                      webpSrc={item.iconHref + "?h=22&fit=clip&fm=webp"}
                      jpgSrc={item.iconHref + "?h=22&fit=clip&fm=jpg"}
                      alt={item.alt}
                    />
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
              {mobileIcons.map((item, index) => {
                return (
                  <Box mr="20px" mb={3} key={index}>
                    <Picture
                      webpSrc={item.iconHref + "?h=20&fit=clip&fm=webp"}
                      jpgSrc={item.iconHref + "?h=20&fit=clip&fm=jpg"}
                      alt={item.alt}
                    />
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
