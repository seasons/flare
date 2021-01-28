import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { ExternalLink, Flex, MaxWidth } from "components"
import { FormFooter } from "components/Forms/FormFooter"
import { LeftArrow } from "components/SVGs/LeftArrow"
import { RightArrow } from "components/SVGs/RightArrow"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useState } from "react"
import Slider from "react-slick"
import styled from "styled-components"

import { gql, useMutation } from "@apollo/client"
import { Box, color, Sans, Spacer } from "@seasons/eclipse"

const avantGarde = require("public/images/signup/AvantGarde.png")
const bold = require("public/images/signup/Bold.png")
const classic = require("public/images/signup/Classic.png")
const minimalist = require("public/images/signup/Minimalist.png")
const streetwear = require("public/images/signup/Streetwear.png")
const techwear = require("public/images/signup/Techwear.png")

const SAVE_STYLES = gql`
  mutation SaveStyles($customerID: ID!, $styles: [CustomerStyle!]!) {
    updateCustomer(data: { detail: { update: { styles: { set: $styles } } } }, where: { id: $customerID }) {
      id
    }
  }
`

export const DiscoverStyleStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const styleNames = ["Avant Garde", "Bold", "Classic", "Minimalist", "Streetwear", "Techwear"]
  const styleImages = [avantGarde, bold, classic, minimalist, streetwear, techwear]
  const [saveStyles] = useMutation(SAVE_STYLES)
  const [stylesSelected, setStylesSelected] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)
  const { userSession } = useAuthContext()

  let slider = null

  const sliderSettings = {
    autoplay: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: 130,
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    initialSlide: 1,
    ref: (s) => (slider = s),
    afterChange: (index) => {
      setActiveIndex(index)
    },
    prevArrow: (
      <ArrowContainer>
        <LeftArrow />
      </ArrowContainer>
    ),
    nextArrow: (
      <ArrowContainer>
        <RightArrow />
      </ArrowContainer>
    ),
  }

  const activeName = styleNames[activeIndex]
  return (
    <MaxWidth>
      <Flex flexDirection="row">
        <CarouselContainer>
          <Slider {...sliderSettings}>
            {styleImages.map((styleImage) => (
              <div key={styleImage}>
                <FullPicture className="picture" backgroundURL={styleImage} />
              </div>
            ))}
          </Slider>
          <Sans size="4" color={!!stylesSelected[activeName] ? "black100" : "black50"} textAlign="center">
            {activeName}
          </Sans>
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
              {styleNames.map((styleName, i) => {
                return (
                  <Box key={styleName} mr={2} mt={2}>
                    <Button
                      onClick={() => {
                        const value = !!stylesSelected[styleName]

                        setStylesSelected({
                          ...stylesSelected,
                          [styleName]: !value,
                        })

                        slider.slickGoTo(i)
                      }}
                      className={stylesSelected[styleName] ? "selected" : "" + (activeIndex === i ? " active" : "")}
                    >
                      <Sans weight={"medium"} size={"4"} style={{ textAlign: "center" }}>
                        {styleName}
                      </Sans>
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
      <FormFooter
        footerText={
          <>
            {"By creating an account, you agree to our "}
            <ExternalLink href="/terms-of-service">Terms of Service</ExternalLink>
            {" and "}
            <ExternalLink href="/privacy-policy">Privacy Policy</ExternalLink>
          </>
        }
        buttonText="Next"
        handleSubmit={() => {
          saveStyles({
            variables: {
              styles: Object.keys(stylesSelected).map((a) => a.replaceAll(" ", "")),
              customerID: userSession?.customer?.id,
            },
          })
        }}
      />
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
  background: #e9e9eb;
  width: 560px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .slick-list {
    height: 100%;
    padding: 0 130px;
    overflow-y: visible;
  }

  .slick-prev {
    left: 110px;
  }

  .slick-next {
    right: 110px;
  }

  .slick-prev:before,
  .slick-next:before {
    content: "";
    color: black;
    z-index: 999;
  }

  .center .slick-center .picture {
    opacity: 1;
    transform: scale(1);
  }
  .center .picture {
    opacity: 0.6;
    transform: scale(0.8);
    transition: all 0.3s ease;
  }
`

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 450px;
`

const ArrowContainer = styled(Box)`
  z-index: 999;
`

const Button = styled.button<{}>`
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  border-radius: 4px;
  border-style: solid;
  border-color: #e5e5e5;
  background: white;
  width: 120px;
  height: 56px;

  &.loading {
    transition: none;
    background-color: transparent;
    color: transparent;
    border: 0;
    cursor: auto;
  }

  &.block {
    width: 100%;
  }

  &.active {
    border-color: ${color("black100")};
  }

  &.selected {
    border-color: black;
    background-color: black;
    color: white;
  }
`

const FullPicture = styled.div<{ backgroundURL: string }>`
  background: url(${(p) => p.backgroundURL}) no-repeat center center;
  background-size: contain;
  width: 292.5px;
  height: 650px;
  margin: 0 auto;
`
