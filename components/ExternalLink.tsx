import React from "react"
import styled from "styled-components"

/* Note for later typescript modding -- the color prop on this needs to be
a theme color */
export interface ExternalLinkProps {
  children: any
  href: string
}
function ExternalLink(props: ExternalLinkProps) {
  let { children, href } = props
  return (
    <StyledAnchor href={href} target="_blank">
      {children}
    </StyledAnchor>
  )
}

export default ExternalLink

const StyledAnchor = styled("a")`
  text-decoration: underline;
  color: inherit;
`
