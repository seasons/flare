import { Box, Link, Sans } from "components"
import React from "react"
import slugify from "slugify"

export const BrandHit = ({ hit }) => {
  const brand = hit

  const { name } = brand

  return (
    <Link href="/designer/[Designer]" as={`/designer/${slugify(name)?.toLowerCase()}`}>
      <Sans size={7} style={{ textDecoration: "underline", cursor: "pointer" }}>
        {name}
      </Sans>
    </Link>
  )
}
