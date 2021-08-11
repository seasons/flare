import { Container } from "styled-bootstrap-grid"
import styled from "styled-components"

export const MaxWidth = styled(Container)<{ height?: string }>`
  width: 100%;
  display: flex;
  height: ${(p) => (p.height ? p.height : "auto")};
  margin: 0 auto;
  position: relative;
  max-width: ${(props) => props.theme.grid.container.maxWidth.xl}px;
`
