import { Box, Sans } from ".."
import { animated, useSpring } from "react-spring"
import { useState } from "react"
import styled from "styled-components"
import { color } from "../../helpers"

export const NavItem = ({ link }) => {
  const [isHovering, setIsHovering] = useState(false)
  const hoverAnimation = useSpring({
    height: isHovering ? 4 : 0,
    config: { tension: 500, friction: 33 },
  })

  return (
    <Box
      px={2}
      height="100%"
      style={{ cursor: "pointer", position: "relative" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Sans size="3" color="black" style={{ lineHeight: "inherit" }}>
        {link.text}
      </Sans>
      <NavHover style={hoverAnimation} />
    </Box>
  )
}

const HoverBox = styled(Box)`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${color("black100")};
`

const NavHover = animated(HoverBox)
