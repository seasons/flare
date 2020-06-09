import React from "react"
import { Sans } from "../Typography"
import { color } from "../../helpers/color"
import styled from "styled-components"
import { Flex } from "../Flex"
import { ForwardArrow } from "../SVGs"

type CTAVariant = "primaryWhite" | "primaryBlack"

export const LinkCTA: React.FC<{ text: string; href: string; variant?: CTAVariant }> = ({ text, href, variant }) => {
  return (
    <StyledAnchor href={href}>
      <Container
        flexDirection="row"
        variant={variant}
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
      >
        <Sans size="4">{text}</Sans>
        <ForwardArrow />
      </Container>
    </StyledAnchor>
  )
}

const StyledAnchor = styled("a")`
  text-decoration: none;
  color: inherit;
  &:hover,
  &:focus {
    background-color: transparent !important;
  }
`

export const Container = styled(Flex)<{ variant: CTAVariant }>`
  padding: 9px 24px 9px;
  width: 100%;
  border: 1px solid ${color("black100")};
  color: ${(p) => (p.variant === "primaryWhite" ? color("black100") : color("white100"))};
  background-color: ${(p) => (p.variant === "primaryWhite" ? color("white100") : color("black100"))};
  text-decoration: none;
  svg {
    g {
      stroke: ${(p) => (p.variant === "primaryWhite" ? color("black100") : color("white100"))};
    }
  }
  &:hover {
    color: ${(p) => (p.variant === "primaryWhite" ? color("white100") : color("black100"))};
    background-color: ${(p) => (p.variant === "primaryWhite" ? color("black100") : color("white100"))};
    svg {
      g {
        stroke: ${(p) => (p.variant === "primaryWhite" ? color("white100") : color("black100"))};
      }
    }
  }
`
