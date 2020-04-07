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
      <Flex flexDirection="row" justifyContent={!!title ? "space-between" : "flex-end"}>
        {title && <Sans size="8">{title}</Sans>}
        <Link href="/browse">
          <Sans size="8">See all</Sans>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Row>
        {products.map((product, index) => (
          <Col md="3" xs="12" mx={["2", "0"]}>
            <ProductGridItem product={product} />
          </Col>
        ))}
      </Row>
    </Grid>
  )
}
