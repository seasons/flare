import React from "react"
import { Sans, SansProps } from "../Typography"

export interface DetailTextProps extends Partial<SansProps> {
  children: React.ReactChild | React.ReactChild[] | React.ReactFragment
}
export default function DetailText(props: DetailTextProps): React.ReactElement {
  let { children, ...sansProps } = props
  return (
    <Sans size="4" color="black50" {...sansProps}>
      {props.children}
    </Sans>
  )
}
