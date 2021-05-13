/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Layout_Query
// ====================================================

export interface Layout_Query_navigationBrands {
  __typename: "Brand";
  name: string;
  slug: string;
}

export interface Layout_Query {
  __typename: "Query";
  navigationBrands: (Layout_Query_navigationBrands | null)[];
}
