/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: TagView_Query
// ====================================================

export interface TagView_Query_productsAggregate_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface TagView_Query_productsAggregate {
  __typename: "ProductConnection";
  aggregate: TagView_Query_productsAggregate_aggregate;
}

export interface TagView_Query_products_edges_node_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface TagView_Query_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  displayShort: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
}

export interface TagView_Query_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  retailPrice: number | null;
  images: TagView_Query_products_edges_node_images[];
  variants: TagView_Query_products_edges_node_variants[] | null;
}

export interface TagView_Query_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: TagView_Query_products_edges_node;
}

export interface TagView_Query_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (TagView_Query_products_edges | null)[];
}

export interface TagView_Query {
  productsAggregate: TagView_Query_productsAggregate;
  products: TagView_Query_products;
}

export interface TagView_QueryVariables {
  tag: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
