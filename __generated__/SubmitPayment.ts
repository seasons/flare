/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitPayment
// ====================================================

export interface SubmitPayment {
  processPayment: any | null;
}

export interface SubmitPaymentVariables {
  paymentMethodID: string;
  planID: string;
  couponID?: string | null;
  billing?: any | null;
  shipping?: any | null;
}
