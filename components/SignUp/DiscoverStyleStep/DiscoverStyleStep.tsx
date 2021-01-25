import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Flex, MaxWidth } from "components"
import { Picture } from "components/Picture"
import React, { useState } from "react"
import Slider from "react-slick"
import styled from "styled-components"

import { Box, Button, color, Sans, Spacer } from "@seasons/eclipse"

const streetwear = require("public/images/signup/streetwear.jpeg")
const statement = require("public/images/signup/statement.jpeg")
const casual = require("public/images/signup/casual.jpeg")

export const DiscoverStyleStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const styleNames = ["Streetwear", "Statement", "Casual", "Athletic", "Everyday", "Warmth", "Party", "Layering"]
  const styleImages = [streetwear, statement, casual]

  const [stylesSelected, setStylesSelected] = useState({})

  const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: 60,
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    initialSlide: 1,
  }

  return (
    <MaxWidth>
      <Flex flexDirection="row">
        <CarouselContainer>
          <Slider {...sliderSettings}>
            {styleImages.map((styleImage) => (
              <div key={styleImage}>
                <FullPicture key={styleImage} src={styleImage} size="large" style={{ width: "50%", height: "50%" }} />
              </div>
            ))}
          </Slider>
        </CarouselContainer>
        <Wrapper>
          <Flex flexDirection="column" pl={6}>
            <Sans color="black100" size="10">
              Let’s discover your style
            </Sans>

            <Sans size="4" color="black50">
              Select the styles that best describe what you’re looking to wear with us:
            </Sans>
            <Spacer mb={4} />

            <ButtonContainer py={2}>
              {styleNames.map((styleName) => {
                return (
                  <Box key={styleName} mr={2} mt={2}>
                    <Button
                      size="medium"
                      variant={stylesSelected[styleName] ? "primaryBlack" : "primaryWhite"}
                      width="120px"
                      height="56px"
                      onClick={() => {
                        const value = !!stylesSelected[styleName]

                        setStylesSelected({
                          ...stylesSelected,
                          [styleName]: !value,
                        })
                      }}
                    >
                      {styleName}
                    </Button>
                  </Box>
                )
              })}
            </ButtonContainer>
            <Spacer mb={4} />
            <Sans size="5" color="black100">
              Personalize your membership
            </Sans>
            <Sans size="5" color="black50">
              Help us get to know you so we can recommend personlized styles, brands and outfits as you use the service.
            </Sans>
            <Spacer mb={6} />
            <Sans size="5" color="black100">
              Update these anytime
            </Sans>
            <Sans size="5" color="black50">
              We know your styles change over time. You can update these preferences at anytime from your profile
              settings.
            </Sans>
          </Flex>
        </Wrapper>
      </Flex>
    </MaxWidth>
  )
}

const Wrapper = styled("div")`
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex: 1;
  height: 100%;
  max-width: 600px;
`

const CarouselContainer = styled(Box)`
  background: ${color("black10")};
  width: 560px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .slick-list {
    height: 100%;
    padding: 0 60px;
  }
`

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const FullPicture = styled(Picture)`
  width: 50%;
  height: 50%;
`
