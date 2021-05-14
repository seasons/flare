/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignerBrands_Query
// ====================================================

export interface DesignerBrands_Query_brands {
  __typename: "Brand";
  id: string;
  slug: string;
}

export interface DesignerBrands_Query {
  brands: (DesignerBrands_Query_brands | null)[];
}
