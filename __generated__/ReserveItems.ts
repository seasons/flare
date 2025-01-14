/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReserveItemsOptions, ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ReserveItems
// ====================================================

export interface ReserveItems_reserveItems {
  __typename: "Reservation";
  id: string;
}

export interface ReserveItems {
  reserveItems: ReserveItems_reserveItems | null;
}

export interface ReserveItemsVariables {
  items: string[];
  options?: ReserveItemsOptions | null;
  shippingCode?: ShippingCode | null;
}
