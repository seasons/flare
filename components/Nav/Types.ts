import { NavStyles } from "components/Layout"

export type Link = {
  text: string
  url?: string
  match?: RegExp
  external: boolean
  renderNavItem?: () => JSX.Element
}

export interface NavProps {
  fixed?: boolean
  links?: Link[]
  navStyles?: NavStyles
}
