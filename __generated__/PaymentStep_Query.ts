/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BagItemStatus, CouponType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PaymentStep_Query
// ====================================================

export interface PaymentStep_Query_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface PaymentStep_Query_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: PaymentStep_Query_faq_sections_subsections[];
}

export interface PaymentStep_Query_faq {
  __typename: "Faq";
  sections: PaymentStep_Query_faq_sections[];
}

export interface PaymentStep_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  price: number | null;
  planID: string;
  itemCount: number | null;
  estimate: any | null;
}

export interface PaymentStep_Query_me_bag_productVariant_product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface PaymentStep_Query_me_bag_productVariant_product_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
  height: number | null;
  width: number | null;
}

export interface PaymentStep_Query_me_bag_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
  websiteUrl: string | null;
  logoImage: PaymentStep_Query_me_bag_productVariant_product_brand_logoImage | null;
}

export interface PaymentStep_Query_me_bag_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface PaymentStep_Query_me_bag_productVariant_product_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyNewPrice: number | null;
  buyNewAvailableForSale: boolean | null;
}

export interface PaymentStep_Query_me_bag_productVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  hasRestockNotification: boolean;
  reservable: number;
  displayShort: string | null;
  displayLong: string | null;
  price: PaymentStep_Query_me_bag_productVariant_product_variants_price;
}

export interface PaymentStep_Query_me_bag_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  modelSize: PaymentStep_Query_me_bag_productVariant_product_modelSize | null;
  brand: PaymentStep_Query_me_bag_productVariant_product_brand;
  images: PaymentStep_Query_me_bag_productVariant_product_images[];
  variants: PaymentStep_Query_me_bag_productVariant_product_variants[] | null;
}

export interface PaymentStep_Query_me_bag_productVariant {
  __typename: "ProductVariant";
  id: string;
  product: PaymentStep_Query_me_bag_productVariant_product;
}

export interface PaymentStep_Query_me_bag {
  __typename: "BagItem";
  id: string;
  productVariant: PaymentStep_Query_me_bag_productVariant;
  position: number | null;
  saved: boolean | null;
  status: BagItemStatus;
}

export interface PaymentStep_Query_me_customer_detail_shippingAddress {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
  zipCode: string;
}

export interface PaymentStep_Query_me_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  shippingAddress: PaymentStep_Query_me_customer_detail_shippingAddress | null;
}

export interface PaymentStep_Query_me_customer_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PaymentStep_Query_me_customer_admissions {
  __typename: "CustomerAdmissionsData";
  id: string;
  admissable: boolean;
  authorizationsCount: number;
  authorizationWindowClosesAt: any | null;
}

export interface PaymentStep_Query_me_customer_coupon {
  __typename: "Coupon";
  id: string;
  amount: number | null;
  percentage: number | null;
  type: CouponType;
}

export interface PaymentStep_Query_me_customer {
  __typename: "Customer";
  id: string;
  detail: PaymentStep_Query_me_customer_detail | null;
  user: PaymentStep_Query_me_customer_user;
  admissions: PaymentStep_Query_me_customer_admissions | null;
  coupon: PaymentStep_Query_me_customer_coupon | null;
}

export interface PaymentStep_Query_me {
  __typename: "Me";
  bag: PaymentStep_Query_me_bag[] | null;
  customer: PaymentStep_Query_me_customer | null;
}

export interface PaymentStep_Query {
  faq: PaymentStep_Query_faq | null;
  paymentPlans: (PaymentStep_Query_paymentPlans | null)[] | null;
  me: PaymentStep_Query_me | null;
}

export interface PaymentStep_QueryVariables {
  couponID?: string | null;
}
