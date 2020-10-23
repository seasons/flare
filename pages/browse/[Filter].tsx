import { useQuery } from "@apollo/client"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import Paginate from "react-paginate"
import { media } from "styled-bootstrap-grid"
import styled, { CSSObject } from "styled-components"
import { Flex, Layout, Spacer } from "../../components"
import { Box } from "../../components/Box"
import { BrowseFilters } from "../../components/Browse"
import { MobileFilters } from "../../components/Browse/MobileFilters"
import { Col, Grid, Row } from "../../components/Grid"
import { BRAND_LIST } from "../../components/Homepage/Brands"
import { ProductGridItem } from "../../components/Product/ProductGridItem"
import { Media } from "../../components/Responsive"
import { fontFamily, Sans } from "../../components/Typography/Typography"
import { color } from "../../helpers"
import { initializeApollo } from "../../lib/apollo"
import { GET_BROWSE_BRANDS_AND_CATEGORIES, GET_BROWSE_PRODUCTS, GET_CATEGORIES } from "../../queries/brandQueries"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"

const pageSize = 20

export const BrowsePage: NextPage<{}> = screenTrack(() => ({
  page: Schema.PageNames.BrowsePage,
  path: "/browse",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  console.log(router)

  const filter = router.query?.Filter || "all+all"

  const queries = filter?.toString().split("+")

  const [category, brand] = queries

  const [currentCategory, setCurrentCategory] = useState(category)
  const [currentBrand, setCurrentBrand] = useState(brand)
  const [currentPage, setCurrentPage] = useState(1)
  const { data: menuData } = useQuery(GET_BROWSE_BRANDS_AND_CATEGORIES, {
    variables: {
      brandOrderBy: "name_ASC",
      brandSlugs: BRAND_LIST,
    },
  })

  const skip = (currentPage - 1) * pageSize

  const { data, error, loading, refetch } = useQuery(GET_BROWSE_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      brandName: currentBrand,
      categoryName: currentCategory,
      first: pageSize,
      orderBy: "publishedAt_DESC",
      skip,
    },
  })

  useEffect(() => {
    window && window.scrollTo(0, 0)
  }, [currentPage, refetch])

  if (error) {
    console.log("error browse.tsx ", error)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [currentBrand, currentCategory, setCurrentPage])

  useEffect(() => {
    if (filter) {
      const queries = filter?.toString().split("+")
      const [category, brand] = queries

      setCurrentBrand(brand)
      setCurrentCategory(category)
    }
  }, [filter, setCurrentBrand, setCurrentCategory])

  const aggregateCount = data?.connection?.aggregate?.count
  const pageCount = Math.ceil(aggregateCount / pageSize)
  const products = data?.products?.edges
  const productsOrArray = products || [...Array(pageSize)]

  const categories = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.categories ?? [])], [menuData])
  const brands = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.brands ?? [])], [menuData])
  const showPagination = !!products?.length && aggregateCount > 20

  return (
    <>
      <Layout fixedNav footerBottomPadding={["59px", "0px"]}>
        <Media lessThan="md">
          <MobileFilters
            BrandsListComponent={
              <BrowseFilters
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
                currentCategory={currentCategory}
                listItems={categories}
                hideTitle
                currentBrand={currentBrand}
              />
            }
          />
        </Media>
        <Spacer mb={[0, 5]} />
        <Grid px={[0, 2, 2, 5, 5]}>
          <Row style={{ minHeight: "calc(100vh - 160px)" }}>
            <Col md="2" sm="12">
              <Media greaterThanOrEqual="md">
                <FixedBox>
                  <Box pr={1}>
                    <BrowseFilters
                      currentCategory={currentCategory}
                      title="Categories"
                      listItems={categories}
                      currentBrand={currentBrand}
                    />
                    <Spacer mb={3} />
                    <BrowseFilters
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
            <Col md="10" sm="12">
              <Row>
                {data && !products?.length ? (
                  <Flex alignItems="center" justifyContent="center" style={{ width: "100%" }}>
                    <Sans size="3" style={{ textAlign: "center" }}>
                      Your filters returned no results.
                    </Sans>
                  </Flex>
                ) : (
                  productsOrArray.map((product, i) => {
                    return (
                      <Col sm="3" xs="6" key={i}>
                        <Box pt={[2, 2, 2, 0, 0]} pb={[2, 2, 2, 5, 5]}>
                          <ProductGridItem product={product?.node} loading={loading} />
                        </Box>
                      </Col>
                    )
                  })
                )}
              </Row>
              <Row>
                <Flex align-items="center" mt={2} mb={[0, 4]} width="100%">
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
        </Grid>
        <Spacer mb={[0, 5]} />
      </Layout>
    </>
  )
})

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const response = await apolloClient.query({
    query: GET_CATEGORIES,
  })

  const paths = [{ params: { Filter: `all+all` } }]

  const categories = response?.data?.categories

  categories?.forEach((cat) => {
    paths.push({ params: { Filter: `${cat.slug}+all` } })

    BRAND_LIST.forEach((brandSlug) => {
      paths.push({ params: { Filter: `${cat.slug}+${brandSlug}` } })
    })
  })

  BRAND_LIST.forEach((brandSlug) => {
    paths.push({ params: { Filter: `all+${brandSlug}` } })
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()

  const filter = params?.Filter || "all+all"

  const queries = filter?.toString().split("+")
  const [category, brand] = queries

  await apolloClient.query({
    query: GET_BROWSE_PRODUCTS,
    variables: {
      brandName: brand,
      categoryName: category,
      first: pageSize,
      orderBy: "publishedAt_DESC",
      skip: 0,
    },
  })

  await apolloClient.query({
    query: GET_BROWSE_BRANDS_AND_CATEGORIES,
    variables: {
      brandOrderBy: "name_ASC",
      brandSlugs: BRAND_LIST,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

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
  position: relative;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

export default BrowsePage
