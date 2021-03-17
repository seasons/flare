import styled from "styled-components"
import Select from "@material-ui/core/Select"
import { styled as muiStyled } from "@material-ui/core"

const StyledSelect = muiStyled(Select)({
  width: "100%",
  height: "29px",
  fontFamily: "ProximaNova-Medium, sans-serif",
})

export const SelectField = styled(StyledSelect)`
  width: 100%;
  .MuiSelect-icon {
    color: black;
  }
`
