import React, { useEffect } from "react"
import { NextPage } from "next"
import { gql } from "apollo-boost"
import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
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
import { media } from "styled-bootstrap-grid"
import { ProductGridItem } from "../../components/Product/ProductGridItem"

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
    connection: productsConnection(category: $name, where: { status: Available }) {
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
          modelSize {
            display
          }
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
            internalSize {
              display
            }
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

export const BrowsePage: NextPage<{}> = withData((props) => {
  const router = useRouter()
  const { query } = router

  const [currentCategory, setCurrentCategory] = useState(query.category || "all")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 18
  const { data } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: currentPage * pageSize,
      skip: (currentPage - 1) * pageSize,
    },
  })

  useEffect(() => {
    setCurrentCategory(query.category)
  }, [query.category])

  const pageCount = Math.ceil(data?.connection?.aggregate?.count / pageSize)
  const products = data?.products?.edges
  const categories = [{ slug: "all", name: "All" }, ...(data?.categories ?? [])]

  return (
    <Layout fixedNav>
      <Box mt="100px">
        <Grid>
          <Row>
            <Col md="3" xs="12" mx={["2", "0"]}>
              <Sans size={["4", "6"]}>Categories</Sans>
              {categories.map((category) => {
                const isActive = currentCategory === category.slug
                return (
                  <Link href="/browse/[category]" as={`/browse/${category.slug}`} key={category.slug}>
                    <Sans
                      size={["3", "5"]}
                      key={category.slug}
                      my="3"
                      opacity={isActive ? 1.0 : 0.5}
                      style={{ cursor: "pointer" }}
                    >
                      {category.name}
                    </Sans>
                  </Link>
                )
              })}
            </Col>
            <Col md="9" xs="12">
              <Row>
                {(products || []).map((product, i) => (
                  <Col col sm="4" xs="6">
                    <ProductGridItem product={product?.node} />
                  </Col>
                ))}
              </Row>
              <Row>
                <Flex align-items="center" mt={2} mb={4} width="100%">
                  <Pagination>
                    <Paginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={(data) => {
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
              </Row>
            </Col>
          </Row>
        </Grid>
      </Box>
    </Layout>
  )
})

const Pagination = styled.div`
  ${media.md`
    margin-left: auto;
  `};

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
