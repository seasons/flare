import styled, { CSSObject } from "styled-components"
import { fontFamily } from "../Typography"
import { BoxProps } from "../Box"
import Link from "next/link"

export const SeasonsLogo: React.FC<BoxProps> = () => {
  return (
    <Link href="/">
      <StyledAnchor href="/">
        <LogoContainer>
          <LogoText>Seasons</LogoText>
        </LogoContainer>
      </StyledAnchor>
    </Link>
  )
}

const StyledAnchor = styled("a")`
  text-decoration: none;
  color: inherit;
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: black;
`

const LogoText = styled.div`
  font-family: ${fontFamily.display.regular as CSSObject};
  font-size: 28px;
  letter-spacing: 2px;
  line-height: 36px;
  text-transform: uppercase;
`
