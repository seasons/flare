import { AvailabilityFilters } from "components/Browse/AvailabilityFilters"
import { BrowseSizeFilters } from "components/Browse/BrowseSizeFilters"
import { ColorFilters } from "components/Browse/ColorFilters"
import { PriceFilters } from "components/Browse/PriceFilters"
import { SortDropDown } from "components/Browse/SortDropDown"
import { TriageModal } from "components/Browse/TriageModal"
import { filter as filterFragment } from "graphql-anywhere"
import { sans as sansSize } from "helpers/typeSizes"
import { useAuthContext } from "lib/auth/AuthContext"
import { SavedTab_Query } from "mobile/Account/SavedAndHistory/queries"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { GET_PRODUCT } from "queries/productQueries"
import React, { useEffect, useMemo, useState } from "react"
import Paginate from "react-paginate"
import { media } from "styled-bootstrap-grid"
import styled, { CSSObject } from "styled-components"

import { gql, useLazyQuery, useQuery } from "@apollo/client"
import {
  BrowseProductsNotificationBar, ProductGridItem, ProductGridItem_Product
} from "@seasons/eclipse"

import { Flex, Layout, Spacer } from "../../components"
import { Box } from "../../components/Box"
import { BrowseFilters } from "../../components/Browse"
import { MobileFilters } from "../../components/Browse/MobileFilters"
import { Col, Grid, Row } from "../../components/Grid"
import { Media } from "../../components/Responsive"
import { fontFamily, Sans } from "../../components/Typography/Typography"
import { color } from "../../helpers"
import { GET_BROWSE_PRODUCTS } from "../../queries/brandQueries"
import { Schema, screenTrack, useTracking } from "../../utils/analytics"

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

const pageSize = 24

export enum OrderBy {
  publishedAt_DESC = "publishedAt_DESC",
  retailPrice_ASC = "retailPrice_ASC",
  retailPrice_DESC = "retailPrice_DESC",
  discountedPrice_ASC = "discountedPrice_ASC",
  discountedPrice_DESC = "discountedPrice_DESC",
}

export interface FilterParams {
  tops?: string[]
  bottoms?: string[]
  available?: boolean
  forSaleOnly?: boolean
  colors?: string[]
  categoryName?: string
  brandName?: string
  triage?: "waitlisted" | "approved"
  page: number
  orderBy: OrderBy
  priceRange?: [number, number]
}

const setInitialUrl = ({ isSignedIn, setParams }) => {
  const params = new URLSearchParams(document.location.search)

  const availableParam = params.get("available")
  const priceRangeParam = params.get("priceRange")
  const forSaleParam = params.get("forSale")

  let routerAvailableOnly
  if (availableParam && availableParam === "true") {
    routerAvailableOnly = true
  } else if (availableParam && availableParam === "false") {
    routerAvailableOnly = null
  } else if (isSignedIn !== null) {
    routerAvailableOnly = isSignedIn
  }

  const priceRange = priceRangeParam
    ?.toString()
    ?.split("-")
    ?.map((x) => parseInt(x))

  setParams({
    tops: params.get("tops")?.toString().split(" "),
    bottoms: params.get("bottoms")?.toString().split(" "),
    available: routerAvailableOnly ?? null,
    forSaleOnly: (forSaleParam && forSaleParam === "true") ?? null,
    colors: params.get("colors")?.toString().split(" ") ?? null,
    orderBy: (params.get("orderBy") as OrderBy) ?? OrderBy.publishedAt_DESC,
    categoryName: params.get("category") ?? "all",
    brandName: params.get("brand") ?? "all",
    page: params.get("page") ?? 1,
    triage: params.get("triage") ?? null,
    priceRange: priceRange ?? null,
  } as FilterParams)
}

const updateUrl = ({ router, params }) => {
  const {
    tops,
    colors,
    bottoms,
    available,
    forSaleOnly,
    brandName,
    categoryName,
    page,
    orderBy,
    triage,
    priceRange,
  } = params

  const orderByParam = orderBy ? `&orderBy=${orderBy}` : ""
  const bottomsParam = bottoms?.length ? "&bottoms=" + bottoms.join("+") : ""
  const topsParam = tops?.length ? "&tops=" + tops.join("+") : ""
  const colorsParam = colors?.length ? "&colors=" + colors.join("+") : ""
  const availableParam = available ? "&available=true" : ""
  const forSaleParam = forSaleOnly ? "&forSale=true" : ""
  const triageParam = triage ? `&triage=${triage}` : ""
  const priceRangeParam = priceRange?.length === 2 ? `&priceRange=${priceRange[0]}-${priceRange[1]}` : ""
  const categoryParam = `&category=${categoryName ? categoryName : "all"}`
  const brandParam = `&brand=${brandName ? brandName : "all"}`
  const url = `/browse?page=${page}${categoryParam}${brandParam}${bottomsParam}${topsParam}${availableParam}${colorsParam}${forSaleParam}${triageParam}${orderByParam}${priceRangeParam}`

  router.push(url, undefined, {
    shallow: true,
  })
}

