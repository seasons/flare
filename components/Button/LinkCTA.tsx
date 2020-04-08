import React from "react"
import { Sans } from "../Typography"
import { color } from "../../helpers/color"
import { Link } from "../Link"
import styled from "styled-components"
import { Flex } from "../Flex"
import { FowardArrow } from "../../assets/SVG/FowardArrow"

export const LinkCTA: React.FC<{ text: string; href: string }> = ({ text, href }) => {
  return (
    <Link href={href}>
      <Container flexDirection="row" alignItems="center" flexWrap="nowrap" justifyContent="space-between">
        <Sans size="4">{text}</Sans>
        <FowardArrow />
      </Container>
    </Link>
  )
}

export const Container = styled(Flex)`
  padding: 9px 24px 9px;
  width: 100%;
  border: 1px solid ${color("black100")};
  color: ${color("white100")};
  background-color: ${color("black100")};
  text-decoration: none;
  &:hover {
    color: ${color("black100")};
    background-color: ${color("white100")};
    svg {
      g {
        stroke: ${color("black100")};
      }
    }
  }
`
