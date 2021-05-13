/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePaymentAndShippingAddress
// ====================================================

export interface updatePaymentAndShippingAddress_addCustomerDetails {
  __typename: "Customer";
  id: string;
}

export interface updatePaymentAndShippingAddress {
  addCustomerDetails: updatePaymentAndShippingAddress_addCustomerDetails;
}

export interface updatePaymentAndShippingAddressVariables {
  city: string;
  zipCode: string;
  state: string;
  address1: string;
  address2?: string | null;
  phoneNumber: string;
}
