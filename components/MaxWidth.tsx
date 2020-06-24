import styled from "styled-components"
import { Box } from "./Box"

export const MaxWidth = styled(Box)`
  max-width: ${(props) => props.theme.grid.breakpoints.xl}px;
`
