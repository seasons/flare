import ContentLoader from "react-content-loader"
import React from "react"
import { Box } from "../Box"

const categoryRows = 7
const categorySpace = 32

export const CategoryLoader = () => {
  return (
    <Box mt="20px" height={categoryRows * categorySpace + "px"}>
      <ContentLoader height={categoryRows * categorySpace + "px"}>
        {[...Array(categoryRows)].map((_, index) => {
          return (
            <React.Fragment key={index}>
              <rect x={0} y={index * categorySpace} width="80" height={15} />
            </React.Fragment>
          )
        })}
      </ContentLoader>
    </Box>
  )
}
