/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Browse_Query
// ====================================================

export interface Browse_Query_categories_children {
  __typename: "Category";
  slug: string;
}

export interface Browse_Query_categories {
  __typename: "Category";
  id: string;
  slug: string;
  name: string;
  children: Browse_Query_categories_children[] | null;
}

export interface Browse_Query_brands {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Browse_Query {
  categories: (Browse_Query_categories | null)[];
  brands: (Browse_Query_brands | null)[];
}
