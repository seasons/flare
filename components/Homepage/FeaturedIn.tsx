import React from "react"
import styled from "styled-components"
import { Box, Sans, Flex, MaxWidth, Media, Spacer } from "components"

const bi = require("../../public/images/homepage/BusinessInsider.png")
const nyt = require("../../public/images/homepage/NYT.png")
const vogue = require("../../public/images/homepage/Vogue.png")
const wsj = require("../../public/images/homepage/WSJ.png")
const wwd = require("../../public/images/homepage/WWD.png")

export const FeaturedIn: React.FC = () => {
  const items = [
    {
      logo: bi,
      link: "https://www.businessinsider.com/seasons-menswear-rental-app-alexis-ohanian-nas-menswear-platform-2021-1",
    },
    { logo: nyt, link: "https://www.nytimes.com/2020/01/08/style/men-rent-rental-clothing.html" },
    { logo: vogue, link: "https://www.vogue.com/article/seasons-menswear-fashion-rental-expansion" },
    { logo: wsj, link: "https://www.wsj.com/articles/can-a-rent-the-runway-model-work-for-men-11601912046" },
    {
      logo: wwd,
      link:
        "https://wwd.com/menswear-news/mens-retail-business/what-to-watch-mens-rental-services-begin-to-emerge-1203409178/",
    },
  ]

  const mobileItems = [
    { logo: vogue, link: "https://www.vogue.com/article/seasons-menswear-fashion-rental-expansion" },
    { logo: nyt, link: "https://www.nytimes.com/2020/01/08/style/men-rent-rental-clothing.html" },
    {
      logo: wwd,
      link:
        "https://wwd.com/menswear-news/mens-retail-business/what-to-watch-mens-rental-services-begin-to-emerge-1203409178/",
    },
  ]

  return (
    <MaxWidth>
      <Box width="100%" pb={2} px={2}>
        <Flex
          style={{ width: "100%" }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Flex pr={1} flexDirection="row" justifyContent="flex-end" alignItems="center" py={3}>
            <Sans size="4" color="black50">
              Featured in
            </Sans>
          </Flex>
          {items.map((item, index) => {
            return (
              <StyledAnchor href={item.link} target="_blank" key={item.link}>
                <Box pr={2} py={3}>
                  <Image src={item.logo} />
                </Box>
              </StyledAnchor>
            )
          })}
        </Flex>
      </Box>
    </MaxWidth>
  )
}

const StyledAnchor = styled.a`
  text-decoration: none;
`

const Image = styled.img`
  height: 22px;
`

const MobileImage = styled.img`
  height: 20px;
`
