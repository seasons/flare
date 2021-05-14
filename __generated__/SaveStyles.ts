/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CustomerStyle } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveStyles
// ====================================================

export interface SaveStyles_addCustomerDetails_detail {
  __typename: "CustomerDetail";
  styles: CustomerStyle[];
}

export interface SaveStyles_addCustomerDetails {
  __typename: "Customer";
  id: string;
  detail: SaveStyles_addCustomerDetails_detail | null;
}

export interface SaveStyles {
  addCustomerDetails: SaveStyles_addCustomerDetails;
}

export interface SaveStylesVariables {
  styles: CustomerStyle[];
}
