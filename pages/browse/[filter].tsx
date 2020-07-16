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
import { useRouter } from "next/router"
import { media } from "styled-bootstrap-grid"
import { ProductGridItem } from "../../components/Product/ProductGridItem"
import { Media } from "../../components/Responsive"
import { MobileFilters } from "../../components/Browse/MobileFilters"
import { BrowseFilters } from "../../components/Browse"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"

const GET_BROWSE_PRODUCTS = gql`
  query GetBrowse(
    $categoryName: String!
    $brandName: String!
    $first: Int!
    $skip: Int!
    $orderBy: ProductOrderByInput!
    $brandOrderBy: BrandOrderByInput!
  ) {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
      name
      children {
        slug
      }
    }
    brands(orderBy: $brandOrderBy, where: { products_some: { id_not: null }, name_not: null }) {
      id
      slug
      name
    }
    connection: productsConnection(category: $categoryName, brand: $brandName, where: { status: Available }) {
      aggregate {
        count
      }
    }
    products: productsConnection(
      category: $categoryName
      brand: $brandName
      orderBy: $orderBy
      first: $first
      skip: $skip
      where: { status: Available }
    ) {
      aggregate {
        count
      }
      edges {
        node {
          id
          slug
          name
          images {
            id
            url
          }
          description
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

export const BrowsePage: NextPage<{}> = screenTrack(() => ({
  page: Schema.PageNames.BrowsePage,
  path: "/browse",
}))(
  withData(() => {
    const tracking = useTracking()
    const router = useRouter()
    const { query } = router

    const [currentCategory, setCurrentCategory] = useState(query.category || "all")
    const [currentBrand, setCurrentBrand] = useState(query.brand || "all")
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20
    const skip = (currentPage - 1) * pageSize

    const { data, error, loading } = useQuery(GET_BROWSE_PRODUCTS, {
      variables: {
        brandName: currentBrand,
        categoryName: currentCategory,
        first: pageSize,
        orderBy: "publishedAt_DESC",
        brandOrderBy: "name_ASC",
        skip,
      },
    })

    if (error) {
      console.log("error browse.tsx ", error)
    }

    useEffect(() => {
      if (query.brand) {
        setCurrentBrand(query.brand)
      }
      if (query.category) {
        setCurrentCategory(query.category)
      }
    }, [query])

    useEffect(() => {
      window && window.scrollTo(0, 0)
    }, [data])

    const aggregateCount = data?.connection?.aggregate?.count
    const pageCount = Math.ceil(aggregateCount / pageSize)
    const products = data?.products?.edges
    const categories = [{ slug: "all", name: "All" }, ...(data?.categories ?? [])]
    const brands = [{ slug: "all", name: "All" }, ...(data?.brands ?? [])]
    const showPagination = !!products?.length && aggregateCount > 20

    return (
      <>
        <Layout fixedNav>
          <Media lessThan="md">
            <MobileFilters
              BrandsListComponent={
                <BrowseFilters
                  setCurrentPage={setCurrentPage}
                  currentCategory={currentCategory}
                  listItems={brands}
                  title="Designers"
                  hideTitle
                  currentBrand={currentBrand}
                />
              }
              CategoriesListComponent={
                <BrowseFilters
                  title="Categories"
                  setCurrentPage={setCurrentPage}
                  currentCategory={currentCategory}
                  listItems={categories}
                  hideTitle
                  currentBrand={currentBrand}
                />
              }
            />
          </Media>
          <Spacer mb={[0, 5]} />
          <Grid>
            <Row style={{ minHeight: "calc(100vh - 160px)" }}>
              <Col md="2" xs="12" mx={["2", "0"]}>
                <Media greaterThanOrEqual="md">
                  <FixedBox>
                    <Box pr={1}>
                      <BrowseFilters
                        setCurrentPage={setCurrentPage}
                        currentCategory={currentCategory}
                        title="Categories"
                        listItems={categories}
                        currentBrand={currentBrand}
                      />
                      <Spacer mb={3} />
                      <BrowseFilters
                        setCurrentPage={setCurrentPage}
                        title="Designers"
                        currentCategory={currentCategory}
                        listItems={brands}
                        currentBrand={currentBrand}
                      />
                      <Spacer mb={2} />
                    </Box>
                  </FixedBox>
                </Media>
              </Col>
              <Media lessThan="md">
                <Box px={2} pt={2}>
                  <Sans size="4">Browse</Sans>
                </Box>
              </Media>
              <Col md="10" xs="12">
                <Row>
                  {data && !products?.length ? (
                    <Flex alignItems="center" justifyContent="center" style={{ width: "100%" }}>
                      <Sans size="3" style={{ textAlign: "center" }}>
                        Your filters returned no results.
                      </Sans>
                    </Flex>
                  ) : (
                    (products || []).map((product, i) => (
                      <Col col sm="3" xs="6" key={i}>
                        <Box pt={[2, 0]} pb={[2, 5]}>
                          <ProductGridItem product={product?.node} loading={loading} />
                        </Box>
                      </Col>
                    ))
                  )}
                </Row>
                <Row>
                  <Flex align-items="center" mt={2} mb={4} width="100%">
                    {showPagination && (
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
                            tracking.trackEvent({
                              actionName: Schema.ActionNames.ProductPageNumberChanged,
                              actionType: Schema.ActionTypes.Tap,
                              page: data.selected + 1,
                            })
                          }}
                          containerClassName="pagination"
                          previousLinkClassName="previous-button"
                          nextLinkClassName="next-button"
                          subContainerClassName="pages pagination"
                          activeClassName="active"
                        />
                      </Pagination>
                    )}
                  </Flex>
                </Row>
              </Col>
            </Row>
            <Spacer pb={["59px", 0]} />
          </Grid>
        </Layout>
        <Spacer pb={["59px", 0]} />
      </>
    )
  })
)

const Pagination = styled.div<{ currentPage: number; pageCount: number }>`
  ${media.md`
    margin: 0 auto;
  `};

  .pagination {
    padding: 0;
    text-align: center;

    .previous-button,
    .previous {
      display: ${(p) => (p.currentPage === 1 ? "none" : "inline-block")};
    }

    .next-button,
    .next {
      display: ${(p) => (p.currentPage === p.pageCount ? "none" : "inline-block")};
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
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const ActiveLine = styled.div`
  width: 16px;
  height: 2px;
  margin-right: 8px;
  background-color: ${color("black100")};
`

export default BrowsePage
