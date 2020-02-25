import React, { useEffect } from "react"
import { NextPage } from "next"
import { gql } from "apollo-boost"
import { useState } from "react"
import { get } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { imageResize } from "../../utils/imageResize"
import withData from "../../lib/apollo"
import { Layout, Flex } from "../../components"
import { Sans, fontFamily } from "../../components/Typography/Typography"
import { Box } from "../../components/Box"
import { Grid, Row, Col } from "../../components/Grid"
import styled, { CSSObject } from "styled-components"
import Paginate from "react-paginate"
import { color } from "../../helpers"
import Link from "next/link"
import { useRouter } from "next/router"
import { VariantSizes } from "../../components/VariantSizes"

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
          slug
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
      <Link href="/product/[Product]" as={`/product/${product.slug}`}>
        <div>
          <img src={resizedImage} />
          <Box py="1" pb="2">
            <Sans size="3" mt="0.5">
              {brandName}
            </Sans>
            <Sans size="2" my="0.5" color="black100">
              {product.name}
            </Sans>
            <VariantSizes variants={product.variants} size="1" />
          </Box>
        </div>
      </Link>
    </ProductContainer>
  )
}

const ProductContainer = styled(Box)`
  margin: 5px;
  overflow: hidden;
  text-align: left;
`

export const BrowsePage: NextPage<{}> = withData(props => {
  const router = useRouter()
  const { query } = router

  console.log(router)

  const [currentCategory, setCurrentCategory] = useState(query.category || "all")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 18
  const { data, loading, fetchMore } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: currentPage * pageSize,
      skip: (currentPage - 1) * pageSize,
    },
  })

  // useEffect(() => {
  //   router.push(`${router.asPath}/?page=${currentPage}`, null, { shallow: true })
  // }, [currentPage])

  useEffect(() => {
    setCurrentCategory(query.category)
  }, [query.category])

  const pageCount = Math.ceil(data?.connection?.aggregate?.count / pageSize)
  const products = data?.products?.edges
  const categories = [{ slug: "all", name: "All" }, ...(data?.categories ?? [])]

  return (
    <Layout>
      <Box mt="3">
        <Grid>
          <Row>
            <Col md="3">
              <Sans size={["4", "6"]}>Categories</Sans>
              {categories.map(category => {
                const isActive = currentCategory === category.slug
                return (
                  <Link href="/browse/[category]" as={`/browse/${category.slug}`} key={category.slug}>
                    <Sans size={["3", "5"]} key={category.slug} my="3" opacity={isActive ? 1.0 : 0.5}>
                      {category.name}
                    </Sans>
                  </Link>
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
          <Flex align-items="end">
            <Pagination>
              <Paginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={data => {
                  console.log(data)
                  setCurrentPage(data.selected + 1)
                  window && window.scrollTo(0, 0)
                }}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Pagination>
          </Flex>
        </Grid>
      </Box>
    </Layout>
  )
})

const Pagination = styled.div`
  margin-left: auto;
  .pagination {
    & li {
      font-family: ${fontFamily.sans.medium as CSSObject};
      display: inline-block;
      margin-right: 5px;
      color: ${color("black50")};
      width: 40px;
      height: 40px;
      text-align: center;

      &.active {
        color: ${color("black100")};
      }

      &.previous,
      &.next {
        width: auto;
      }
    }
  }
`

export default BrowsePage
