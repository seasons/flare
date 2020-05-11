import React, { useEffect } from "react"
import { NextPage } from "next"
import { gql } from "apollo-boost"
import { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import withData from "../../lib/apollo"
import { Layout, Flex, Spacer } from "../../components"
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
import { BrowseLoader, CategoryLoader } from "../../components/Browse/BrowseLoader"
import { Media } from "../../components/Responsive"

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
  const pageSize = 20
  const skip = (currentPage - 1) * pageSize

  const { data } = useQuery(GET_BROWSE_PRODUCTS, {
    variables: {
      name: currentCategory,
      first: pageSize,
      skip,
    },
  })

  useEffect(() => {
    setCurrentCategory(query.category)
  }, [query.category])

  useEffect(() => {
    window && window.scrollTo(0, 0)
  }, [data])

  const pageCount = Math.ceil(data?.connection?.aggregate?.count / pageSize)
  const products = data?.products?.edges
  const categories = [{ slug: "all", name: "All" }, ...(data?.categories ?? [])]

  const Categories = () => {
    return (
      <>
        <Sans size="3">Categories</Sans>
        <Spacer mb={2} />
        {!data ? (
          <CategoryLoader />
        ) : (
          categories.map((category) => {
            const isActive = currentCategory === category.slug
            return (
              <div onClick={() => setCurrentPage(1)} key={category.slug}>
                <Link href="/browse/[category]" as={`/browse/${category.slug}`}>
                  <Flex flexDirection="row" alignItems="center">
                    {isActive && <ActiveLine />}
                    <Sans size="3" my="2" opacity={isActive ? 1.0 : 0.5} style={{ cursor: "pointer" }}>
                      {category.name}
                    </Sans>
                  </Flex>
                </Link>
                <Spacer mb={1} />
              </div>
            )
          })
        )}
      </>
    )
  }

  return (
    <Layout fixedNav>
      <Box mt={["76px", "100px"]}>
        <Grid>
          <Row>
            <Col md="2" xs="12" mx={["2", "0"]}>
              <Media greaterThanOrEqual="md">
                <FixedBox>
                  <Categories />
                </FixedBox>
              </Media>
              <Media lessThan="md">
                <Categories />
              </Media>
            </Col>
            <Col md="10" xs="12">
              <Row>
                {(products || []).map((product, i) => (
                  <Col col sm="3" xs="6" key={i}>
                    <ProductGridItem product={product?.node} />
                  </Col>
                ))}
              </Row>
              <Row>
                <Flex align-items="center" mt={2} mb={4} width="100%">
                  <Pagination currentPage={currentPage} pageCount={pageCount}>
                    <Paginate
                      previousLabel="previous"
                      nextLabel="next"
                      breakClassName="break-me"
                      pageCount={pageCount}
                      marginPagesDisplayed={25}
                      pageRangeDisplayed={2}
                      forcePage={currentPage - 1}
                      onPageChange={(data) => {
                        setCurrentPage(data.selected + 1)
                      }}
                      containerClassName="pagination"
                      previousLinkClassName="previous-button"
                      nextLinkClassName="next-button"
                      subContainerClassName="pages pagination"
                      activeClassName="active"
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

const Pagination = styled.div<{ currentPage: number; pageCount: number }>`
  ${media.md`
    margin: 0 auto;
  `};

  .pagination {
    padding: 0;
    .previous-button {
      display: ${(p) => (p.currentPage === 1 ? "none" : "block")};
    }

    .next-button {
      display: ${(p) => (p.currentPage === p.pageCount ? "none" : "block")};
    }

    & li {
      cursor: pointer;
      font-family: ${fontFamily.sans.medium as CSSObject};
      display: inline-block;
      margin-right: 5px;
      min-width: 24px;
      height: 24px;
      text-align: center;
      border-radius: 2px;
      color: ${color("black100")};

      &.active {
        background-color: ${color("black10")};
      }

      &.previous,
      &.next {
        width: auto;
      }

      & a {
        height: 24px;
        min-width: 24px;
        top: 2px;
        position: relative;
        & :focus {
          outline: none !important;
        }
      }
    }
  }
`

const FixedBox = styled.div`
  position: absolute;
`

const ActiveLine = styled.div`
  width: 16px;
  height: 2px;
  margin-right: 8px;
  background-color: ${color("black100")};
`

export default BrowsePage
