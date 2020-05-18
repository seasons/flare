import { HttpLink } from "apollo-boost"
import { withData } from "next-apollo"

const config = {
  link: new HttpLink({
    // Server URL (must be absolute)
    // uri: process.env.MONSOON_ENDPOINT,
    uri: "https://monsoon.seasons.nyc",
  }),
}

export default withData(config)
