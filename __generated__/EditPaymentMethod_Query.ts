/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditPaymentMethod_Query
// ====================================================

export interface EditPaymentMethod_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  planID: string;
}

export interface EditPaymentMethod_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: EditPaymentMethod_Query_me_customer_membership_plan | null;
}

export interface EditPaymentMethod_Query_me_customer_paymentPlan {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  estimate: any | null;
}

export interface EditPaymentMethod_Query_me_customer_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface EditPaymentMethod_Query_me_customer {
  __typename: "Customer";
  id: string;
  membership: EditPaymentMethod_Query_me_customer_membership | null;
  paymentPlan: EditPaymentMethod_Query_me_customer_paymentPlan | null;
  user: EditPaymentMethod_Query_me_customer_user;
}

export interface EditPaymentMethod_Query_me {
  __typename: "Me";
  id: string | null;
  customer: EditPaymentMethod_Query_me_customer | null;
}

export interface EditPaymentMethod_Query {
  __typename: "Query";
  me: EditPaymentMethod_Query_me | null;
}
