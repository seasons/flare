import { Button, Flex, MaxWidth, Spacer } from "components"
import gql from "graphql-tag"
import { apolloClient } from "lib/apollo"
import { useAuthContext } from "lib/auth/AuthContext"
import React, { useEffect, useState } from "react"

import { useQuery } from "@apollo/client"
import { FormFooterInnerWrapper, FormFooterWrapper } from "components/Forms/FormsTemplate"
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

const GET_CHARGEBEE_CHECKOUT = gql`
  query getChargebeeCheckout($planID: String!, $email: String, $couponID: String) {
    chargebeeCheckout(planID: $planID, email: $email, couponID: $couponID) {
      id
      type
      url
      state
      embed
      created_at
      expires_at
    }
  }
`

export function GetChargebeeCheckout(planID: string, email: string): Promise<boolean | void> {
  let coupon
  try {
    const couponData = localStorage?.getItem("coupon")
    coupon = JSON.parse(couponData)
  } catch (e) {
    // Fail silently
  }
  // Set up the mutation
  return new Promise((resolve, reject) => {
    apolloClient
      .query({
        query: GET_CHARGEBEE_CHECKOUT,
        variables: {
          planID,
          email,
          couponID: coupon?.id,
        },
      })
      .then((resp) => {
        resolve(resp.data.chargebeeCheckout)
      })
      .catch((error) => {
        // if they already subscribed, provide specific error message
        if (error.message.includes("already has a subscription")) {
          reject("Already subscribed. Please contact support@seasons.nyc to update your subscription")
        } else {
          reject("Something went wrong. Please try again later")
        }
      })
  })
}

export const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelected, onError, onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { data } = useQuery(PAYMENT_PLANS)
  const { userSession } = useAuthContext()

  useEffect(() => {
    // @ts-ignore
    Chargebee.init({
      site: process.env.NEXT_PUBLIC_GATSBY_CHARGEBEE_SITE || "seasons-test",
    })
  }, [])

  useEffect(() => {
    if (data?.paymentPlans && !selectedPlan) {
      setSelectedPlan(data?.paymentPlans?.[0])
    }
  }, [data, selectedPlan, setSelectedPlan])

  const allAccessEnabled = data?.me?.customer?.admissions?.allAccessEnabled
  const faqSections = data?.faq?.sections

  function executeChargebeeCheckout(planID) {
    // @ts-ignore
    const chargebee = Chargebee.getInstance()
    chargebee.openCheckout({
      hostedPage: async () => {
        const { email } = userSession.user
        return await GetChargebeeCheckout(planID, email)
      },
      error: (error) => {
        console.error(error)
        onError?.(error)
      },
      success: (hostedPageId) => {
        onSuccess?.()
      },
    })
  }

  return (
    <>
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
              justifyContent="flex-end"
              py={1}
              height={["auto", "63px"]}
              style={{ width: "100%" }}
              px={[2, 2, 2, 5, 5]}
            >
              <Button
                ml={2}
                variant="primaryBlack"
                size="medium"
                type="submit"
                onClick={() => {
                  onPlanSelected(selectedPlan)
                  executeChargebeeCheckout(selectedPlan.planID)
                }}
              >
                Select Plan
              </Button>
            </Flex>
          </MaxWidth>
        </FormFooterInnerWrapper>
      </FormFooterWrapper>
    </>
  )
}
