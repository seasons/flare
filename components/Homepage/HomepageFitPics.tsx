import React from "react"
import { Sans, Spacer, Flex, MaxWidth, Media } from "../"
import { Display } from "../Typography"
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
      {!!item.author && <Sans size="3">{item.author}</Sans>}
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
        <Flex flexDirection="column" flexWrap="nowrap" justifyContent="space-between" px={[2, 2, 2, 5, 5]} width="100%">
          <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
            <Display size="8" style={{ textAlign: "center" }}>
              How they wear Seasons
            </Display>
            <Spacer mb={1} />
            <Sans size="4" color="black50" style={{ textAlign: "center" }}>
              Members who make this what it is
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
      <Media greaterThan="md">
        <Content platform="desktop" />
      </Media>
      <Media lessThan="lg">
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
`
