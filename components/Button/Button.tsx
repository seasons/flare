import { color } from "helpers"
import React, { Component } from "react"
import styled, { css } from "styled-components"
import { borderRadius, borders, height, space, textAlign, width } from "styled-system"

import { GLOBAL_TRANSITION, themeProps } from "../../lib/theme"
import { Spinner } from "../Spinner"
import { Sans, SansProps } from "../Typography"
import { ButtonBaseProps, ButtonProps, defaultSize, defaultVariant } from "./Button.shared"

export interface WebButtonProps extends ButtonProps {
  /** The underlying type of button */
  type?: string
}

/** A button with various size and color settings */
export class Button extends Component<WebButtonProps> {
  static defaultProps = {
    size: defaultSize,
    variant: defaultVariant,
    theme: themeProps,
  }

  getSize(): { height: string; size: "2" | "3" | "4"; px: number | string } {
    const { inline } = this.props
    switch (this.props.size) {
      case "small":
        return {
          height: inline ? "17px" : "32px",
          size: "3",
          px: inline ? 0 : 2,
        }
      case "medium-x":
        return {
          height: inline ? "21px" : "40px",
          size: "3",
          px: inline ? 0 : 3,
        }
      case "medium":
        return {
          height: inline ? "21px" : "48px",
          size: "4",
          px: inline ? 0 : 3,
        }
      case "large":
        return {
          height: inline ? "21px" : "56px",
          size: "4",
          px: inline ? 0 : 5,
        }
    }
  }

  getVariant() {
    switch (this.props.variant) {
      case "primaryBlack":
        return css`
          ${(props) => {
            const { colors } = props.theme

            return `
                background-color: ${colors.black100};
                border-color: ${colors.black100};
                color: ${colors.white100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.white100};
                    border-color: ${colors.black100};
                    color: ${colors.black100};
                  }
                }
              `
          }};
        `
      case "primaryWhite":
        return css`
          ${(props) => {
            const { colors } = props.theme

            return `
                background-color: ${colors.white100};
                border-color: ${colors.black100};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.black100};
                    border-color: ${colors.black100};
                    color: ${colors.white100};
                  }
                }
              `
          }};
        `
      case "primaryWhiteNoBorder":
        return css`
          ${(props) => {
            const { colors } = props.theme

            return `
                background-color: ${colors.white100};
                border-color: ${colors.white100};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.black100};
                    border-color: ${colors.black100};
                    color: ${colors.white100};
                  }
                }
              `
          }};
        `
      case "secondaryGray":
        return css`
          ${(props) => {
            const { colors } = props.theme

            return `
                background-color: ${colors.black10};
                border-color: ${colors.black10};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color: ${colors.black30};
                    border-color: ${colors.black30};
                    color: ${colors.black100};
                  }
                }
              `
          }};
        `
      case "secondaryOutline":
        return css`
          ${(props) => {
            const { colors } = props.theme
            return `
                background-color:  transparent;
                border-color: ${colors.black10};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color:  transparent;
                    border-color: ${colors.black100};
                    color: ${colors.black100};
                  }
                }
              `
          }};
        `
      case "secondaryOutlineWhite":
        return css`
          ${(props) => {
            const { colors } = props.theme
            return `
                background-color:  ${colors.white100};
                border-color: ${colors.black10};
                color: ${colors.black100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color:  ${colors.white100};
                    border-color: ${colors.black100};
                    color: ${colors.black100};
                  }
                }
              `
          }};
        `
      case "transparentOutlineWhite":
        return css`
          ${(props) => {
            const { colors } = props.theme
            return `
                background-color:  transparent;
                border-color: ${colors.white100};
                color: ${colors.white100};

                @media ${themeProps.mediaQueries.hover} {
                  &:hover {
                    background-color:  transparent;
                    border-color: ${colors.black100};
                    color: ${colors.black100};
                  }
                }
              `
          }};
        `
      case "noOutline":
        return css`
          ${(props) => {
            const { colors } = props.theme
            return `
                background-color: transparent;
                border-color: transparent;
                color: ${colors.black100};
              `
          }};
        `
      default:
    }
  }

  render() {
    const buttonProps = {
      ...this.props,
      ...this.getSize(),
      buttonSize: this.props.size,
      variantStyles: this.getVariant(),
    }

    return <ButtonBase {...buttonProps}>{this.props.children}</ButtonBase>
  }
}

/** A base from which various button implementations can compose from */
export class ButtonBase extends Component<ButtonBaseProps & SansProps> {
  static defaultProps = {
    border: 1,
    borderRadius: 8,
  }

  onClick = (event) => {
    if (!this.props.loading && this.props.onClick) {
      this.props.onClick(event)
    }
  }

  render() {
    const { block, children, loading, disabled, color, size, weight, onClick, ...rest } = this.props

    const loadingClass = loading ? "loading" : ""
    const disabledClass = disabled ? "disabled" : ""
    const blockClass = block ? "block" : ""
    return (
      <Container
        {...rest}
        className={[blockClass, loadingClass, disabledClass].join(" ")}
        onClick={this.onClick}
        disabled={disabled}
      >
        {loading && <Spinner size={this.props.buttonSize} />}
        {typeof children === "string" ? (
          <Sans weight={weight || "medium"} size={size} style={{ textAlign: "center" }}>
            {children}
          </Sans>
        ) : (
          children
        )}
      </Container>
    )
  }
}

const Container = styled.button<ButtonBaseProps>`
  display: inline-block;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  align-items: center;

  ${borders};
  ${borderRadius};
  ${space};
  ${textAlign};
  ${width};
  ${height};

  border-style: solid;

  &:hover {
    .hover-white-background {
      background-color: ${color("white100")} !important;

      path {
        stroke: ${color("white100")} !important;
      }
    }

    .hover-white-path__svg {
      path {
        stroke: ${color("white100")} !important;
      }
    }
  }

  ${(props) => {
    if (!props.loading) {
      return `
        transition: background-color ${GLOBAL_TRANSITION}, border ${GLOBAL_TRANSITION};
      `
    }
  }};

  ${(props) => props.variantStyles};

  &.loading {
    transition: none;
    background-color: transparent;
    color: transparent;
    border: 0;
    cursor: auto;
  }

  &.block {
    width: 100%;
  }

  &.disabled {
    ${(props) => {
      const { colors } = props.theme

      return `
        background-color: ${colors.black50};
        border-color: ${colors.black50};
        color: ${colors.white100};
        pointer-events: none;
      `
    }};
  }
`
