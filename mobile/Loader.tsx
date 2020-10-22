import { Flex } from "components"
import { Spinner } from "components/Spinner"
import React from "react"

export const Loader = () => {
  return (
    <Flex
      style={{ flex: 1, height: "100%" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Flex style={{ flex: 1, height: "100%" }} flexDirection="row" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    </Flex>
  )
}
