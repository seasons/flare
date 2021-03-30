import { Nav } from "../components/Nav"
import { Layout, Spacer, Separator, Box } from "../components"
import { AboutFooter, AboutHero, AboutValues, AboutWhoWeAre } from "../components/About"
import { screenTrack, Schema } from "../utils/analytics"
import { NAVIGATION_QUERY } from "queries/navigationQueries"
import { useQuery } from "@apollo/client"
import { initializeApollo } from "lib/apollo/apollo"

const About = screenTrack(() => ({
  page: Schema.PageNames.AboutPage,
  path: "/about",
}))(() => {
  const { previousData, data = previousData } = useQuery(NAVIGATION_QUERY)
  const featuredBrandItems = data?.brands || []

  return (
    <Layout brandItems={featuredBrandItems}>
      <AboutHero />
      <Spacer mb={15} />
      <AboutValues />
      <Box px={[2, 2, 2, 2, 2]}>
        <Separator />
      </Box>
      <AboutWhoWeAre />
      <AboutFooter />
    </Layout>
  )
})

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: NAVIGATION_QUERY,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default About
