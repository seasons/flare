import React, { useState, useEffect } from "react"
import { Grid, Row, Col } from "../../../components/Grid"
import { Sans, Box, Spacer, Flex } from "../../../components"
import { groupBy, map, sortBy, toPairs } from "lodash"

const includedBrands = [
  "acne-studios",
  "aime-leon-dore",
  "amiri",
  "brain-dead",
  "barbour",
  "bode",
  "burberry",
  "cav-empt",
  "comme-des-garcons",
  "cactus-plant-flea-market",
  "craig-green",
  "deveaux",
  "dries-van-noten",
  "fear-of-god",
  "gucci",
  "heron-preston",
  "jil-sander",
  "john-elliott",
  "junya-watanabe",
  "kanye-west",
  "kenzo",
  "landlord",
  "mammut",
  "margaret-howell",
  "martine-rose",
  "moncler",
  "nike",
  "noah",
  "north-face",
  "off-white",
  "our-legacy",
  "palm-angels",
  "prada",
  "rhude",
  "sacai",
  "saturdays-nyc",
  "stone-island",
  "stussy",
  "woolrich",
  "y-3",
  "yeezy",
]

export const Brands: React.FC<{ brands: string[] }> = ({ brands }) => {
  const [groupedBrands, setGroupedBrands] = useState([])

  const filterBrands = (brands) => {
    const filteredBrands = brands.filter((brand) => {
      return includedBrands.includes(brand.slug)
    })
    return filteredBrands
  }

  const groupBrands = (brands) => {
    const filtered = filterBrands(brands)

    const brandPairs = toPairs(
      groupBy(filtered, ({ name }) => {
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
      <Box px={[2, 0]} mx={0.5}>
        <Sans size="6">Brand index</Sans>
      </Box>
      <Row>
        {groupedBrands.map((group) => {
          return (
            <Col md="2" xs="4" px={[2, 0.5]} key={group.letter}>
              <Flex mt={2}>
                <Box>
                  <Sans size="5">{group.letter}</Sans>
                  <Spacer mb={1} />
                  {group.data.map((brand) => (
                    <Sans size="4" color="black50" style={{ maxWidth: "95%" }} key={brand.name}>
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
