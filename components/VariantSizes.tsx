import { uniqBy } from "lodash"
import { Flex, Box, Sans } from "."
import styled from "styled-components"
import { color } from "../helpers/color"

const sizes = {
  xs: {
    sortWeight: 0,
  },
  s: {
    sortWeight: 1,
  },
  m: {
    sortWeight: 2,
  },
  l: {
    sortWeight: 3,
  },
  xl: {
    sortWeight: 4,
  },
  xxl: {
    sortWeight: 5,
  },
}

export const sortVariants = variants => {
  // The higher the sortWeight the sooner it will be displayed, e.g. "xxl, xl, l, m"
  const uniqueArray = uniqBy(variants, "size")
  return uniqueArray.sort((variantA, variantB) => {
    const sortWeightA =
      (variantA.size && sizes[variantA.size.toLowerCase()] && sizes[variantA.size.toLowerCase()].sortWeight) || 0
    const sortWeightB =
      (variantB.size && sizes[variantB.size.toLowerCase()] && sizes[variantB.size.toLowerCase()].sortWeight) || 0
    return sortWeightA - sortWeightB
  })
}

export const VariantSizes: React.FC<{
  variants: any[]
  size: "0" | "1"
}> = ({ variants, size }) => {
  const sortedVariants = sortVariants(variants)
  return (
    <Flex flexDirection="row" mt={0.5}>
      {sortedVariants.map((variant: any) => {
        const reservable = variant.reservable !== null && !!variant.reservable
        return (
          <Box key={variant.id} mr={1} style={{ position: "relative" }}>
            <Sans size="3" color={reservable ? "black" : "black15"}>
              {variant.size}
            </Sans>
            {!reservable && <Strikethrough size={size} />}
          </Box>
        )
      })}
    </Flex>
  )
}

const Strikethrough = styled.div<{ size: string }>`
  background-color: ${color("black15")};
  height: 2;
  width: 100%;
  position: absolute;
  top: ${p => (p.size === "0" ? 7 : 11)};
  left: 0;
`