export const BrowsePage: NextPage<{}> = screenTrack(() => ({
  page: Schema.PageNames.BrowsePage,
  path: "/browse",
}))(() => {
  const {
    authState: { isSignedIn },
  } = useAuthContext()
  const [showApprovedModal, setShowApprovedModal] = useState(false)
  const [showWaitlistedModal, setShowWaitlistedModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tracking = useTracking()
  const router = useRouter()

  const { previousData: previousMenuData, data: menuData = previousMenuData } = useQuery(Browse_Query)
  const [params, setParams] = useState<FilterParams>({
    tops: null,
    bottoms: null,
    available: null,
    forSaleOnly: null,
    priceRange: null,
    colors: null,
    categoryName: "all",
    brandName: "all",
    triage: null,
    orderBy: OrderBy.publishedAt_DESC,
    page: 1,
  })
  const { authState, toggleLoginModal } = useAuthContext()

  const {
    tops,
    colors,
    bottoms,
    available,
    forSaleOnly,
    brandName,
    categoryName,
    page,
    orderBy,
    triage,
    priceRange,
  } = params

  useEffect(() => {
    if (!mounted) {
      if (typeof document !== "undefined") {
        setInitialUrl({ isSignedIn, setParams })
      }
      setMounted(true)
    }
  }, [setInitialUrl, setMounted])

  const skip = page ? (page - 1) * pageSize : 0

  const { previousData, data = previousData, error, loading } = useQuery(GET_BROWSE_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      tops,
      colors,
      bottoms,
      available,
      priceRange,
      forSaleOnly,
      brandName,
      categoryName,
      orderBy,
      skip,
      first: pageSize,
    },
  })

  useEffect(() => {
    if (triage && triage === "waitlisted") {
      setShowWaitlistedModal(true)
    } else if (triage && triage === "approved") {
      setShowApprovedModal(true)
    }
  }, [triage])

  useEffect(() => {
    if (mounted) {
      updateUrl({ router, params })
    }
  }, [params])

  useEffect(() => {
    if (typeof window !== "undefined") {
      window?.scrollTo(0, 0)
    }
  }, [page])

  const aggregateCount = data?.connection?.aggregate?.count
  const pageCount = Math.ceil(aggregateCount / pageSize)
  const products = data?.products?.edges
  const productsOrArray = products || [...Array(pageSize)]

  const categories = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.categories ?? [])], [menuData])
  const brands = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.brands ?? [])], [menuData])
  const showPagination = !!products?.length && aggregateCount > 20

  const onSetParams = (newParams) => {
    setParams(newParams)
  }

  return (
    <>
      <Layout
        footerBottomPadding={["59px", "0px"]}
        PageNotificationBar={() => <BrowseProductsNotificationBar isLoggedIn={isSignedIn} />}
      >
        <Media lessThan="md">
          <Spacer mb={54} />
        </Media>
        <Media lessThan="md">
          <AvailabilityFilters params={params} setParams={onSetParams} breakpoint="mobile" />
          <MobileFilters
            BrandsListComponent={
              <BrowseFilters
                setParam={(brandName) => onSetParams({ ...params, brandName, page: 1 })}
                listItems={brands}
                title="Designers"
                hideTitle
                currentBrand={brandName}
                currentCategory={categoryName}
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
                setParam={(categoryName) => onSetParams({ ...params, categoryName, page: 1 })}
                title="Categories"
                currentCategory={categoryName}
                listItems={categories}
                hideTitle
                currentBrand={brandName}
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
          />
        </Media>
        <Spacer mb={[0, 5]} />
        <Grid px={[0, 2, 2, 2, 2]}>
          <Row style={{ minHeight: "calc(100vh - 160px)" }}>
            <Col md="2" sm="12">
              <Media greaterThanOrEqual="md">
                <FixedBox>
                  <Box pr={1}>
                    <Spacer mb={5} />
                    <BrowseFilters
                      currentCategory={categoryName}
                      title="Categories"
                      setParam={(categoryName) => onSetParams({ ...params, categoryName, page: 1 })}
                      listItems={categories}
                      currentBrand={brandName}
                    />
                    <Spacer mb={5} />
                    <AvailabilityFilters setParams={setParams} params={params} breakpoint="desktop" />
                    <Spacer mb={5} />
                    <PriceFilters setParams={setParams} params={params} />
                    <Spacer mb={5} />
                    <BrowseSizeFilters setParams={setParams} params={params} />
                    <Spacer mb={5} />
                    <ColorFilters setParams={onSetParams} params={params} />
                    <Spacer mb={5} />
                    <BrowseFilters
                      title="Designers"
                      setParam={(brandName) => onSetParams({ ...params, brandName, page: 1 })}
                      currentCategory={categoryName}
                      listItems={brands}
                      currentBrand={brandName}
                    />
                    <Spacer mb={2} />
                  </Box>
                </FixedBox>
              </Media>
            </Col>
            <FullWidthMedia lessThan="md">
              <Flex width="100%" flexDirection="row" justifyContent="space-between" px={2} pt={[0, 2]} pb={2}>
                <Sans size="4">Browse</Sans>
                <SortDropDown orderBy={orderBy} onClickOrderBy={(v) => onSetParams({ ...params, orderBy: v })} />
              </Flex>
            </FullWidthMedia>
            <Col md="10" sm="12">
              <Row>
                <FullWidthMedia greaterThanOrEqual="md">
                  <Flex width="100%" flexDirection="row" justifyContent="flex-end" pb={2}>
                    <SortDropDown orderBy={orderBy} onClickOrderBy={(v) => onSetParams({ ...params, orderBy: v })} />
                  </Flex>
                </FullWidthMedia>
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
                    <Pagination currentPage={params.page} pageCount={pageCount}>
                      <Paginate
                        previousLabel="previous"
                        nextLabel="next"
                        breakClassName="break-me"
                        pageCount={pageCount}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={14}
                        forcePage={params.page - 1}
                        onPageChange={(data) => {
                          const nextPage = data.selected + 1
                          onSetParams({ ...params, page: nextPage })
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
        <TriageModal
          onClose={() => {
            setShowApprovedModal(false)
            setShowWaitlistedModal(false)
          }}
          show={showWaitlistedModal || showApprovedModal}
          type={showWaitlistedModal ? "waitlisted" : "approved"}
        />
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

const FullWidthMedia = styled(Media)`
  width: 100%;
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
