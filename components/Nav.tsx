import styled, { CSSObject } from "styled-components"
import { Grid } from "./Grid"
import { fontFamily, Sans } from "./Typography"
import { Box } from "."
import { color } from "../helpers/color"
import { Flex } from "./Flex"
import NextLink from "next/link"
import { useRouter } from "next/router"

interface NavProps {
  fixed?: boolean
}

export const Nav = ({ fixed = false }: NavProps) => {
  const router = useRouter()
  const links = [
    {
      text: "Home",
      url: "/",
      match: /^\/$/,
    },
    {
      text: "Browse",
      url: "/browse/all",
      match: /^\/browse/,
    },
    {
      text: "Pricing",
      url: "/#Membership",
      match: /^\/\#Membership$/,
    },
    {
      text: "Brands",
      url: "/#FAQ",
      match: /^\/#FAQ$/,
    },
    {
      text: "About Us",
      url: "/about",
      match: /^\/#FAQ$/,
    },
  ]
  return (
    <HeaderContainer fixed={fixed}>
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
                <Link active={!!router.pathname.match(link.match)}>
                  <Box key={link.text} mx={2} height="100%" style={{ cursor: "pointer" }}>
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
  margin: 16px 10px;
`

const Logo = styled.div`
  background: url("/img/LogoMark.svg") no-repeat center;
  background-size: contain;
  width: 22px;
  height: 22px;
  margin-right: 10px;
`

const Link = styled.a<{ active?: boolean }>`
  color: black;
  text-decoration: none;
  border-bottom: 2px solid ${p => (p.active ? color("black100") : color("white100"))};
  margin-bottom: -1px;
  height: 58.5px;
  line-height: 58.5px;
`

const HeaderContainer = styled.div<{ fixed: boolean }>`
  top: 0;
  position: ${p => (p.fixed ? "fixed" : "relative")};
  border-bottom: 1px solid ${color("black10")};
  display: flex;
  flex-direction: row;
  /* padding: 16px 0px; */
  height: 58.5px;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  background: ${color("white100")};
`
export const LogoText = styled.div`
  font-family: ${fontFamily.display.regular as CSSObject};
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
`
