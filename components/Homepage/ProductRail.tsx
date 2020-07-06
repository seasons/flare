import React from "react"
import { Sans, Flex, Spacer, Box } from "../"
import { Grid, Row, Col } from "../Grid"
import { Link } from "../Link"
import { ProductGridItem } from "../Product/ProductGridItem"

export const ProductRail: React.FC<{ products: any; title?: string }> = ({ products, title }) => {
  if (!products?.length) {
    return null
  }
  return (
    <Grid>
      <Flex flexDirection="row" justifyContent={!!title ? "space-between" : "flex-end"} px={["2", "0"]} mx={0.5}>
        {title && <Sans size={["5", "6"]}>{title}</Sans>}
        <Link href="/browse">
          <Sans size={["5", "6"]} color="black50">
            See all
          </Sans>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Box px={[2, 0]}>
        <Row>
          {products.map((product, index) => {
            return (
              <Col md="3" xs="6" key={index}>
                <ProductGridItem product={product} />
              </Col>
            )
          })}
        </Row>
      </Box>
    </Grid>
  )
}
