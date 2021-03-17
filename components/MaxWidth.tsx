import styled from "styled-components"
import { Container } from "styled-bootstrap-grid"

export const MaxWidth = styled(Container)<{ height?: string }>`
  width: 100%;
  display: flex;
  height: ${(p) => (p.height ? p.height : "auto")};
  margin: 0 auto;
  position: relative;
  max-width: ${(props) => props.theme.grid.container.xl}px;
`
