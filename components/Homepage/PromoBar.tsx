import { Flex, Link, Sans } from "components"
import React from "react"

export const PromoBar = () => {
  return (
    <Flex style={{ backgroundColor: "#07256F" }} flexDirection="row" justifyContent="center" width="100%" py={1}>
      <Link href="/browse?page=1&category=all&brand=all&available=true&forSale=true&orderBy=publishedAt_DESC">
        <Sans size="3" color="white100" textAlign="center">
          Shop the members-only archive sale until Dec 24th EST ✨
        </Sans>
      </Link>
    </Flex>
  )
}
