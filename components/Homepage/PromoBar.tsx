import { Flex, Link, Sans } from "components"
import React from "react"

export const PromoBar = () => {
  return (
    <Flex style={{ backgroundColor: "red" }} flexDirection="row" justifyContent="center" width="100%" py={1} px={2}>
      <Link href="/browse?page=1&category=all&brand=all&available=true&forSale=true&orderBy=publishedAt_DESC">
        <Sans size="3" color="white100" textAlign="center">
          Seasons is shutting down on March 11th, 2022. Everything is 50-75% off (excluding select brands). No
          membership required to buy. All sales are final.
        </Sans>
      </Link>
    </Flex>
  )
}
