import React from "react"
import styled from "styled-components"
import { Box } from "../Box"
import { Link } from "components/Link"
import { Sans } from "components"

export const BreadCrumbs: React.FC<{ product: any }> = ({ product }) => {
  const crumbs = [{ link: "/browse", text: "Browse", as: null }]
  if (product?.brand?.name && product?.brand?.slug) {
    crumbs.push({
      link: "/designer/[Designer]",
      as: `/designer/${product?.brand?.slug}`,
      text: product?.brand?.name,
    })
  }

  return (
    <Wrapper>
      {crumbs.map((crumb, index) => {
        return (
          <Link href={crumb.link} as={crumb.as} key={crumb.link}>
            <Sans size="3">{index === 0 ? `${crumb.text}${" "}` : `/ ${crumb.text}`}</Sans>
          </Link>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  p {
    display: inline;
  }
`
