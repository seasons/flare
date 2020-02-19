import React from "react"
import { NextPage } from "next"
import { gql } from "apollo-boost"
import { useState } from "react"
import { get } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { imageResize } from "../utils/imageResize"
import withData from "../lib/apollo"
import { Layout } from "../components"
import { Sans } from "../components/Typography/Typography"
import { Box } from "../components/Box"
import { Grid, Row, Col } from "../components/Grid"
import styled from "styled-components"
import Paginate from "react-paginate"

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
    connection: productsConnection(where: { status: Available }) {
      aggregate {
        count
      }
    }
    products: productsConnection(category: $name, first: $first, skip: $skip, where: { status: Available }) {
      aggregate {
        count
      }
      edges {
        node {
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
  const product = item.node

  const image = get(product, "images[0]", { url: "" })
  const resizedImage = imageResize(image.url, "large")

  const brandName = get(product, "brand.name")

  if (!product) {
    return null
  }

  return (
    <ProductContainer key={i}>
      <img src={resizedImage} />
      <Box py="1">
        <Sans size="3" my="0.5" color="mediumGray">
          {product.name}
        </Sans>
        <Sans size="2" mt="0.5">
          {brandName}
        </Sans>
        <Sans size="3" my="1">
          {product.variants.map(a => (
            <span key={a.size} style={{ marginRight: 10 }}>
              {a.size}
            </span>
          ))}
        </Sans>
      </Box>
    </ProductContainer>
  )
}

const ProductContainer = styled(Box)`
  margin: 5px;
  overflow: hidden;
  text-align: left;
`

const BrowsePage: NextPage<{}> = withData(props => {
  const [currentCategory, setCurrentCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const { data, loading, fetchMore } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: currentPage * pageSize,
      skip: (currentPage - 1) * pageSize,
    },
  })

  const pageCount = Math.ceil(data?.connection?.aggregate?.count / pageSize)
  console.log("page count: ", data?.connection?.aggregate)
  const products = data?.products?.edges

  return (
    <Layout>
      <Box mt="3">
        <Grid>
          <Row>
            <Col md="3">
              <Sans size="4">Categories</Sans>
              {data?.categories.map(category => {
                return (
                  <Sans size="3" key={category.slug} my="3" opacity="0.5">
                    {category.name}
                  </Sans>
                )
              })}
            </Col>
            <Col md="9">
              <Row>
                {(products || []).map((product, i) => (
                  <Col col md="4" sm="6">
                    {renderItem({ item: product }, i)}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Paginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={data => {
              setCurrentPage(data.selected)
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Grid>
      </Box>
    </Layout>
  )
})

export default BrowsePage
