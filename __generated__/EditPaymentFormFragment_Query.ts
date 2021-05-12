/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditPaymentFormFragment_Query
// ====================================================

export interface EditPaymentFormFragment_Query_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  planID: string;
}

export interface EditPaymentFormFragment_Query_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: EditPaymentFormFragment_Query_me_customer_membership_plan | null;
}

export interface EditPaymentFormFragment_Query_me_customer_paymentPlan {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  estimate: any | null;
}

export interface EditPaymentFormFragment_Query_me_customer_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface EditPaymentFormFragment_Query_me_customer {
  __typename: "Customer";
  id: string;
  membership: EditPaymentFormFragment_Query_me_customer_membership | null;
  paymentPlan: EditPaymentFormFragment_Query_me_customer_paymentPlan | null;
  user: EditPaymentFormFragment_Query_me_customer_user;
}

export interface EditPaymentFormFragment_Query_me {
  __typename: "Me";
  id: string | null;
  customer: EditPaymentFormFragment_Query_me_customer | null;
}

export interface EditPaymentFormFragment_Query {
  __typename: "Query";
  me: EditPaymentFormFragment_Query_me | null;
}
