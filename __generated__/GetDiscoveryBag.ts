/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDiscoveryBag
// ====================================================

export interface GetDiscoveryBag_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetDiscoveryBag_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  images: GetDiscoveryBag_me_bag_productVariant_product_images[];
}

export interface GetDiscoveryBag_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetDiscoveryBag_me_bag_productVariant_product;
}

export interface GetDiscoveryBag_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: GetDiscoveryBag_me_bag_productVariant;
}

export interface GetDiscoveryBag_me_customer_detail_shippingAddress_weather {
  __typename: "Weather";
  id: string | null;
  temperature: number | null;
  emoji: string[] | null;
}

export interface GetDiscoveryBag_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  weather: GetDiscoveryBag_me_customer_detail_shippingAddress_weather | null;
}

export interface GetDiscoveryBag_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: GetDiscoveryBag_me_customer_detail_shippingAddress | null;
}

export interface GetDiscoveryBag_me_customer {
  __typename: "Customer";
  id: string;
  detail: GetDiscoveryBag_me_customer_detail | null;
}

export interface GetDiscoveryBag_me {
  __typename: "Me";
  id: string | null;
  bag: GetDiscoveryBag_me_bag[] | null;
  customer: GetDiscoveryBag_me_customer | null;
}

export interface GetDiscoveryBag {
  me: GetDiscoveryBag_me | null;
}
