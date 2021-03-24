import React from "react"
import { Box, Flex, Media, Sans, Spacer } from "components"
import gql from "graphql-tag"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import styled from "styled-components"
import { DateTime } from "luxon"
import { Separator } from "@seasons/eclipse"

export const LaunchCalendarFragment_Query = gql`
  fragment LaunchCalendarFragment_Query on Query {
    launches(where: { published: true }) {
      id
      launchAt
      brand {
        id
        logo {
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
  const imageURL = launch?.brand?.logo?.url

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
        <LaunchContentWrapper p={["100px", "100px", 10]} height="100%" width="100%" breakpointStyles={breakpointStyles}>
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

export const LaunchCalendar: React.FC<{ launches: any }> = ({ launches }) => {
  if (!launches) {
    return null
  }

  const filteredLaunched = launches.filter((l) => {
    return l.brand?.logo?.url || l.collection?.title
  })

  const Content = ({ breakpoint }) => (
    <Grid>
      <Flex px={[2, 2, 2, 2, 2]} pb={6} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
        <Display size="9" style={{ textAlign: "center" }}>
          Launch calendar
        </Display>
        <Sans size="4" color="black50" style={{ textAlign: "center" }}>
          Sprint / Summer 2021
        </Sans>
      </Flex>
      <Row px={[2, 2, 2, 2, 2]}>
        {filteredLaunched.map((launch, index) => (
          <Item launch={launch} key={index} index={index} breakpoint={breakpoint} />
        ))}
      </Row>
    </Grid>
  )

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
