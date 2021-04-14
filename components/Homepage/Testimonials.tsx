import { Box, Display, Flex, MaxWidth, Sans, Spacer } from "components"
import { color } from "helpers"
import React, { useRef } from "react"
import { SnapList, SnapItem, useVisibleElements, useScroll } from "react-snaplist-carousel"
import styled from "styled-components"

export const Testimonials: React.FC = () => {
  const snapList = useRef(null)
  const selected = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const goToSnapItem = useScroll({ ref: snapList })

  const testimonialItems = [
    {
      text:
        "“I mean this in the best possible way — y’all seriously make me assess the value per wear on each piece I buy from now on” ",
      author: "- Jeremy L.",
    },
    {
      text:
        "“It’s like test driving a car off the lot. It’s like dating vs being in a relationship. It’s a better way to f*cken dress”",
      author: "- James H.",
    },
    {
      text:
        "“Seasons lets me be a f*ckin sniper with my purchases. I can take my time and get to know the brand before committing.”",
      author: "- Lawrence S.",
    },
    {
      text:
        "“This is one of the best ways to discover new designers, explore new styles and get insight on what’s happening in men’s fashion”",
      author: "- Jay T.",
    },
  ]

  return (
    <MaxWidth>
      <Flex flexDirection="column" width="100%" px={[2, 2, 2, 2, 2]}>
        <Flex width="100%" flexDirection="row" justifyContent="center">
          <Display size="4">What members are saying</Display>
        </Flex>
        <Spacer mb={4} />
        <CarouselWrapper>
          <SnapList direction="horizontal" width="100%" ref={snapList}>
            {testimonialItems?.map((item, index) => {
              return (
                <SnapItem
                  key={item.author}
                  //   margin={{ left: index === 0 ? "0px" : space(1) + "px" }}
                  snapAlign="center"
                  width="100%"
                >
                  <Flex
                    onClick={() => goToSnapItem(index === testimonialItems.length - 1 ? 0 : index + 1)}
                    px={4}
                    width="100%"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Display size="7" style={{ textAlign: "center", maxWidth: "880px" }}>
                      {item.text}
                    </Display>
                    <Spacer mb={2} />
                    <Sans size="4" color="black50" style={{ textAlign: "center" }}>
                      {item.author}
                    </Sans>
                  </Flex>
                </SnapItem>
              )
            })}
          </SnapList>
        </CarouselWrapper>
        <Spacer mb={4} />
        <PagerWrapper>
          <Flex flexDirection="row" flexWrap="nowrap" px={1} py={2} justifyContent="center">
            {testimonialItems?.map((_image, index) => {
              return (
                <Box key={index} px={0.5}>
                  <Pager active={selected === index} />
                </Box>
              )
            })}
          </Flex>
        </PagerWrapper>
      </Flex>
    </MaxWidth>
  )
}

const PagerWrapper = styled.div`
  width: 100%;
  pointer-events: none;
  z-index: 1;
`

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`

const Pager = styled.div<{ active: boolean }>`
  height: 4px;
  width: 40px;
  background-color: ${(p) => (p.active ? color("black100") : color("black10"))};
`
