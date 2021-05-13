/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStaticProducts
// ====================================================

export interface GetStaticProducts_products {
  __typename: "Product";
  id: string;
  slug: string;
}

export interface GetStaticProducts {
  products: (GetStaticProducts_products | null)[];
}

export interface GetStaticProductsVariables {
  pageSize?: number | null;
}
