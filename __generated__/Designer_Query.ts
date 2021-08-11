/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, ProductType, LetterSize } from "./globalTypes";

// ====================================================
// GraphQL query operation: Designer_Query
// ====================================================

export interface Designer_Query_brand_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Designer_Query_brand_productsAggregate_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface Designer_Query_brand_productsAggregate {
  __typename: "ProductConnection";
  aggregate: Designer_Query_brand_productsAggregate_aggregate;
}

export interface Designer_Query_brand_products_edges_node_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Designer_Query_brand_products_edges_node_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface Designer_Query_brand_products_edges_node_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface Designer_Query_brand_products_edges_node_variants_internalSize {
  __typename: "Size";
  id: string;
  top: Designer_Query_brand_products_edges_node_variants_internalSize_top | null;
  bottom: Designer_Query_brand_products_edges_node_variants_internalSize_bottom | null;
}

export interface Designer_Query_brand_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  displayShort: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  internalSize: Designer_Query_brand_products_edges_node_variants_internalSize | null;
}

export interface Designer_Query_brand_products_edges_node_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Designer_Query_brand_products_edges_node_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Designer_Query_brand_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: Designer_Query_brand_products_edges_node_images[];
  retailPrice: number | null;
  variants: Designer_Query_brand_products_edges_node_variants[] | null;
  brand: Designer_Query_brand_products_edges_node_brand;
  extraLargeImages: Designer_Query_brand_products_edges_node_extraLargeImages[];
  description: string | null;
  type: ProductType | null;
}

export interface Designer_Query_brand_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: Designer_Query_brand_products_edges_node;
}

export interface Designer_Query_brand_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (Designer_Query_brand_products_edges | null)[];
}

export interface Designer_Query_brand {
  __typename: "Brand";
  id: string;
  name: string;
  since: any | null;
  description: string | null;
  websiteUrl: string | null;
  basedIn: string | null;
  designer: string | null;
  images: Designer_Query_brand_images[] | null;
  productsAggregate: Designer_Query_brand_productsAggregate;
  products: Designer_Query_brand_products;
}

export interface Designer_Query {
  brand: Designer_Query_brand | null;
}

export interface Designer_QueryVariables {
  slug: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
}
