import React, { useEffect, useMemo, useRef } from "react"
import { NextPage } from "next"
import { useState } from "react"
import { useQuery } from "@apollo/client"
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
import { initializeApollo } from "../../lib/apollo"
import { GET_BROWSE_PRODUCTS, GET_CATEGORIES, GET_BROWSE_BRANDS_AND_CATEGORIES } from "../../queries/brandQueries"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import brandSlugs from "lib/brands"
import { sans as sansSize } from "helpers/typeSizes"
import { BrowseSizeFilters } from "components/Browse/BrowseSizeFilters"

const pageSize = 20

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
  const scrollRef = useRef(null)
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
  const [currentURL, setCurrentURL] = useState("")
  const [paramsString, setParamsString] = useState("")
  const [params, setParams] = useState<SizeFilterParams>({
    currentTops: tops ?? null,
    currentBottoms: bottoms ?? null,
    availableOnly: available ?? null,
  })
  const [initialPageLoad, setInitialPageLoad] = useState(false)
  const { data: menuData } = useQuery(GET_BROWSE_BRANDS_AND_CATEGORIES, {
    variables: {
      brandOrderBy: "name_ASC",
      brandSlugs,
    },
  })

  const { currentTops, currentBottoms, availableOnly } = params

  const { data: navigationData } = useQuery(NAVIGATION_QUERY)

  const skip = (currentPage - 1) * pageSize

  const { data, error, loading } = useQuery(GET_BROWSE_PRODUCTS, {
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
    scrollRef?.current?.scrollTo(0, 0)
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
          scrollRef?.current?.scrollTo(0, 0)
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
  const pageCount = Math.ceil(aggregateCount / pageSize)
  const products = data?.products?.edges
  const productsOrArray = products || [...Array(pageSize)]

  const categories = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.categories ?? [])], [menuData])
  const brands = useMemo(() => [{ slug: "all", name: "All" }, ...(menuData?.brands ?? [])], [menuData])
  const showPagination = !!products?.length && aggregateCount > 20
  const featuredBrandItems = navigationData?.brands || []

  console.log("data", data)

  return (
    <>
      <Layout fixedNav footerBottomPadding={["59px", "0px"]} brandItems={featuredBrandItems} scrollRef={scrollRef}>
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
        <Grid px={[0, 2, 2, 5, 5]}>
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
                    <Spacer mb={3} />
                    <BrowseSizeFilters setParams={setParams} params={params} />
                    <Spacer mb={3} />
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
                      <Col sm="3" xs="6" key={i}>
                        <Box pt={[0.5, 0.5, 0.5, 0, 0]} pb={[0.5, 0.5, 0.5, 5, 5]}>
                          <ProductGridItem product={product?.node} loading={loading} />
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
                        marginPagesDisplayed={25}
                        pageRangeDisplayed={2}
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

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const response = await apolloClient.query({
    query: GET_CATEGORIES,
  })

  const paths = [{ params: { Filter: `all+all` } }]

  const categories = response?.data?.categories

  categories?.forEach((cat) => {
    paths.push({ params: { Filter: `${cat.slug}+all` } })

    brandSlugs.forEach((brandSlug) => {
      paths.push({ params: { Filter: `${cat.slug}+${brandSlug}` } })
    })
  })

  brandSlugs.forEach((brandSlug) => {
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
      brandSlugs: brandSlugs,
    },
  })

  await apolloClient.query({
    query: NAVIGATION_QUERY,
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
