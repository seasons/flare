import React, { useState, useEffect } from "react"
import { Grid, Row, Col } from "../../../components/Grid"
import { Sans, Box, Spacer, Flex } from "../../../components"
import { groupBy, map, sortBy, toPairs } from "lodash"

export const Brands: React.FC<{ brands: string[] }> = ({ brands }) => {
  const [groupedBrands, setGroupedBrands] = useState([])

  const groupBrands = (brands) => {
    const brandPairs = toPairs(
      groupBy(brands, ({ name }) => {
        const char = name.charAt(0)
        if (char.match(/[a-z]/i)) {
          return char
        } else {
          return "#"
        }
      })
    )
    const groupedBrands: any = sortBy(
      map(brandPairs, ([letter, brandsForLetter], index) => ({
        data: brandsForLetter,
        letter: letter.toUpperCase(),
        index,
      })),
      ({ letter }) => letter
    )
    setGroupedBrands(groupedBrands)
  }

  useEffect(() => {
    if (brands?.length) {
      groupBrands(brands)
    }
  }, [brands])

  if (!brands?.length) {
    return null
  }

  return (
    <Grid>
      <Sans size="8">Brand index</Sans>
      <Row>
        {groupedBrands.map((group) => {
          return (
            <Col md="2" xs="4" px={["2", "0"]}>
              <Flex mt={2}>
                <Box>
                  <Sans size="5">{group.letter}</Sans>
                  <Spacer mb={1} />
                  {group.data.map((brand) => (
                    <Sans size="4" color="black50" style={{ maxWidth: "95%" }}>
                      {brand.name}
                    </Sans>
                  ))}
                </Box>
              </Flex>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}
