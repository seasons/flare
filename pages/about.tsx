import { Nav } from "../components/Nav/Nav"
import { Layout, Spacer, Separator } from "../components"
import { AboutFooter, AboutHero, AboutValues, AboutWhoWeAre } from "../components/About"
import { screenTrack, Schema } from "../utils/analytics"

const about = screenTrack(() => ({
  page: Schema.PageNames.AboutPage,
  path: "/about",
}))(() => (
  <Layout fixedNav>
    <Nav fixed />
    <AboutHero />
    <Spacer mb={10} />
    <AboutValues />
    <Separator />
    <AboutWhoWeAre />
    <AboutFooter />
  </Layout>
))

export default about
