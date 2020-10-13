import React, { useEffect } from "react"
import { Nav } from "../../../components/Nav/Nav"
import { Layout} from "../../../components"
import { screenTrack, Schema } from "../../../utils/analytics"
import { useRouter } from "next/router"

const A = (path: string) => screenTrack(() => ({
  page: Schema.PageNames.App,
  path: `${path}`,
}))(() => {
  const router = useRouter()
  useEffect(() => {router.push("https://szns.co/app")})
  return (
    <Layout fixedNav>
      <Nav fixed />
    </Layout>
  )
})

export default A
