import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { color } from "../../helpers/color"
import { Flex } from "../Flex"
import { Grid } from "../Grid"
import { NavProps } from "./Types"
import { SeasonsLogo } from "./SeasonsLogo"
import { NavItem } from "./NavItem"
import { Spacer } from ".."

export const DesktopNav = ({ fixed = false, links }: NavProps) => {
  const router = useRouter()

  return (
    <>
      <HeaderContainer fixed={fixed}>
        <Grid>
          <Flex ml="auto" flexDirection="row" alignItems="center">
            <SeasonsLogo />
            <Flex ml="auto" flexDirection="row" alignItems="center">
              {links.map((link) => {
                if (link.external) {
                  return (
                    <Link key={link.url} href={link.url} active={!!router.pathname.match(link.match)}>
                      <NavItem link={link} />
                    </Link>
                  )
                } else {
                  return (
                    <NextLink href={link.url} key={link.text}>
                      <Link href={link.url} active={!!router.pathname.match(link.match)}>
                        <NavItem link={link} />
                      </Link>
                    </NextLink>
                  )
                }
              })}
            </Flex>
          </Flex>
        </Grid>
      </HeaderContainer>
      <Spacer mb="60px" />
    </>
  )
}

const HeaderContainer = styled.div<{ fixed: boolean }>`
  top: 0;
  position: ${(p) => (p.fixed ? "fixed" : "relative")};
  border-bottom: 1px solid ${color("black10")};
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  background: ${color("white100")};
  height: 58.5px;
  align-items: center;
`

const Link = styled.a<{ active?: boolean }>`
  color: black;
  text-decoration: none;
  height: 60px;
  line-height: 60px;

  &:after {
    display: block;
    position: absolute;
    height: 5px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`
