/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCustomer
// ====================================================

export interface GetCustomer_me_user {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetCustomer_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface GetCustomer_me_bag_productVariant_product_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
  height: number | null;
  width: number | null;
}

export interface GetCustomer_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
  websiteUrl: string | null;
  logoImage: GetCustomer_me_bag_productVariant_product_brand_logoImage | null;
}

export interface GetCustomer_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetCustomer_me_bag_productVariant_product_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyNewPrice: number | null;
  buyNewAvailableForSale: boolean | null;
}

export interface GetCustomer_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  hasRestockNotification: boolean;
  reservable: number;
  displayShort: string | null;
  displayLong: string | null;
  price: GetCustomer_me_bag_productVariant_product_variants_price;
}

export interface GetCustomer_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: GetCustomer_me_bag_productVariant_product_modelSize | null;
  brand: GetCustomer_me_bag_productVariant_product_brand;
  images: GetCustomer_me_bag_productVariant_product_images[];
  variants: GetCustomer_me_bag_productVariant_product_variants[] | null;
}

export interface GetCustomer_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: GetCustomer_me_bag_productVariant_product;
}

export interface GetCustomer_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: GetCustomer_me_bag_productVariant;
}

export interface GetCustomer_me_customer_membership_plan {
  __typename: "PaymentPlan";
  id: string;
  itemCount: number | null;
}

export interface GetCustomer_me_customer_membership {
  __typename: "CustomerMembership";
  id: string;
  plan: GetCustomer_me_customer_membership_plan | null;
}

export interface GetCustomer_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  allAccessEnabled: boolean;
}

export interface GetCustomer_me_customer_detail_shippingAddress_shippingOptions_shippingMethod {
  __typename: "ShippingMethod";
  id: string;
  code: ShippingCode;
  displayText: string;
}

export interface GetCustomer_me_customer_detail_shippingAddress_shippingOptions {
  __typename: "ShippingOption";
  id: string;
  externalCost: number | null;
  averageDuration: number | null;
  shippingMethod: GetCustomer_me_customer_detail_shippingAddress_shippingOptions_shippingMethod | null;
}

export interface GetCustomer_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  name: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string;
  shippingOptions: GetCustomer_me_customer_detail_shippingAddress_shippingOptions[] | null;
}

export interface GetCustomer_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  phoneNumber: string | null;
  shippingAddress: GetCustomer_me_customer_detail_shippingAddress | null;
}

export interface GetCustomer_me_customer_billingInfo {
  __typename: "BillingInfo";
  id: string;
  last_digits: string;
}

export interface GetCustomer_me_customer {
  __typename: "Customer";
  id: string;
  membership: GetCustomer_me_customer_membership | null;
  admissions: GetCustomer_me_customer_admissions | null;
  detail: GetCustomer_me_customer_detail | null;
  billingInfo: GetCustomer_me_customer_billingInfo | null;
}

export interface GetCustomer_me {
  __typename: "Me";
  user: GetCustomer_me_user | null;
  bag: GetCustomer_me_bag[] | null;
  customer: GetCustomer_me_customer | null;
}

export interface GetCustomer {
  me: GetCustomer_me | null;
}
