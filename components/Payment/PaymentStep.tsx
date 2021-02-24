import { Separator } from "components"
import { CollapsableFAQ } from "components/CollapsableFAQ"
import { FormField } from "components/Forms/FormField"
import { Formik } from "formik"
import { color } from "helpers/color"
import React from "react"
import styled from "styled-components"
import { colors } from "theme/colors"

import { gql, useQuery } from "@apollo/client"
import { Box, Col, Flex, Grid, Row, Sans, Spacer } from "@seasons/eclipse"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { PaymentForm } from "./PaymentForm"

const stripePromise = loadStripe("pk_test_RUHQ0ADqBJHmknHqApuPBGS900fJpiEabb")

interface PaymentStepProps {
  plan: object
}

export const PAYMENT_PLANS = gql`
  query GetPaymentPlans {
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
        }
      }
    }
  }
`

export const PaymentStep = ({ plan }) => {
  const { previousData, data = previousData } = useQuery(PAYMENT_PLANS)
  const handleSubmit = () => {
    console.log("handle submit")
  }

  return (
    <Elements stripe={stripePromise}>
      <Formik onSubmit={handleSubmit} initialValues={{}}>
        <Grid>
          <Row>
            <BorderedCol md={7}>
              <Box p={4}>
                <Box mt={12} p={2}>
                  <Sans size="7" weight="medium">
                    Finish checking out
                  </Sans>
                  <Sans size="5" color="black50">
                    Add your billing address and payment details
                  </Sans>
                </Box>
                <Box>
                  <Flex flexDirection="row" alignItems="center" justifyContent="space-between" px={2} pb={2}>
                    <Box mt={2}>
                      <Sans size="6">Order Total</Sans>
                      <Sans size="4" color="black50">
                        Billed every 30-days
                      </Sans>
                    </Box>
                    <Box>
                      <Sans size="8">$65</Sans>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box my={2}>
                <Separator />
              </Box>
              <Flex flexDirection="column" p={6}>
                {/* <Box width="100%" py={4}>
                  <Sans size="7">Billing address</Sans>
                  <Spacer mt={2} />
                  <FormField name="First Name" placeholder="Will Smith" />
                </Box> */}
                <Box width="100%" py={4}>
                  <Sans size="7">Payment details</Sans>
                  <Spacer mt={2} />
                  <PaymentForm />
                </Box>
              </Flex>
            </BorderedCol>
            <Col md={5}>
              <Box
                style={{ borderRight: `1px solid ${color("black15")}`, height: "100%", minHeight: "100vh" }}
                px={[2, 2, 2, 5, 5]}
                pt={150}
              >
                <FAQWrapper>
                  <Sans size="8" color="black100">
                    FAQ
                  </Sans>
                  <Spacer mb={1} />
                  <Sans size="4" color="black50" style={{ maxWidth: "800px" }}>
                    What to know about membership
                  </Sans>
                  <Spacer mb={5} />
                  <CollapsableFAQ faqSections={data?.faq?.sections} />
                </FAQWrapper>
              </Box>
            </Col>
          </Row>
        </Grid>
      </Formik>
    </Elements>
  )
}

const BorderedCol = styled(Col)`
  border-left: 1px solid ${colors.black15};
  border-right: 1px solid ${colors.black15};
`

const FAQWrapper = styled(Box)`
  width: 100%;
  height: 100%;
`
