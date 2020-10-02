import styled, { CSSObject } from "styled-components"
import { fontFamily, Display } from "../Typography"
import { BoxProps } from "../Box"
import Link from "next/link"

export const SeasonsLogo: React.FC<BoxProps> = () => {
  return (
    <Link href="/">
      <StyledAnchor href="/">
        <LogoContainer>
          <Display size="8">SEASONS</Display>
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
