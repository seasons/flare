import { Nav } from "../components/Nav/Nav"
import { Layout } from "../components"
import { AboutHero } from "../components/About"

const about = () => (
  <Layout fixedNav>
    <Nav fixed />
    <AboutHero />
  </Layout>
)

export default about
