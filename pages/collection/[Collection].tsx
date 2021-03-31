import { Layout } from "components"
import { withRouter } from "next/router"
import React from "react"
import { Schema, screenTrack } from "utils/analytics"
import { Collection } from "@seasons/eclipse"

const CollectionScene = screenTrack(({ router }) => {
  return {
    page: Schema.PageNames.CollectionPage,
    collection: router?.query?.Collection,
    path: router?.asPath,
  }
})(({ router }) => {
  const collectionSlug = decodeURI(router.query.Collection)

  return (
    <Layout fixedNav includeDefaultHead={false}>
      <Collection collectionSlug={collectionSlug} />
    </Layout>
  )
})

export default withRouter(CollectionScene)
