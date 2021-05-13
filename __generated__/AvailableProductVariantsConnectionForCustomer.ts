/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantOrderByInput, PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: AvailableProductVariantsConnectionForCustomer
// ====================================================

export interface AvailableProductVariantsConnectionForCustomer_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
  price: number | null;
}

export interface AvailableProductVariantsConnectionForCustomer_productsCount_aggregate {
  __typename: "AggregateProductVariant";
  count: number;
}

export interface AvailableProductVariantsConnectionForCustomer_productsCount {
  __typename: "ProductVariantConnection";
  aggregate: AvailableProductVariantsConnectionForCustomer_productsCount_aggregate;
}

export interface AvailableProductVariantsConnectionForCustomer_products_edges_node_product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface AvailableProductVariantsConnectionForCustomer_products_edges_node_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface AvailableProductVariantsConnectionForCustomer_products_edges_node_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: AvailableProductVariantsConnectionForCustomer_products_edges_node_product_brand;
  images: AvailableProductVariantsConnectionForCustomer_products_edges_node_product_images[];
}

export interface AvailableProductVariantsConnectionForCustomer_products_edges_node {
  __typename: "ProductVariant";
  id: string;
  isSaved: boolean;
  displayShort: string | null;
  product: AvailableProductVariantsConnectionForCustomer_products_edges_node_product;
}

export interface AvailableProductVariantsConnectionForCustomer_products_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: AvailableProductVariantsConnectionForCustomer_products_edges_node;
}

export interface AvailableProductVariantsConnectionForCustomer_products {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: (AvailableProductVariantsConnectionForCustomer_products_edges | null)[];
}

export interface AvailableProductVariantsConnectionForCustomer {
  paymentPlans: (AvailableProductVariantsConnectionForCustomer_paymentPlans | null)[] | null;
  productsCount: AvailableProductVariantsConnectionForCustomer_productsCount;
  products: AvailableProductVariantsConnectionForCustomer_products;
}

export interface AvailableProductVariantsConnectionForCustomerVariables {
  first: number;
  skip: number;
  orderBy: ProductVariantOrderByInput;
}
