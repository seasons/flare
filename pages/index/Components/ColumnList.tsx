import React from "react"
import { Box, Sans, Spacer } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"

type ColumnListItems = { title: string; text: string }[]

export const ColumnList: React.FC<{ items: ColumnListItems; title?: string }> = ({ items, title }) => {
  return (
    <Grid>
      {title && <Sans size="8">{title}</Sans>}
      <Row>
        {items.map((step, index) => (
          <Col md="4" xs="12" mx={["2", "0"]}>
            <Box mt={8}>
              <Sans size="5" color="black50">{`0${index + 1}.`}</Sans>
              <Spacer mb={2} />
              <Sans size="5" style={{ maxWidth: "80%" }}>
                {step.title}
              </Sans>
              <Spacer mb={1} />
              <Sans size="3" color="black50" style={{ maxWidth: "80%" }}>
                {step.text}
              </Sans>
            </Box>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}
