/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NavFragment_Query
// ====================================================

export interface NavFragment_Query_navigationBrands {
  __typename: "Brand";
  name: string;
  slug: string;
}

export interface NavFragment_Query {
  __typename: "Query";
  navigationBrands: (NavFragment_Query_navigationBrands | null)[];
}
