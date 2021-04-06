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
  // onClickNotificationBar?: (route: { drawerView: string; url: string }) => void
}
