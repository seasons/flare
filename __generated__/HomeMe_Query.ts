/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeMe_Query
// ====================================================

export interface HomeMe_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
  allAccessEnabled: boolean;
}

export interface HomeMe_Query_me_customer {
  __typename: "Customer";
  id: string;
  admissions: HomeMe_Query_me_customer_admissions | null;
}

export interface HomeMe_Query_me {
  __typename: "Me";
  id: string | null;
  customer: HomeMe_Query_me_customer | null;
}

export interface HomeMe_Query {
  me: HomeMe_Query_me | null;
}
