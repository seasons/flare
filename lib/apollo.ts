import { withData } from "next-apollo"
import { HttpLink } from "apollo-boost"

const config = {
  link: new HttpLink({
    // uri: "https://monsoon-staging.seasons.nyc", // Server URL (must be absolute)
    uri: "http://localhost:4000",
  }),
}

export default withData(config)
