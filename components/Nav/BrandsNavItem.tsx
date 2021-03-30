import React from "react"
import { NavItem } from "./NavItem"
import { MENU_HEIGHT } from "./MobileNav"
import { Sans, Box, Media, Separator, Button, Flex } from "components"
import styled from "styled-components"
import { ClickAwayListener, Grow, Paper, Popper, Modal } from "@material-ui/core"
import { color } from "helpers/color"
import NextLink from "next/link"
import { gql } from "@apollo/client"
import { Schema, useTracking } from "utils/analytics"

type Props = {
  brandItems: Array<{ slug: string; name: string }>
}

export const BrandNavItemFragment = gql`
  fragment BrandNavItem on Brand {
    name
    slug
  }
`

const DesktopNavItem = ({ brands }) => {
  const tracking = useTracking()
  const anchorRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <>
      <DesktopNavItemContainer ref={anchorRef} onClick={() => setIsOpen(true)}>
        <NavItem link={{ text: "Designers" }} active={isOpen} />
      </DesktopNavItemContainer>
      <Popper open={isOpen} anchorEl={anchorRef.current} transition disablePortal placement="bottom-end">
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "top right" }}>
            <Paper>
              <ClickAwayListener onClickAway={() => (isOpen ? setIsOpen(false) : null)}>
                <DesktopBrandsContainer p={3} pb={2}>
                  {brands.map(({ name, slug }) => (
                    <Box
                      key={slug}
                      onClick={() => {
                        tracking.trackEvent({
                          actionName: Schema.ActionNames.BrandTapped,
                          actionType: Schema.ActionTypes.Tap,
                          brandName: name,
                          brandSlug: slug,
                        })
                        setIsOpen(false)
                      }}
                      mb={1}
                    >
                      <NextLink href={slug === "all" ? "/browse/all+all" : `/designer/${slug}`}>
                        <Sans size={7} style={{ textDecoration: "underline", cursor: "pointer" }}>
                          {name}
                        </Sans>
                      </NextLink>
                    </Box>
                  ))}
                </DesktopBrandsContainer>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const DesktopNavItemContainer = styled.div`
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

const DesktopBrandsContainer = styled(Box)`
  column-count: 2;
  column-gap: 48px;
  max-height: 560px;
  border: solid 1px black;
`

const MobileNavItem = ({ brands }) => {
  const tracking = useTracking()
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  return (
    <>
      <MobileNavItemContainer onClick={() => setIsOpen(true)}>
        <Box py={2}>
          <Sans size="3" py={2} color="black">
            Designers
          </Sans>
        </Box>
      </MobileNavItemContainer>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} BackdropProps={{ invisible: true }}>
        <ModalRoot>
          <Separator />
          <MobileBrandsContainer p={3}>
            {brands.map(({ name, slug }) => (
              <Box
                key={slug}
                onClick={() => {
                  tracking.trackEvent({
                    actionName: Schema.ActionNames.BrandTapped,
                    actionType: Schema.ActionTypes.Tap,
                    brandName: name,
                    brandSlug: slug,
                  })
                  setIsOpen(false)
                }}
                mb={2}
              >
                <NextLink href={slug === "all" ? "/browse/all+all" : `/designer/${slug}`}>
                  <Sans size={7} style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {name}
                  </Sans>
                </NextLink>
              </Box>
            ))}
            <MobileButtonContainer>
              <Button
                block
                variant="primaryWhite"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Close
              </Button>
            </MobileButtonContainer>
          </MobileBrandsContainer>
        </ModalRoot>
      </Modal>
    </>
  )
}

const MobileNavItemContainer = styled(Box)`
  border-bottom: 1px solid ${color("black10")};
  background: ${color("white100")};
  flex-direction: row;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  align-items: center;
  text-align: center;
`

const ModalRoot = styled(Box)`
  margin-top: ${MENU_HEIGHT};
  position: relative;
`

const MobileBrandsContainer = styled(Box)`
  background-color: ${color("white100")};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - ${MENU_HEIGHT});
  padding-bottom: 80px;
`

const MobileButtonContainer = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: absolute;
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${color("white100")};
`

export const BrandsNavItem: React.FC<Props> = ({ brandItems }) => {
  const resortedBrands = [...brandItems, { name: "View All", slug: "all" }]
  return (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNavItem brands={resortedBrands} />
      </Media>
      <Media lessThan="md">
        <MobileNavItem brands={resortedBrands} />
      </Media>
    </>
  )
}
