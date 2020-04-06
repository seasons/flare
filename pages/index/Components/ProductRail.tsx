import React from "react"
import { Sans, Flex } from "../../../components"
import { Grid, Row, Col } from "../../../components/Grid"
import { Link } from "../../../components/Link"
import { ProductGridItem } from "../../../components/Product/ProductGridItem"

export const ProductRail: React.FC<{ products: any; title?: string }> = ({ products, title }) => {
  return (
    <Grid>
      <Flex flexDirection="row" justifyContent={!!title ? "space-between" : "flex-end"}>
        {title && <Sans size="8">{title}</Sans>}
        <Link href="/browse">
          <Sans size="8">See all</Sans>
        </Link>
      </Flex>
      <Row>
        {products.map((product, index) => (
          <Col md="4" xs="12" mx={["2", "0"]}>
            <ProductGridItem product={product} />
          </Col>
        ))}
      </Row>
    </Grid>
  )
}
