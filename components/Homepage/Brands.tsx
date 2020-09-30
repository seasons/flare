import React, { useState, useEffect } from "react"
import { Grid, Row, Col } from "../Grid"
import { Sans, Box, Spacer, Flex } from "../"
import { groupBy, map, sortBy, toPairs } from "lodash"

export const BRAND_LIST = [
  "acne-studios",
  "aime-leon-dore",
  "amiri",
  "auralee",
  "brain-dead",
  "bode",
  "burberry",
  "casablanca",
  "cav-empt",
  "comme-des-garcons",
  "cactus-plant-flea-market",
  "craig-green",
  "deveaux",
  "dries-van-noten",
  "fear-of-god",
  "gucci",
  "heron-preston",
  "jacquemus",
  "john-elliott",
  "judy-turner",
  "junya-watanabe",
  "keenkee",
  "landlord",
  "mammut",
  "margaret-howell",
  "martine-rose",
  "moncler",
  "nanushka",
  "noah",
  "north-face",
  "off-white",
  "our-legacy",
  "palm-angels",
  "phipps",
  "prada",
  "rhude",
  "sacai",
  "stone-island",
  "stussy",
  "whales-bonner",
  "woolrich",
  "yeezy",
]

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
    <Grid px={[1, 1, 1, 4, 4]}>
      <Box px={1}>
        <Sans size="11">Brand index</Sans>
      </Box>
      <Spacer mb={3} />
      <Row>
        {groupedBrands.map((group) => {
          return (
            <Col lg="2" md="3" sm="6" xs="6" px={1} key={group.letter}>
              <Flex mt={2}>
                <Box>
                  <Sans size="5">{group.letter}</Sans>
                  <Spacer mb={1} />
                  {group.data.map((brand) => (
                    <Sans size="4" color="black50" key={brand.name}>
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
