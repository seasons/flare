import NextLink from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Box } from ".."
import { color } from "../../helpers/color"
import { Flex } from "../Flex"
import { Grid } from "../Grid"
import { Sans } from "../Typography"
import { NavProps } from "./Types"
import { SeasonsLogo } from "./SeasonsLogo"

export const DesktopNav = ({ fixed = false, links }: NavProps) => {
  const router = useRouter()

  return (
    <HeaderContainer fixed={fixed}>
      <Grid>
        <Flex ml="auto" flexDirection="row" alignItems="center">
          <SeasonsLogo />

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

const HeaderContainer = styled.div<{ fixed: boolean }>`
  top: 0;
  position: ${p => (p.fixed ? "fixed" : "relative")};
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
  border-bottom: 2px solid ${p => (p.active ? color("black100") : color("white100"))};
  margin-bottom: -1px;
  height: 58.5px;
  line-height: 58.5px;
`
