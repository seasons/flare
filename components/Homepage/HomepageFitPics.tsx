import React from "react"
import { Sans, Spacer, Flex, MaxWidth } from "../"
import { Display } from "../Typography"
import styled from "styled-components"

const ImageItem = ({ item }) => {
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
  return (
    <Flex flexDirection="column" justifyContent="center" p="2px" style={{ flex: 5 }}>
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
  return (
    <MaxWidth>
      <Flex flexDirection="column" flexWrap="nowrap" justifyContent="space-between" px={[2, 2, 2, 5, 5]} width="100%">
        <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
          <Display size="8">How they wear Seasons</Display>
          <Spacer mb={1} />
          <Sans size="4" color="black50">
            Members who make this what it is
          </Sans>
          <Spacer mb={6} />
        </Flex>
        <Flex flexDirection="row" flexWrap="nowrap" justifyContent="center" width="100%">
          {fitPics?.map((fp, index) => {
            return <ImageItem item={fp} key={index} />
          })}
        </Flex>
      </Flex>
    </MaxWidth>
  )
}

const BackgroundImage = styled.div<{ image: string }>`
  background: url(${(p) => p.image}) no-repeat center center;
  background-size: cover;
  height: 0;
  width: 100%;
  padding-bottom: calc(100% * 1.25);
`
