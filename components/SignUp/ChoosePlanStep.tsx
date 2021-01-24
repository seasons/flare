import { Button, Flex, MaxWidth, Sans } from "components"
import { FormFooterInnerWrapper, FormFooterWrapper } from "components/Forms/FormFooter"
import gql from "graphql-tag"
import { useAuthContext } from "lib/auth/AuthContext"
import { executeChargebeeCheckout, initChargebee } from "lib/chargebee"
import React, { useEffect, useState } from "react"

import { useQuery } from "@apollo/client"
import { Box } from "@material-ui/core"

import { MembershipPlans } from "./MembershipPlans"

export const PAYMENT_PLANS = gql`
  query GetPaymentPlans {
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
        admissions {
          id
          admissable
          authorizationsCount
          authorizationWindowClosesAt
          allAccessEnabled
        }
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
  const { data } = useQuery(PAYMENT_PLANS)
  const { userSession } = useAuthContext()

  useEffect(() => {
    if (data?.paymentPlans && !selectedPlan) {
      const essential1 = data?.paymentPlans.find((p) => p.name === "Essential 1")
      setSelectedPlan(essential1)
    }
  }, [data, selectedPlan, setSelectedPlan])

  useEffect(() => {
    initChargebee()
  }, [])

  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const faqSections = data?.faq?.sections

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <MembershipPlans
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        faqSections={faqSections}
        allAccessEnabled={allAccessEnabled}
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
              px={[2, 2, 2, 5, 5]}
            >
              <Sans color="black50" my={2} size={["2", "4"]}>
                You can upgrade or change your plan at any time from your account settings.
              </Sans>
              <Button
                ml={2}
                variant="primaryBlack"
                size="medium"
                type="button"
                onClick={() => {
                  onPlanSelected(selectedPlan)
                  const { email } = userSession.user
                  executeChargebeeCheckout({ planID: selectedPlan.planID, email, onError, onSuccess })
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
