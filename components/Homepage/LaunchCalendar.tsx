import React from "react"
import { Box, Flex, Media, Sans, Spacer } from "components"
import gql from "graphql-tag"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import styled from "styled-components"
import { DateTime } from "luxon"

export const LaunchCalendarFragment_Query = gql`
  fragment LaunchCalendarFragment_Query on Query {
    launches(where: { published: true }, first: 8, orderBy: launchAt_ASC, upcoming: true) {
      id
      launchAt
      brand {
        id
        logoImage {
          id
          url
        }
      }
      collection {
        id
        title
      }
    }
  }
`

const Item = ({ launch, index, breakpoint }) => {
  const imageURL = launch?.brand?.logoImage?.url

  let breakpointStyles

  if (breakpoint === "large") {
    breakpointStyles = {
      borderTop: index < 4 ? "1px solid black" : "none",
      borderLeft: index === 0 || index % 4 === 0 ? "1px solid black" : "none",
    }
  } else if (breakpoint === "medium") {
    breakpointStyles = {
      borderTop: index < 2 ? "1px solid black" : "none",
      borderLeft: index === 0 || index % 2 === 0 ? "1px solid black" : "none",
    }
  } else {
    breakpointStyles = {
      borderTop: index === 0 ? "1px solid black" : "none",
      borderLeft: "1px solid black",
    }
  }

  return (
    <Col lg="3" md="6" xs="12">
      <ItemContainer index={index}>
        <LaunchContentWrapper
          p={["70px", "70px", "70px", "40px", "80px"]}
          height="100%"
          width="100%"
          breakpointStyles={breakpointStyles}
        >
          {imageURL ? (
            <BackgroundImage imageURL={imageURL} />
          ) : (
            <Sans size={["6", "6", "5"]} style={{ textAlign: "center", textTransform: "uppercase" }}>
              {launch.collection?.title}
            </Sans>
          )}
        </LaunchContentWrapper>
        <DateTextWrapper py={1} breakpointStyles={breakpointStyles}>
          <Display size="4" style={{ textAlign: "center" }}>
            {DateTime.fromISO(launch?.launchAt).toUTC().toFormat("LLLL d")}
          </Display>
        </DateTextWrapper>
      </ItemContainer>
    </Col>
  )
}

const getSeasonString = () => {
  const now = DateTime.local()
  const nowMonth = now.month
  let year
  let season
  if (nowMonth < 2) {
    year = now.year
    season = "Fall / Winter"
  } else if (nowMonth > 7) {
    year = now.year + 1
    season = "Fall / Winter"
  } else {
    year = now.year
    season = "Spring / Summer"
  }

  return `${season} ${year}`
}

export const LaunchCalendar: React.FC<{ launches: any }> = ({ launches }) => {
  if (!launches) {
    return null
  }

  const filteredLaunched = launches.filter((l) => {
    return l.brand?.logoImage?.url || l.collection?.title
  })

  const Content = ({ breakpoint }) => {
    let slice
    if (breakpoint === "small") {
      slice = 2
    } else if (breakpoint === "medium") {
      slice = 4
    } else {
      slice = 8
    }

    const sliceLaunches = filteredLaunched.slice(0, slice)

    return (
      <Grid>
        <Flex px={[2, 2, 2, 2, 2]} pb={2} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
          <Display size="9" style={{ textAlign: "left" }}>
            Launch calendar
          </Display>
          <Sans size="4" color="black50" style={{ textAlign: "right" }}>
            {getSeasonString()}
          </Sans>
        </Flex>
        <Row px={[2, 2, 2, 2, 2]}>
          {sliceLaunches.map((launch, index) => (
            <Item launch={launch} key={index} index={index} breakpoint={breakpoint} />
          ))}
        </Row>
      </Grid>
    )
  }

  return (
    <>
      <Media greaterThan="md">
        <Content breakpoint="large" />
      </Media>
      <Media at="md">
        <Content breakpoint="medium" />
      </Media>
      <Media lessThan="md">
        <Content breakpoint="small" />
      </Media>
    </>
  )
}

const BackgroundImage = styled.div<{ imageURL: string }>`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: url(${(p) => p.imageURL}) no-repeat center center;
  background-size: contain;
`

const ItemContainer = styled(Box)<{ index: number }>`
  width: 100%;
  position: relative;
`

const DateTextWrapper = styled(Box)<{ breakpointStyles: any }>`
  position: relative;
  width: 100%;
  border-top: 1px solid black;
  border-left: ${(p) => p.breakpointStyles.borderLeft};
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`

const LaunchContentWrapper = styled(Box)<{ breakpointStyles: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 250px;
  width: 100%;
  border-top: ${(p) => p.breakpointStyles.borderTop};
  border-left: ${(p) => p.breakpointStyles.borderLeft};
  border-right: 1px solid black;
`
