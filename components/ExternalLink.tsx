import React from "react"

/* Note for later typescript modding -- the color prop on this needs to be
a theme color */
export interface ExternalLinkProps {
  children: string
  href: string
}
function ExternalLink(props: ExternalLinkProps) {
  let { children, href } = props
  return (
    <a href={href} target="_blank">
      {children}
    </a>
  )
}

export default ExternalLink
