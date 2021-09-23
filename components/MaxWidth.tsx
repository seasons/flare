import { Container } from "styled-bootstrap-grid"
import styled from "styled-components"

export const MaxWidth = styled(Container)<{ height?: string; disableMaxWidth?: boolean }>`
  display: flex;
  flex: 1;
  height: ${(p) => (p.height ? p.height : "auto")};
  margin: 0 auto;
  position: relative;
  max-width: ${(props) => (props.disableMaxWidth ? "none" : `${props.theme.grid.container.maxWidth.xl}px`)};
`
