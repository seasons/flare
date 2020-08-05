import { Nav } from "../components/Nav/Nav"
import { Layout, Spacer, Separator, Box } from "../components"
import { AboutFooter, AboutHero, AboutValues, AboutWhoWeAre } from "../components/About"
import { screenTrack, Schema } from "../utils/analytics"

const about = screenTrack(() => ({
  page: Schema.PageNames.AboutPage,
  path: "/about",
}))(() => (
  <Layout fixedNav>
    <Nav fixed />
    <Box px={2}>
      <AboutHero />
      <Spacer mb={10} />
      <AboutValues />
      <Separator />
      <AboutWhoWeAre />
      <AboutFooter />
    </Box>
  </Layout>
))

export default about
