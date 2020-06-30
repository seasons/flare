import React from "react"
import styled from "styled-components"

interface ExternalLinkProps {
  children: any
  href: string
}

export const ExternalLink = (props: ExternalLinkProps) => {
  const { children, href } = props
  return (
    <StyledAnchor href={href} target="_blank">
      {children}
    </StyledAnchor>
  )
}

const StyledAnchor = styled("a")`
  text-decoration: underline;
  color: inherit;
`
