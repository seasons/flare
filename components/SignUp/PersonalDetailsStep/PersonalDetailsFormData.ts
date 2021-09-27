import { gql } from "@apollo/client"
import SelectItem from "components/Forms/SelectItem"

export const ADD_PERSONAL_DETAILS = gql`
  mutation addPersonalDetails(
    $averageSpend: String
    $ageRange: String
    $signupLikedStyles: CustomerDetailCreatesignupLikedStylesInput
    $signupReasons: CustomerDetailCreatesignupReasonsInput
  ) {
    addCustomerDetails(
      details: {
        averageSpend: $averageSpend
        ageRange: $ageRange
        signupLikedStyles: $signupLikedStyles
        signupReasons: $signupReasons
      }
      event: CompletedWaitlistForm
    ) {
      id
    }
  }
`

export const PERSONAL_DETAILS_STEP_QUERY = gql`
  query PersonalDetailsStepQuery {
    products: signupStyleProducts {
      id
      slug
      brand {
        id
        name
      }
      images(size: Small) {
        id
        url
      }
    }
  }
`

const ageRanges: SelectItem[] = [
  { label: "Under 18", value: "Under 18" },
  { label: "18-24", value: "18-24" },
  { label: "25-29", value: "25-29" },
  { label: "30-39", value: "30-39" },
  { label: "40-49", value: "40-49" },
  { label: "50-59", value: "50-59" },
  { label: "60+", value: "60+" },
]

const averageSpend: SelectItem[] = [
  { label: "$", subLabel: "You spend $100 or less on shirts, shoes, or pants every month", value: 100 },
  { label: "$$", subLabel: "You spend $250 or more on shirts, shoes, or pants every month", value: 250 },
  { label: "$$$", subLabel: "You spend $500+ on shirts, shoes, or pants every month", value: 500 },
  { label: "$$$$", subLabel: "You spend $1,000+ on shirts, shoes, or pants every month", value: 1000 },
]

const signupReasons: SelectItem[] = [
  { label: "Looking to spend less money on clothes", value: "Looking to spend less money on clothes" },
  { label: "I want to discover new brands and styles", value: "I want to discover new brands and styles" },
]

export const personalDetailsFormData = {
  ageRanges,
  averageSpend,
  signupReasons,
}
