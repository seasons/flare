import { gql, useQuery } from "@apollo/client"
import { FixedBackArrow, Sans, Spacer } from "components"
import { Box } from "components/Box"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { useDrawerContext } from "components/Drawer/DrawerContext"
import { Loader } from "mobile/Loader"
import React from "react"

const GET_DRAWER_FAQ = gql`
  query GetPaymentPlans {
    faq {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
  }
`

export const DrawerFAQ = ({ previousScreen }) => {
  const { previousData, data = previousData } = useQuery(GET_DRAWER_FAQ)
  const { openDrawer } = useDrawerContext()

  const faqSections = data?.faq.sections

  if (!data) {
    return (
      <>
        <FixedBackArrow
          variant="whiteBackground"
          onPress={() => {
            openDrawer(previousScreen ? previousScreen : "bag")
          }}
        />
        <Loader />
      </>
    )
  }

  return (
    <Box px={2} pt={4}>
      <FixedBackArrow
        variant="whiteBackground"
        onPress={() => {
          openDrawer(previousScreen ? previousScreen : "bag")
        }}
      />
      <Spacer mb={80} />
      <Sans size="6">Frequently asked questions</Sans>
      <Spacer pb={5} />
      <CollapsableFAQ faqSections={faqSections} />
      <Spacer pb={5} />
    </Box>
  )
}
