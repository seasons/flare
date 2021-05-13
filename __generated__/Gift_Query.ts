/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentPlanWhereInput, PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: Gift_Query
// ====================================================

export interface Gift_Query_paymentPlans {
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

export interface Gift_Query {
  paymentPlans: (Gift_Query_paymentPlans | null)[] | null;
}

export interface Gift_QueryVariables {
  where?: PaymentPlanWhereInput | null;
}
