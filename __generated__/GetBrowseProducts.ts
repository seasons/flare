/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrderByInput, ProductStatus, ProductType, LetterSize } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBrowseProducts
// ====================================================

export interface GetBrowseProducts_connection_aggregate {
  __typename: "AggregateProduct";
  count: number;
}

export interface GetBrowseProducts_connection {
  __typename: "ProductConnection";
  aggregate: GetBrowseProducts_connection_aggregate;
}

export interface GetBrowseProducts_products_edges_node_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrowseProducts_products_edges_node_modelSize {
  __typename: "Size";
  display: string;
}

export interface GetBrowseProducts_products_edges_node_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface GetBrowseProducts_products_edges_node_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface GetBrowseProducts_products_edges_node_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface GetBrowseProducts_products_edges_node_variants_internalSize {
  __typename: "Size";
  id: string;
  top: GetBrowseProducts_products_edges_node_variants_internalSize_top | null;
  bottom: GetBrowseProducts_products_edges_node_variants_internalSize_bottom | null;
}

export interface GetBrowseProducts_products_edges_node_variants {
  __typename: "ProductVariant";
  id: string;
  size: string | null;
  displayShort: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isSaved: boolean;
  internalSize: GetBrowseProducts_products_edges_node_variants_internalSize | null;
}

export interface GetBrowseProducts_products_edges_node_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetBrowseProducts_products_edges_node {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  images: GetBrowseProducts_products_edges_node_images[];
  description: string | null;
  modelSize: GetBrowseProducts_products_edges_node_modelSize | null;
  modelHeight: number | null;
  externalURL: string | null;
  retailPrice: number | null;
  status: ProductStatus | null;
  createdAt: any;
  updatedAt: any;
  brand: GetBrowseProducts_products_edges_node_brand;
  variants: GetBrowseProducts_products_edges_node_variants[] | null;
  extraLargeImages: GetBrowseProducts_products_edges_node_extraLargeImages[];
  type: ProductType | null;
}

export interface GetBrowseProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetBrowseProducts_products_edges_node;
}

export interface GetBrowseProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (GetBrowseProducts_products_edges | null)[];
}

export interface GetBrowseProducts {
  connection: GetBrowseProducts_connection;
  products: GetBrowseProducts_products;
}

export interface GetBrowseProductsVariables {
  categoryName: string;
  brandName: string;
  first: number;
  skip: number;
  orderBy: ProductOrderByInput;
  tops?: (string | null)[] | null;
  bottoms?: (string | null)[] | null;
  colors?: (string | null)[] | null;
  available?: boolean | null;
}
