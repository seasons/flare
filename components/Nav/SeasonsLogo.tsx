import styled, { CSSObject } from "styled-components"
import { fontFamily, Display } from "../Typography"
import { BoxProps } from "../Box"
import Link from "next/link"
import { SeasonsLogoTextIcon } from "components/Icons/SeasonsLogoTextIcon"

export const SeasonsLogo: React.FC<BoxProps> = () => {
  return (
    <Link href="/">
      <StyledAnchor href="/">
        <LogoContainer>
          <SeasonsLogoTextIcon />
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
  align-items: center;
  text-decoration: none;
  color: black;
  margin-bottom: 4px;
`
