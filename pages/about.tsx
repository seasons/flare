import { Nav } from "../components/Nav/Nav"
import { Layout, Spacer, Separator } from "../components"
import { AboutHero, AboutValues } from "../components/About"

const about = () => (
  <Layout fixedNav>
    <Nav fixed />
    <AboutHero />
    <Spacer mb={10} />
    <AboutValues />
    <Separator />
  </Layout>
)

export default about
