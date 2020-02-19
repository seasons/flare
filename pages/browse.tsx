import React from "react"
import { NextPage } from "next"
import { gql } from "apollo-boost"
import { useState } from "react"
import { get } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { imageResize } from "../utils/imageResize"
import withData from "../lib/apollo"

const GET_BROWSE_PRODUCTS = gql`
  query GetBrowseProducts($name: String!, $first: Int!, $skip: Int!) {
    categories(where: { visible: true }) {
      id
      slug
      name
      children {
        slug
      }
    }
    products(category: $name, first: $first, skip: $skip, where: { status: Available }) {
      id
      name
      description
      images
      modelSize
      modelHeight
      externalURL
      tags
      retailPrice
      status
      createdAt
      updatedAt
      brand {
        id
        name
      }
      variants {
        id
        size
        total
        reservable
        nonReservable
        reserved
        isSaved
      }
    }
  }
`

const ABBREVIATED_SIZES = {
  "X-Small": "XS",
  Small: "S",
  Medium: "M",
  Large: "L",
  "X-Large": "XL",
  "XX-Large": "XXL",
}

const renderItem = ({ item }, i) => {
  const product = item

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "large")

  const brandName = get(product, "brand.name")

  if (!product) {
    return null
  }

  return (
    <div key={i}>
      <img src={resizedImage} />
      <div>
        {product.variants.map(a => (
          <span key={a.size} style={{ marginRight: 10 }}>
            {a.size}
          </span>
        ))}
      </div>
      <div>
        <div>{product.name}</div>
        <div>{brandName}</div>
      </div>
    </div>
  )
}

const BrowsePage: NextPage<{}> = withData(props => {
  const [currentCategory, setCurrentCategory] = useState("all")

  const { data, loading, fetchMore } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: 10,
      skip: 0,
    },
  })

  const products = data && data.products

  return <div>{(products || []).map((product, i) => renderItem({ item: product }, i))}</div>
})

export default BrowsePage
