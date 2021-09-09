import React, { useRef } from "react"
import { Col, Grid, Row } from "../Grid"
import { Sans, Spacer, Box, Flex, Link, Media, Display } from "../"
import styled from "styled-components"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import { space } from "helpers"
import { chunk } from "lodash"

const categories = [
  {
    name: "Shirts",
    link: "/browse/shirts+all?page=1",
    image: require("../../public/images/homepage/Category-Shirts-1.jpg"),
  },
  {
    name: "Pants",
    link: "/browse/pants+all?page=1",
    image: require("../../public/images/homepage/Category-Pants.jpg"),
  },
  {
    name: "Jackets",
    link: "/browse/jackets+all?page=1",
    image: require("../../public/images/homepage/Category-Jackets.jpg"),
  },
  {
    name: "Accessories",
    link: "/browse/accessories+all?page=1",
    image: require("../../public/images/homepage/Category-Accessories.jpg"),
  },
  {
    name: "Shorts",
    link: "/browse/shorts+all?page=1",
    image: require("../../public/images/homepage/Category-Shorts.jpg"),
  },
  { name: "Tees", link: "/browse/tees+all?page=1", image: require("../../public/images/homepage/Category-Tees.jpg") },
  {
    name: "Knits",
    link: "/browse/knits+all?page=1",
    image: require("../../public/images/homepage/Category-Knits.jpg"),
  },
  {
    name: "Hoodies &\nSweatshirts",
    link: "/browse/hoodies-and-sweatshirts+all?page=1",
    image: require("../../public/images/homepage/Category-Hoodies.jpg"),
  },
]

const DesktopContent = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 2, 2, 2]} flexDirection="row" justifyContent="space-between">
        <Display size="9">Discover</Display>
        <Link href="/browse">
          <Display size="9" style={{ textDecoration: "underline" }}>
            See all
          </Display>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Row px={[2, 2, 2, 2, 2]}>
        {categories.map((category, index) => {
          return (
            <Col md="3" xs="6" key={index} p={0.5}>
              <Link href={category.link}>
                <CategoryWrapper p={2} image={category.image} height="246px">
                  <TextWrapper p={2}>
                    <Sans size="4" style={{ whiteSpace: "pre" }}>
                      {category.name}
                    </Sans>
                  </TextWrapper>
                </CategoryWrapper>
              </Link>
            </Col>
          )
        })}
      </Row>
    </Grid>
  )
}

const MobileContent = () => {
  const snapList = useRef(null)
  // const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  // const goToSnapItem = useScroll({ ref: snapList })

  const chunkedCategories = chunk(categories, 2)

  return (
    <Box px={2}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Display size="7">Discover</Display>
        <Link href="/browse">
          <Display size="7" style={{ textDecoration: "underline" }}>
            See all
          </Display>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <SnapList direction="horizontal" width="100%" ref={snapList}>
        {chunkedCategories.map((categories, index) => {
          return (
            <SnapItem
              margin={{ left: index === 0 ? "0px" : space(0.5) + "px" }}
              snapAlign="center"
              key={index}
              width="75%"
            >
              <Flex flexDirection="column" width="100%">
                {categories.map((category, index) => (
                  <Link href={category.link} key={index}>
                    <CategoryWrapper p={2} mb={0.5} image={category.image} height="185px">
                      <TextWrapper p={2}>
                        <Sans size="4">{category.name}</Sans>
                      </TextWrapper>
                    </CategoryWrapper>
                  </Link>
                ))}
              </Flex>
            </SnapItem>
          )
        })}
      </SnapList>
    </Box>
  )
}

export const Discover: React.FC = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopContent />
      </Media>
      <Media lessThan="md">
        <MobileContent />
      </Media>
    </>
  )
}

const TextWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
`

const CategoryWrapper = styled(Box)<{ image: string; height: string }>`
  border-radius: 8px;
  position: relative;
  background: url(${(p) => p.image}) no-repeat center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: ${(p) => p.height};
`
