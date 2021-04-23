import { Flex, Box, Sans } from "."
import styled from "styled-components"
import { color } from "../helpers/color"
import { SansSize } from "../lib/theme"

export const VariantSizes: React.FC<{
  variants: any[]
  size: SansSize
}> = ({ variants, size }) => {
  const availableVariants = variants.filter((a) => !!a?.internalSize?.display)

  return (
    <Flex flexDirection="row">
      {availableVariants.map((variant: any) => {
        const reservable = variant.reservable !== null && !!variant.reservable
        return (
          <Box key={variant.id} mr={1} style={{ position: "relative" }}>
            <Sans size={size} color={reservable ? "black" : "black25"}>
              {variant?.displayShort}
            </Sans>
            {!reservable && <Strikethrough size={size} />}
          </Box>
        )
      })}
    </Flex>
  )
}

const Strikethrough = styled.div<{ size: SansSize }>`
  background-color: ${color("black25")};
  height: 2px;
  width: 100%;
  position: absolute;
  top: ${(p) => (p.size === "3" ? 9 : 7)}px;
  left: 0;
`
