import * as React from "react"

export const DesignerListItem = ({ href, as, isActive }) => (
  <Box key={slug} onClick={() => setIsOpen(false)} mb={2}>
    <NextLink href={slug === "all" ? "/browse/all+all" : `/designer/${slug}`}>
      <Sans size={7} style={{ textDecoration: "underline", cursor: "pointer" }}>
        {name}
      </Sans>
    </NextLink>
  </Box>
)
