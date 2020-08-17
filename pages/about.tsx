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
    <AboutHero />
    <Spacer mb={15} />
    <AboutValues />
    <Box px={[2, 2, 2, 5, 5]}>
      <Separator />
    </Box>
    <AboutWhoWeAre />
    <AboutFooter />
  </Layout>
))

export default about
