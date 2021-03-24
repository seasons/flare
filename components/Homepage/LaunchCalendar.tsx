import React from "react"
import { Flex, Sans, Spacer } from "components"
import gql from "graphql-tag"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import styled from "styled-components"
import { DateTime } from "luxon"

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

const Item = ({ launch }) => {
  const imageURL = launch?.brand?.logo?.url
  return (
    <Col lg="3" md="6" xs="12" px={[2, 0]}>
      <BackgroundImage imageURL={imageURL} />
      <Spacer mb={2} />
      <Sans size="6" style={{ maxWidth: "80%" }}>
        {DateTime.fromISO(launch?.launchAt).toUTC().toFormat("MM/dd")}
      </Sans>
    </Col>
  )
}

export const LaunchCalendar: React.FC<{ launches: any }> = ({ launches }) => {
  if (!launches) {
    return null
  }

  return (
    <Grid>
      <Flex px={[2, 2, 2, 2, 2]} pb={6} flexDirection="row" justifyContent="space-between" alignItems="flex-end">
        <Display size="9" style={{ textAlign: "center" }}>
          Launch calendar
        </Display>
        <Sans size="4" color="black50" style={{ textAlign: "center" }}>
          No commitment, pause or cancel anytime.
        </Sans>
      </Flex>
      <Row>
        {launches.map((launch, index) => (
          <Item launch={launch} key={index} />
        ))}
      </Row>
    </Grid>
  )
}

const BackgroundImage = styled.div<{ imageURL: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: url(${(p) => p.imageURL}) no-repeat center center;
  background-size: cover;
  height: 610px;
`
