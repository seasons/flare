import { Image, Link } from "components"
import { useRouter } from "next/router"
import React from "react"

import { Box, Typography } from "@material-ui/core"

export const SearchResultCard = ({ result }) => {
  const { data } = result

  if (!data) {
    return <></>
  }

  switch (result.kindOf) {
    case "Brand":
      return (
        <Box>
          <Link href={`/designer/${data.objectID}`}>{`${data.name}`}</Link>
          <Typography variant="body2" color="textPrimary">
            {`${data.productsCount} products`}
          </Typography>
        </Box>
      )
    case "Product":
      return (
        <Box display="flex" flexDirection="row" pt={1} width="100%">
          <Box>
            <Image url={data.image} size="medium" />
          </Box>
          <Box ml={1} mb={2} flex={1}>
            <Link href={`/inventory/products/${data.objectID}`}>{data?.name}</Link>
            <Typography variant="body2" color="textPrimary">
              {data?.brandName}
            </Typography>
          </Box>
        </Box>
      )

    default:
      return <></>
  }
}
