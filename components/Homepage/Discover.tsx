import React from "react"
import { Col, Grid, Row } from "../Grid"
import { Sans, Spacer, Box, Flex, Link } from "../"
import { Header } from "../Typography"
import styled from "styled-components"

const categories = [
  {
    name: "Shirts",
    link: "/browse/shirts+all?page=1",
    image: require("../../public/images/homepage/Category-Shirts.jpg"),
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
    name: "Hoodies & Sweatshirts",
    link: "/browse/hoodies-and-sweatshirts+all?page=1",
    image: require("../../public/images/homepage/Category-Hoodies.jpg"),
  },
]

export const Discover = () => {
  return (
    <Grid>
      <Flex px={[2, 2, 2, 2, 2]} flexDirection="row" justifyContent="space-between">
        <Header size="9">Discover</Header>
        <Link href="/browse">
          <Header size="9" style={{ textDecoration: "underline" }}>
            See all
          </Header>
        </Link>
      </Flex>
      <Spacer mb={2} />
      <Row px={[2, 2, 2, 2, 2]}>
        {categories.map((category, index) => {
          return (
            <Col md="3" xs="6" key={index} p={0.5}>
              <Link href={category.link}>
                <CategoryWrapper p={2} image={category.image}>
                  <TextWrapper p={2}>
                    <Sans size="4">{category.name}</Sans>
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

const TextWrapper = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
`

const CategoryWrapper = styled(Box)<{ image: string }>`
  border-radius: 8px;
  position: relative;
  background: url(${(p) => p.image}) no-repeat center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 246px;
`
