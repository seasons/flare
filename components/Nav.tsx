import styled, { css, CSSObject } from "styled-components"
import { Grid } from "./Grid"
import { fontFamily, Sans } from "./Typography"
import { Box } from "."
import { color } from "../lib/color"
import { Flex } from "./Flex"
import NextLink from "next/link"

export const Nav = () => {
  const links = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Browse",
      url: "/browse",
    },
    {
      text: "Pricing",
      url: "/#Membership",
    },
    {
      text: "Brands",
      url: "/#FAQ",
    },
    {
      text: "About Us",
      url: "/about",
    },
  ]
  return (
    <HeaderContainer>
      <Grid>
        <Flex ml="auto" flexDirection="row" alignItems="center">
          <LogoContainer>
            <NextLink href="/">
              <>
                <Logo />
                <LogoText>Seasons</LogoText>
              </>
            </NextLink>
          </LogoContainer>
          <Flex ml="auto" flexDirection="row" alignItems="center">
            {links.map(link => (
              <NextLink href={link.url} key={link.text}>
                <Link>
                  <Box key={link.text} mx={2}>
                    <Sans size="3" color="black">
                      {link.text}
                    </Sans>
                  </Box>
                </Link>
              </NextLink>
            ))}
          </Flex>
        </Flex>
      </Grid>
    </HeaderContainer>
  )
}

const LogoContainer = styled.div`
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

const Link = styled.a`
  color: black;
  text-decoration: none;
`

const HeaderContainer = styled.div`
  border-bottom: 1px solid ${color("lightGray")};
  display: flex;
  flex-direction: row;
  padding: 16px 0px;
  height: 58.5px;
  box-sizing: border-box;
  z-index: 100;
`
export const LogoText = styled.div`
  font-family: ${fontFamily.display.regular as CSSObject};
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
`
