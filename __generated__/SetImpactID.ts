/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetImpactID
// ====================================================

export interface SetImpactID_addCustomerDetails {
  __typename: "Customer";
  id: string;
}

export interface SetImpactID {
  addCustomerDetails: SetImpactID_addCustomerDetails;
}

export interface SetImpactIDVariables {
  impactId?: string | null;
}
