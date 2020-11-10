import React from "react"
import { NavItem } from "./NavItem"
import { Sans, Box } from "components"
import styled from "styled-components"
import { Link } from "./Types"
import { ClickAwayListener, Grow, Paper, Popper } from "@material-ui/core"
import NextLink from "next/link"
import { gql } from "@apollo/client"

type Props = {
  brandItems: Array<{ slug: string; name: string }>
}

export const BRAND_LIST = [
  "acne-studios",
  "amiri",
  "auralee",
  "bode",
  "casablanca",
  "comme-des-garcons",
  "craig-green",
  "deveaux",
  "dries-van-noten",
  "gucci",
  "john-elliot",
  "judy-turner",
  "jacquemus",
  "landlord",
  "martine-rose",
  "noah",
  "nanushka",
  "our-legacy",
  "off-white",
  "prada",
  "rhude",
  "sacai",
  "stone-island",
  "stussy",
  "yeezy",
]

export const BrandNavItemFragment = gql`
  fragment BrandNavItem on Brand {
    name
    slug
  }
`

export const BrandsNavItem: React.FC<Props> = ({ brandItems }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const anchorRef = React.useRef(null)

  const handleToggleOpen = () => setIsOpen((isOpen) => !isOpen)

  const resortedBrands = [...brandItems, { name: "View All", slug: "all" }]

  return (
    <>
      <NavItemContainer ref={anchorRef} onClick={handleToggleOpen}>
        <NavItem link={{ text: "Designers" } as Link} active={isOpen} />
      </NavItemContainer>
      <Popper open={isOpen} anchorEl={anchorRef.current} transition disablePortal placement="bottom-end">
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "top right" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleToggleOpen}>
                <BrandsContainer p={3} pb={2}>
                  {resortedBrands.map(({ name, slug }) => (
                    <BrandContainer key={slug} onClick={handleToggleOpen}>
                      <NextLink href={`/browse/all+${slug}`}>
                        <Sans size={3} style={{ textDecoration: "underline", cursor: "pointer" }}>
                          {name}
                        </Sans>
                      </NextLink>
                    </BrandContainer>
                  ))}
                </BrandsContainer>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const NavItemContainer = styled.div`
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

const BrandsContainer = styled(Box)`
  column-count: 2;
  column-gap: 48px;
  max-height: 560px;
  border: solid 1px black;
`

const BrandContainer = styled(Box)`
  margin-bottom: 8px;
`
