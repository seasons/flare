/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BrandsNavItemFragment_Query
// ====================================================

export interface BrandsNavItemFragment_Query_navigationBrands {
  __typename: "Brand";
  name: string;
  slug: string;
}

export interface BrandsNavItemFragment_Query {
  __typename: "Query";
  navigationBrands: (BrandsNavItemFragment_Query_navigationBrands | null)[];
}
