import React from "react"
import { Box, Sans, Spacer } from "../"
import { Grid, Row, Col } from "../Grid"

type ColumnListItems = { title: string; text: string }[]

export const ColumnList: React.FC<{ items: ColumnListItems; title?: string }> = ({ items, title }) => {
  return (
    <Grid>
      <Box px={2} pb={2}>
        {title && <Sans size="6">{title}</Sans>}
      </Box>
      <Row>
        {items.map((step, index) => (
          <Col md="4" xs="12" px={2} key={index}>
            {index > 0 && <Spacer mb={[3, 0]} />}
            <Sans size="4" style={{ maxWidth: "80%" }}>
              {`${index + 1}. ${step.title}`}
            </Sans>
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
