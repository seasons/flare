import { withData } from "next-apollo"
import { HttpLink } from "apollo-boost"

const config = {
  link: new HttpLink({
    // Server URL (must be absolute)
    uri: process.env.MONSOON_ENDPOINT,
  }),
}

export default withData(config)
