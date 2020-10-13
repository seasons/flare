import React from "react"
import { Sans, Flex, Spacer, Box } from "../"
import { Display } from "../Typography"
import { Grid, Row, Col } from "../Grid"
import { Link } from "../Link"
import { ProductGridItem } from "../Product/ProductGridItem"
import styled from "styled-components"

export const ProductRail: React.FC<{ products: any; title?: string }> = ({ products, title }) => {
  if (!products?.length) {
    return null
  }
  return (
    <Grid>
      <Flex flexDirection="row" justifyContent={!!title ? "space-between" : "flex-end"} px={[2, 2, 2, 5, 5]}>
        {title && <Display size="7">{title}</Display>}
        <Link href="/browse">
          <Sans size={["5", "6"]} color="black50" style={{ minWidth: "58px" }}>
            See all
          </Sans>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Box px={[0, 0, 0, 5, 5]}>
        <Row>
          {products.map((product, index) => {
            return (
              <Col md="3" xs="6" sm="6" key={index}>
                <ProductGridItem product={product} />
              </Col>
            )
          })}
        </Row>
      </Box>
    </Grid>
  )
}
