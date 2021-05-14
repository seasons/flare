/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: ChoosePlanStep_Query
// ====================================================

export interface ChoosePlanStep_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  description: string | null;
  tagline: string | null;
  price: number | null;
  planID: string;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
}

export interface ChoosePlanStep_Query_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface ChoosePlanStep_Query_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: ChoosePlanStep_Query_faq_sections_subsections[];
}

export interface ChoosePlanStep_Query_faq {
  __typename: "Faq";
  sections: ChoosePlanStep_Query_faq_sections[];
}

export interface ChoosePlanStep_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
}

export interface ChoosePlanStep_Query_me_customer {
  __typename: "Customer";
  id: string;
  admissions: ChoosePlanStep_Query_me_customer_admissions | null;
}

export interface ChoosePlanStep_Query_me {
  __typename: "Me";
  customer: ChoosePlanStep_Query_me_customer | null;
}

export interface ChoosePlanStep_Query {
  paymentPlans: (ChoosePlanStep_Query_paymentPlans | null)[] | null;
  faq: ChoosePlanStep_Query_faq | null;
  me: ChoosePlanStep_Query_me | null;
}
