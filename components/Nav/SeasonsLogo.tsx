import styled, { CSSObject } from "styled-components"
import { fontFamily } from "../Typography"
import NextLink from "next/link"
import { Box } from ".."
import { BoxProps } from "../Box"

export const SeasonsLogo: React.FC<BoxProps> = () => {
  return (
    <LogoContainer>
      <NextLink href="/">
        <>
          <Logo />
          <LogoText>Seasons</LogoText>
        </>
      </NextLink>
    </LogoContainer>
  )
}

const LogoContainer = styled(Box)`
  display: flex;
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
