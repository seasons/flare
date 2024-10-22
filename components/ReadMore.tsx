import _ from "lodash"
import React from "react"

import { color } from "../helpers/color"
import { Color } from "../lib/theme"
import { Schema, useTracking } from "../utils/analytics/track"
import { Flex, Sans } from "./"

interface Props {
  content: string
  maxChars: number
  textColor?: Color
  readMoreExpanded: boolean
  setReadMoreExpanded: (set: boolean) => void
}

export const ReadMore = React.memo(({ content, maxChars, textColor, readMoreExpanded, setReadMoreExpanded }: Props) => {
  const tracking = useTracking()
  const isAlreadyExpanded = readMoreExpanded || content?.length <= maxChars

  const root = (
    <Sans size="4" color={textColor ? textColor : color("black50")} style={{ whiteSpace: "pre-wrap" }}>
      {content}
    </Sans>
  )

  return isAlreadyExpanded ? (
    root
  ) : (
    <Flex>
      <div>
        {truncate({
          root,
          maxChars,
          onExpand: () => {
            setReadMoreExpanded(true)
            tracking.trackEvent({
              actionName: Schema.ActionNames.ReadMoreTapped,
              actionType: Schema.ActionTypes.Tap,
            })
          },
        })}
      </div>
    </Flex>
  )
})

/**
 * In-order traverses the shallowly-rendered markdown returned from SimpleMarkdown's parser
 * keeping track of how many characters have been seen. When it has seen enough, it stops
 * traversing and adds a 'read more' button to the highest text node at that part of the tree.
 */
function truncate({
  root,
  maxChars,
  onExpand,
}: {
  root: React.ReactNode
  maxChars: number
  onExpand(): void
}): React.ReactNode {
  // keep track of how many characters we have seen
  let offset = 0
  // keep track of how many text nodes deep we are
  let textDepth = 0

  function traverse(node: React.ReactNode) {
    if (offset === maxChars) {
      return null
    }

    if (Array.isArray(node)) {
      const result = []
      for (const child of node) {
        const truncated = traverse(child)
        if (truncated) {
          result.push(truncated)
        }
        if (offset === maxChars) {
          return result
        }
      }
      return result
    }

    if (React.isValidElement(node)) {
      // TODO: find a way to make the rendering extensible while allowing textDepth to be tracked.
      // Right now we assume that only these two Text nodes will be used.
      if (node.type === Sans) {
        textDepth += 1
      }
      const children = React.Children.toArray((node.props as any).children)
      const truncatedChildren = traverse(children)

      if (node.type === Sans) {
        if (textDepth === 1 && maxChars === offset) {
          truncatedChildren.push(
            <span>
              {"... "}
              <span onClick={onExpand} style={{ display: "inline", cursor: "pointer", color: color("black100") }}>
                Read&nbsp;more
              </span>
            </span>
          )
        }
        textDepth -= 1
      }

      return React.cloneElement(node, null, ...truncatedChildren)
    }

    if (node === null || typeof node === "boolean" || typeof node === "undefined") {
      return ""
    }

    let text = node.toString()
    if (text.length > maxChars - offset) {
      text = text.slice(0, maxChars - offset) as string
    }

    offset += text.length

    return text
  }

  return traverse(root)
}
