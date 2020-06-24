import React from "react"
import { MarginProps } from "styled-system"
import { Sans } from "../Typography"

export interface HeaderTextProps extends MarginProps {
  children: React.ReactChild | React.ReactChild[]
}

export default function HeaderText(props: HeaderTextProps) {
  const { children, ...marginProps } = props
  return (
    <Sans {...marginProps} size="8" color="black100">
      {children}
    </Sans>
  )
}
