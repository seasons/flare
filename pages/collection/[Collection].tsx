import { Box, Flex, Layout, Sans, Separator, Spacer } from "components"
import { DesignerTextSkeleton } from "components/Designer/DesignerTextSkeleton"
import { Col, Grid, Row } from "components/Grid"
import { HomepageCarousel } from "components/Homepage/HomepageCarousel"
import { ProgressiveImageProps } from "components/Image/ProgressiveImage"
import { ProductGridItem } from "components/Product/ProductGridItem"
import { ReadMore } from "components/ReadMore"
import { Media } from "components/Responsive"
import { Spinner } from "components/Spinner"
import { debounce } from "lodash"
import Head from "next/head"
import { withRouter } from "next/router"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import React, { useState } from "react"
import { Schema, screenTrack } from "utils/analytics"

import { useQuery } from "@apollo/client"
import { Collection } from "@seasons/eclipse"

const CollectionScene = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.CollectionPage,
    collection: router?.query?.Collection,
    path: router?.asPath,
  }
})(({ router }) => {
  const { data: navigationData } = useQuery(NAVIGATION_QUERY)
  const collectionSlug = decodeURI(router.query.Collection)
  const [onScroll, setOnScroll] = useState(null)
  const featuredBrandItems = navigationData?.brands || []

  return (
    <Layout fixedNav includeDefaultHead={false} onScroll={onScroll} brandItems={featuredBrandItems}>
      <Collection collectionSlug={collectionSlug} setOnScroll={setOnScroll} />
    </Layout>
  )
})

export default withRouter(CollectionScene)
