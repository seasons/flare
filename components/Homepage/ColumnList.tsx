import React from "react"
import { Box, Sans, Spacer } from "../"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"

type ColumnListItems = { title: string; text: string }[]

export const ColumnList: React.FC<{ items: ColumnListItems; title?: string }> = ({ items, title }) => {
  return (
    <Grid>
      {title && (
        <Box px={[2, 2, 2, 5, 5]} pb={4}>
          <Sans size="11">{title}</Sans>
        </Box>
      )}
      <Row px={[2, 2, 2, 5, 5]}>
        {items.map((step, index) => (
          <Col md="4" xs="12" key={index}>
            {index > 0 && <Spacer mb={[5, 5, 0, 0, 0]} />}
            <Sans size="4" color="black50">{`0${index + 1}`}</Sans>
            <Spacer mb={1} />
            <Display size="4">{step.title}</Display>
            <Spacer mb={1} />
            <Sans size="4" color="black50" style={{ maxWidth: "80%" }}>
              {step.text}
            </Sans>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}
