import { BrowseSizeFilters } from "components/Browse/BrowseSizeFilters"
import { filter as filterFragment } from "graphql-anywhere"
import { sans as sansSize } from "helpers/typeSizes"
import { useAuthContext } from "lib/auth/AuthContext"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import Paginate from "react-paginate"
import { media } from "styled-bootstrap-grid"
import styled, { CSSObject } from "styled-components"

import { gql, useQuery } from "@apollo/client"
import { ProductGridItem, ProductGridItem_Product } from "@seasons/eclipse"

import { Flex, Layout, Spacer } from "../../components"
import { Box } from "../../components/Box"
import { BrowseFilters } from "../../components/Browse"
import { MobileFilters } from "../../components/Browse/MobileFilters"
import { Col, Grid, Row } from "../../components/Grid"
import { Media } from "../../components/Responsive"
import { fontFamily, Sans } from "../../components/Typography/Typography"
import { color } from "../../helpers"
import { initializeApollo } from "../../lib/apollo"
import { GET_BROWSE_PRODUCTS } from "../../queries/brandQueries"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"
import { SavedTab_Query } from "queries/bagQueries"
import { GET_PRODUCT } from "queries/productQueries"

const isProduction = process.env.ENVIRONMENT === "production"

export const Browse_Query = gql`
  query Browse_Query {
    categories(where: { visible: true }, orderBy: name_ASC) {
      id
      slug
      name
      children {
        slug
      }
    }
    brands(orderBy: name_ASC, where: { products_some: { id_not: null }, name_not: null, published: true }) {
      id
      slug
      name
    }
  }
`

const pageSize = 21

export interface SizeFilterParams {
  currentTops: string[]
  currentBottoms: string[]
  availableOnly: boolean
}

