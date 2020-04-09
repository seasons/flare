import React from "react"
import { Sans, Flex, Spacer } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"
import { Link } from "../../../components/Link"
import { ProductGridItem } from "../../../components/Product/ProductGridItem"

export const ProductRail: React.FC<{ products: any; title?: string }> = ({ products, title }) => {
  if (!products) {
    return null
  }
  return (
    <Grid>
      <Flex flexDirection="row" justifyContent={!!title ? "space-between" : "flex-end"} px={["2", "0"]} mx={0.5}>
        {title && <Sans size="6">{title}</Sans>}
        <Link href="/browse">
          <Sans size="6">See all</Sans>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Row>
        {products.map((product, index) => {
          return (
            <Col md="3" xs="12" pl={[2, 0]} pr={[2, 0]} key={index}>
              <ProductGridItem product={product} />
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}
