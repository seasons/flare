import { Button, Flex, MaxWidth, Sans } from "components"
import { FormFooterInnerWrapper, FormFooterWrapper } from "components/Forms/FormFooter"
import gql from "graphql-tag"
import React, { useEffect, useState } from "react"

import { useQuery } from "@apollo/client"
import { Box } from "@material-ui/core"

import { MembershipPlans } from "./MembershipPlans"

export const ChoosePlanStep_Query = gql`
  query ChoosePlanStep_Query {
    paymentPlans(where: { status: "active" }) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
    }
    faq(sectionType: PaymentPlanPage) {
      sections {
        title
        subsections {
          title
          text
        }
      }
    }
    me {
      customer {
        id
      }
    }
  }
`

interface ChoosePlanStepProps {
  onPlanSelected?: (plan: any) => void
  onError?: (error: any) => void
  onSuccess?: () => void
}

export const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelected, onError, onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { previousData, data = previousData } = useQuery(ChoosePlanStep_Query)

  useEffect(() => {
    if (data?.paymentPlans && !selectedPlan) {
      const essential1 = data?.paymentPlans.find((p) => p.name === "Essential 1")
      setSelectedPlan(essential1)
    }
  }, [data, selectedPlan, setSelectedPlan])

  const faqSections = data?.faq?.sections

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <MembershipPlans
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        faqSections={faqSections}
        paymentPlans={data?.paymentPlans}
      />
      <FormFooterWrapper>
        <FormFooterInnerWrapper>
          <MaxWidth>
            <Flex
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              py={1}
              height={["auto", "63px"]}
              style={{ width: "100%" }}
              px={[2, 2, 2, 2, 2]}
            >
              <Sans color="black50" my={2} size={["2", "4"]}>
                As a reminder, membership auto-renews every month or year unless canceled.
              </Sans>
              <Button
                ml={2}
                variant="primaryBlack"
                size="medium"
                type="button"
                onClick={() => {
                  onPlanSelected(selectedPlan)
                }}
              >
                Select Plan
              </Button>
            </Flex>
          </MaxWidth>
        </FormFooterInnerWrapper>
      </FormFooterWrapper>
    </Box>
  )
}
