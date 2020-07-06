import styled, { CSSObject } from "styled-components"
import { fontFamily } from "../Typography"
import { BoxProps } from "../Box"
import Link from "next/link"

export const SeasonsLogo: React.FC<BoxProps> = () => {
  return (
    <Link href="/">
      <StyledAnchor href="/">
        <LogoContainer>
          <>
            <Logo />
            <LogoText>Seasons</LogoText>
          </>
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
  padding-left: 16px;
  flex-direction: row;
  text-decoration: none;
  color: black;
`

const Logo = styled.div`
  background: url("/img/LogoMark.svg") no-repeat center;
  background-size: contain;
  width: 22px;
  height: 22px;
  margin-right: 10px;
`

const LogoText = styled.div`
  font-family: ${fontFamily.display.regular as CSSObject};
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
`
