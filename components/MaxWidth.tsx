import styled from "styled-components"
import { Container } from "styled-bootstrap-grid"

export const MaxWidth = styled(Container)`
  width: 100%;
  display: flex;
  height: 100%;
  margin: 0 auto;
  position: relative;
  max-width: ${(props) => props.theme.grid.container.xl}px;
`