export const BrowsePage: NextPage<{}> = screenTrack(() => ({
  page: Schema.PageNames.BrowsePage,
  path: "/browse",
}))(() => {
  const tracking = useTracking()
  const router = useRouter()
  const filter = router.query?.Filter || "all+all"
  const _tops = router.query?.tops as string
  const tops = _tops?.split(" ")
  const _bottoms = router.query?.bottoms as string
  const bottoms = _bottoms?.split(" ")
  const available = (router.query?.available && router.query?.available === "available") ?? null
  const page = router.query?.page || 1

  const baseFilters = filter?.toString().split("+")

  const [category, brand] = baseFilters
  const [mounted, setMounted] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(category)
  const [currentBrand, setCurrentBrand] = useState(brand)
  const [currentPage, setCurrentPage] = useState(Number(page))
  const { previousData: previousMenuData, data: menuData = previousMenuData } = useQuery(Browse_Query)
  const [currentURL, setCurrentURL] = useState("")
  const [paramsString, setParamsString] = useState("")
  const [params, setParams] = useState<SizeFilterParams>({
    currentTops: tops ?? null,
    currentBottoms: bottoms ?? null,
    availableOnly: available ?? null,
  })
  const [initialPageLoad, setInitialPageLoad] = useState(false)
  const { authState, toggleLoginModal } = useAuthContext()
  const { currentTops, currentBottoms, availableOnly } = params

  const skip = (currentPage - 1) * pageSize

  const { previousData, data = previousData, error, loading } = useQuery(GET_BROWSE_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      tops: currentTops,
      bottoms: currentBottoms,
      available: availableOnly,
      brandName: currentBrand,
      categoryName: currentCategory,
      first: pageSize,
      orderBy: "publishedAt_DESC",
      skip,
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      window?.scrollTo(0, 0)
    }
  }, [currentPage])

  if (error) {
    console.log("error browse.tsx ", error)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const paramToURL = () => {
      const bottomsParam = currentBottoms?.length ? "&bottoms=" + currentBottoms.join("+") : ""
      const topsParam = currentTops?.length ? "&tops=" + currentTops.join("+") : ""
      const availableParam = availableOnly ? "&available=true" : ""
      return `${bottomsParam}${topsParam}${availableParam}`
    }
    const newParams = paramToURL()

    if (mounted) {
      const queries = filter?.toString().split("+")
      const [category, brand] = queries
      let newURL
      if (
        !initialPageLoad &&
        ((!!available && available !== availableOnly) ||
          (bottoms?.length && !currentBottoms?.length) ||
          (tops?.length && !currentTops?.length))
      ) {
        // These are the initial params set on page load which happen after the page mounts since it's SSG
        setParams({
          availableOnly: !!available && available !== availableOnly ? available : null,
          currentBottoms: !!bottoms?.length && !currentBottoms?.length ? bottoms : [],
          currentTops: tops?.length && !currentTops?.length ? tops : [],
        })
        setInitialPageLoad(true)
      } else {
        // After the initial page load handle the URL and params through state
        if ((!!paramsString && newParams !== paramsString) || category !== currentCategory || currentBrand !== brand) {
          setCurrentPage(1)
          newURL = `/browse/${currentCategory}+${currentBrand}?page=1${newParams}`
          if (typeof window !== "undefined") {
            window?.scrollTo(0, 0)
          }
        } else {
          newURL = `/browse/${currentCategory}+${currentBrand}?page=${currentPage}${newParams}`
        }
        if (currentURL !== newURL) {
          setCurrentURL(newURL)
          router.push(newURL, undefined, {
            shallow: true,
          })
        }
      }
      setParamsString(newParams)
    }
  }, [
    filter,
    setCurrentBrand,
    setCurrentCategory,
    currentPage,
    setCurrentPage,
    currentBrand,
    currentCategory,
    currentTops,
    currentBottoms,
    availableOnly,
    tops,
    bottoms,
    available,
    mounted,
    initialPageLoad,
  ])

  const aggregateCount = data?.connection?.aggregate?.count
  // const pageCount = 15
  const pageCount = Math.ceil(aggregateCount / pageSize)
  const products = data?.products?.edges
  const productsOrArray = products || [...Array(pageSize)]

  const categories = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.categories ?? [])], [menuData])
  const brands = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.brands ?? [])], [menuData])
  const showPagination = !!products?.length && aggregateCount > 20

  return (
    <>
      <Layout footerBottomPadding={["59px", "0px"]}>
        <Media lessThan="md">
          <MobileFilters
            BrandsListComponent={
              <BrowseFilters
                setParam={setCurrentBrand}
                listItems={brands}
                title="Designers"
                hideTitle
                currentBrand={currentBrand}
                currentCategory={currentCategory}
                listItemStyle={{
                  textDecoration: "underline",
                  fontSize: `${sansSize("7").fontSize}px`,
                  lineHeight: `${sansSize("7").lineHeight}px`,
                  color: color("black100"),
                  opacity: 1,
                }}
                listItemSpacing="12px"
              />
            }
            CategoriesListComponent={
              <BrowseFilters
                setParam={setCurrentCategory}
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
        <Grid px={[0, 2, 2, 2, 2]}>
          <Row style={{ minHeight: "calc(100vh - 160px)" }}>
            <Col md="2" sm="12">
              <Media greaterThanOrEqual="md">
                <FixedBox>
                  <Box pr={1}>
                    <BrowseFilters
                      currentCategory={currentCategory}
                      title="Categories"
                      setParam={setCurrentCategory}
                      listItems={categories}
                      currentBrand={currentBrand}
                    />
                    <Spacer mb={5} />
                    <BrowseSizeFilters setParams={setParams} params={params} />
                    <Spacer mb={5} />
                    <BrowseFilters
                      title="Designers"
                      setParam={setCurrentBrand}
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
                      <Col sm="4" xs="6" key={i}>
                        <Box pt={[0.5, 0.5, 0.5, 0, 0]} pb={[0.5, 0.5, 0.5, 5, 5]}>
                          <ProductGridItem
                            product={product?.node ? filterFragment(ProductGridItem_Product, product?.node) : null}
                            loading={loading}
                            authState={authState}
                            onShowLoginModal={() => toggleLoginModal(true)}
                            saveProductButtonRefetchQueries={[
                              { query: SavedTab_Query },
                              { query: GET_PRODUCT, variables: { slug: product?.node?.slug } },
                            ]}
                          />
                        </Box>
                      </Col>
                    )
                  })
                )}
              </Row>
              <Row>
                <Flex alignItems="center" mt={2} mb={[0, 4]} width="100%" justifyContent="center">
                  {showPagination && (
                    <Pagination currentPage={currentPage} pageCount={pageCount}>
                      <Paginate
                        previousLabel="previous"
                        nextLabel="next"
                        breakClassName="break-me"
                        pageCount={pageCount}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={14}
                        forcePage={currentPage - 1}
                        onPageChange={(data) => {
                          const nextPage = data.selected + 1
                          setCurrentPage(nextPage)
                          tracking.trackEvent({
                            actionName: Schema.ActionNames.ProductPageNumberChanged,
                            actionType: Schema.ActionTypes.Tap,
                            page: nextPage,
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

const Pagination = styled.div<{ currentPage: number; pageCount: number }>`
  ${media.md`
    margin: 0 auto;
  `};

  .pagination {
    padding: 0;
    text-align: center;

    .break-me {
      display: none;
    }

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
      margin-right: 6px;
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
        padding: 5px;
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
