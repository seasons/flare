import { Layout } from "components"
import { withRouter } from "next/router"
import { Navigation_Query } from "queries/navigationQueries"
import React from "react"
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
  const { data: navigationData } = useQuery(Navigation_Query)
  const collectionSlug = decodeURI(router.query.Collection)
  const featuredBrandItems = navigationData?.navigationBrands || []

  return (
    <Layout fixedNav includeDefaultHead={false} brandItems={featuredBrandItems}>
      <Collection collectionSlug={collectionSlug} />
    </Layout>
  )
})

export default withRouter(CollectionScene)
