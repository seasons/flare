import React from "react"

import { Box, Layout, Sans, Separator, Spacer } from "../../components"
import { Nav } from "../../components/Nav/Nav"
import { screenTrack } from "../../utils/analytics"

const Home = screenTrack(() => ({
  page: "AccountPage",
  path: "/a/account",
}))(() => {
  return (
    <Layout fixedNav>
      <Nav fixed />

      <Spacer mb={10} />

    <Box my={10}>
      <Box px={[2, 2, 2, 5, 5]} mx="auto">
        <Box my={4}>
          <Sans size="6" style={{align: "center"}}>This page is currently unavailable.</Sans>
        </Box>
        <Sans size="3" style={{align: "center"}}>
          <a href="https://szns.co/app">Download the app to continue</a>
        </Sans>
      </Box>
      </Box>
    </Layout>
  )
})

export default Home
