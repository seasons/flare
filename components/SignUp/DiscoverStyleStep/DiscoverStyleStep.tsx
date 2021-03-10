import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { ExternalLink, Flex, MaxWidth, Media } from "components"
import { FormFooter } from "components/Forms/FormFooter"
import { LeftArrow } from "components/SVGs/LeftArrow"
import { RightArrow } from "components/SVGs/RightArrow"
import React, { useState } from "react"
import Slider from "react-slick"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { imageResize } from "utils/imageResize"

import { gql, useMutation } from "@apollo/client"
import { Box, color, Sans, Spacer } from "@seasons/eclipse"

import avantGarde from "../../../public/images/signup/AvantGarde.png"
import bold from "../../../public/images/signup/Bold.png"
import classic from "../../../public/images/signup/Classic.png"
import minimalist from "../../../public/images/signup/Minimalist.png"
import streetwear from "../../../public/images/signup/Streetwear.png"
import techwear from "../../../public/images/signup/TechWear.png"

const SAVE_STYLES = gql`
  mutation SaveStyles($styles: [CustomerStyle!]!) {
    addCustomerDetails(details: { styles: { set: $styles } }, status: Waitlisted) {
      id
      detail {
        styles
      }
    }
  }
`

export const DiscoverStyleStep: React.FC<{ onCompleted: () => void }> = ({ onCompleted }) => {
  const styleNames = ["Avant Garde", "Bold", "Classic", "Minimalist", "Streetwear", "Techwear"]
  const styleImages = [avantGarde, bold, classic, minimalist, streetwear, techwear]
  const [saveStyles] = useMutation(SAVE_STYLES)
  const [stylesSelected, setStylesSelected] = useState({})
  const [activeIndex, setActiveIndex] = useState(0)

  const Content = (platform) => {
    let slider = null

    const isDesktop = platform === "desktop"

    const sliderSettings = {
      autoplay: true,
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: platform === "desktop" ? 130 : 20,
      slidesToShow: 1,
      speed: 500,
      arrows: true,
      initialSlide: 0,
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
      <>
        <Flex flexDirection={isDesktop ? "row" : "column"} pt={isDesktop ? 0 : "150px"} alignItems="center">
          <CarouselContainer platform={platform}>
            <Slider {...sliderSettings}>
              {styleImages.map((styleImage) => (
                <div key={styleImage}>
                  <FullPicture
                    className="picture"
                    backgroundURL={imageResize(styleImage, "medium")}
                    platform={platform}
                  />
                </div>
              ))}
            </Slider>
            <Sans size="4" color={!!stylesSelected[activeName] ? "black100" : "black50"} textAlign="center">
              {activeName}
            </Sans>
          </CarouselContainer>
          <Wrapper>
            <Flex flexDirection="column" pl={isDesktop ? 6 : 0} mt={isDesktop ? 0 : 3} mb={isDesktop ? 0 : 15}>
              <Box mx={isDesktop ? 0 : 2}>
                <Sans color="black100" size={["6", "10"]}>
                  Let’s discover your style
                </Sans>

                <Sans size="4" color="black50">
                  Select the styles that best describe what you’re looking to wear with us:
                </Sans>
              </Box>
              <Spacer mb={isDesktop ? 4 : 0} />

              <ButtonContainer py={2} platform={platform}>
                <div className="content">
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
                </div>
              </ButtonContainer>
              <Spacer mb={4} />
              <Box mx={isDesktop ? 0 : 2}>
                <Sans size="5" color="black100">
                  Personalize your membership
                </Sans>
                <Sans size={["3", "5"]} color="black50">
                  Help us get to know you so we can recommend personlized styles, brands and outfits as you use the
                  service.
                </Sans>
                <Spacer mb={6} />
                <Sans size="5" color="black100">
                  Update these anytime
                </Sans>
                <Sans size={["3", "5"]} color="black50">
                  We know your styles change over time. You can update these preferences at anytime from your profile
                  settings.
                </Sans>
              </Box>
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
          disabled={Object.keys(stylesSelected).length === 0}
          handleSubmit={() => {
            saveStyles({
              variables: {
                styles: Object.keys(stylesSelected).map((a) => a.replaceAll(" ", "")),
              },
            })
            onCompleted?.()
          }}
        />
      </>
    )
  }

  return (
    <>
      <DesktopMedia greaterThanOrEqual="md">
        <MaxWidth>{Content("desktop")} </MaxWidth>
      </DesktopMedia>
      <Media lessThan="md">{Content("mobile")}</Media>
    </>
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

const CarouselContainer = styled(Box)<{ platform: string }>`
  background: #e9e9eb;
  width: 560px;
  height: 725px;
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

  ${(p) =>
    p.platform === "mobile" &&
    `
    margin-top: 100px;
    width: 100vw;
    height: 400px;

    .slick-list {
      padding: 0 20px;
    }

    .slick-prev {
      left: 10px;
    }

    .slick-next {
      right: 10px;
    }
  `};
`

const ButtonContainer = styled(Box)<{ platform: string }>`
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 450px;
  }

  ${(p) =>
    p.platform === "mobile" &&
    `
    width: 100vw;
    padding: 15px;
    max-width: none;
    overflow-x: scroll;
    
    .content {
      flex-wrap: nowrap;
    }
  `}
`

const ArrowContainer = styled(Box)`
  z-index: 999;
`

const Button = styled.button`
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

const FullPicture = styled.div<{ backgroundURL: string; platform: string }>`
  background: url(${(p) => p.backgroundURL}) no-repeat center center;
  background-size: contain;
  width: 292.5px;
  height: 650px;
  margin: 0 auto;

  ${(p) =>
    p.platform === "mobile" &&
    `
    width: 200px;
    height: 350px;
  `}
`

const DesktopMedia = styled(Media)`
  height: 100%;
`
