import React from "react"
import { Sans, Spacer, Flex, MaxWidth, Media, Display } from "components"
import styled from "styled-components"
import { space } from "helpers"

const ImageItem = ({ item, isDesktop }) => {
  const imageSRC = item?.image?.url
  let location
  const city = item?.location?.city
  const state = item?.location?.state
  if (!!city && !!state) {
    location = `${city}, ${state}`
  } else if (!!city) {
    location = city
  } else if (!!state) {
    location = state
  }
  let styles
  if (isDesktop) {
    styles = { flex: 5 }
  } else {
    styles = { width: "50%", paddingTop: space(2) + "px" }
  }

  return (
    <Flex flexDirection="column" justifyContent="center" p="2px" style={styles}>
      <BackgroundImage image={imageSRC} />
      <Spacer mb={1} />
      {!!location && (
        <Sans size="3" color="black50">
          {location}
        </Sans>
      )}
    </Flex>
  )
}

export const HomepageFitPics: React.FC<{ fitPics: any }> = ({ fitPics }) => {
  const Content = ({ platform }) => {
    const isDesktop = platform === "desktop"
    const items = isDesktop ? fitPics : fitPics.slice(0, 4)
    return (
      <MaxWidth>
        <Flex flexDirection="column" flexWrap="nowrap" justifyContent="space-between" px={[0, 0, 2, 2, 2]} width="100%">
          <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
            <Display size={["7", "9"]} style={{ textAlign: "center" }} px={2}>
              What members are wearing
            </Display>
            <Spacer mb={1} />
            <Sans size={["3", "4"]} color="black50" style={{ textAlign: "center" }}>
              From Brooklyn to LA and SF to Chicago
            </Sans>
            <Spacer mb={6} />
          </Flex>
          <Flex flexDirection="row" flexWrap={isDesktop ? "nowrap" : "wrap"} justifyContent="center" width="100%">
            {items?.map((fp, index) => {
              return <ImageItem item={fp} key={index} isDesktop={isDesktop} />
            })}
          </Flex>
        </Flex>
      </MaxWidth>
    )
  }

  return (
    <>
      <Media greaterThan="sm">
        <Content platform="desktop" />
      </Media>
      <Media lessThan="md">
        <Content platform="mobile" />
      </Media>
    </>
  )
}

const BackgroundImage = styled.div<{ image: string }>`
  background: url(${(p) => p.image}) no-repeat center center;
  background-size: cover;
  height: 0;
  width: 100%;
  padding-bottom: calc(100% * 1.25);
  border-radius: 8px;
`
