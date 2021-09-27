import { Box, Picture } from "components"
import { Grid, Row, Col } from "components/Grid"
import { color } from "helpers"
import React from "react"
import styled from "styled-components"

export const SignupStyles: React.FC<{
  products: any
  selectedProductsIDs: string[]
  setSelectedProductsIDs: (p: any) => void
}> = ({ products, selectedProductsIDs, setSelectedProductsIDs }) => {
  return (
    <Grid>
      <Row>
        {products?.map((product, index) => {
          const image = product.images[0].url
          const id = product.id
          const selected = selectedProductsIDs.includes(product.id)
          return (
            <Col xs="6" md="4" key={index}>
              <ItemWrapper
                selected={selected}
                onClick={() => {
                  setSelectedProductsIDs([
                    ...(selected ? selectedProductsIDs.filter((i) => i !== id) : selectedProductsIDs.concat([id])),
                  ])
                }}
              >
                <Picture src={image} />
              </ItemWrapper>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}

const ItemWrapper = styled(Box)<{ selected: boolean }>`
  border: 4px solid ${(p) => (p.selected ? color("black100") : color("white100"))};
  background-color: red;
`
