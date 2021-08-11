/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize, PaymentPlanTier } from "./globalTypes";

// ====================================================
// GraphQL query operation: Home_Query
// ====================================================

export interface Home_Query_collections_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_collections_products_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Home_Query_collections_products_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Home_Query_collections_products_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_collections_products_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface Home_Query_collections_products_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface Home_Query_collections_products_variants_internalSize {
  __typename: "Size";
  id: string;
  top: Home_Query_collections_products_variants_internalSize_top | null;
  bottom: Home_Query_collections_products_variants_internalSize_bottom | null;
}

export interface Home_Query_collections_products_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
  isSaved: boolean;
  internalSize: Home_Query_collections_products_variants_internalSize | null;
}

export interface Home_Query_collections_products_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_collections_products {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  retailPrice: number | null;
  type: ProductType | null;
  modelSize: Home_Query_collections_products_modelSize | null;
  brand: Home_Query_collections_products_brand;
  images: Home_Query_collections_products_images[];
  variants: Home_Query_collections_products_variants[] | null;
  extraLargeImages: Home_Query_collections_products_extraLargeImages[];
  description: string | null;
}

export interface Home_Query_collections {
  __typename: "Collection";
  id: string;
  slug: string;
  title: string | null;
  subTitle: string | null;
  images: Home_Query_collections_images[] | null;
  products: Home_Query_collections_products[] | null;
}

export interface Home_Query_blogPosts_image {
  __typename: "Image";
  id: string;
  url: string | null;
  alt: string | null;
}

export interface Home_Query_blogPosts {
  __typename: "BlogPost";
  id: string;
  slug: string;
  name: string | null;
  author: string | null;
  image: Home_Query_blogPosts_image | null;
}

export interface Home_Query_paymentPlans {
  __typename: "PaymentPlan";
  id: string;
  name: string | null;
  description: string | null;
  tagline: string | null;
  price: number | null;
  planID: string;
  tier: PaymentPlanTier | null;
  itemCount: number | null;
}

export interface Home_Query_newestBrandProducts_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Home_Query_newestBrandProducts_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Home_Query_newestBrandProducts_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_newestBrandProducts_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface Home_Query_newestBrandProducts_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface Home_Query_newestBrandProducts_variants_internalSize {
  __typename: "Size";
  id: string;
  top: Home_Query_newestBrandProducts_variants_internalSize_top | null;
  bottom: Home_Query_newestBrandProducts_variants_internalSize_bottom | null;
}

export interface Home_Query_newestBrandProducts_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
  isSaved: boolean;
  internalSize: Home_Query_newestBrandProducts_variants_internalSize | null;
}

export interface Home_Query_newestBrandProducts_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_newestBrandProducts {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  retailPrice: number | null;
  type: ProductType | null;
  modelSize: Home_Query_newestBrandProducts_modelSize | null;
  brand: Home_Query_newestBrandProducts_brand;
  images: Home_Query_newestBrandProducts_images[];
  variants: Home_Query_newestBrandProducts_variants[] | null;
  extraLargeImages: Home_Query_newestBrandProducts_extraLargeImages[];
  description: string | null;
}

export interface Home_Query_fitPics_location {
  __typename: "Location";
  id: string;
  city: string | null;
  state: string | null;
}

export interface Home_Query_fitPics_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_fitPics_user_customer_detail {
  __typename: "CustomerDetail";
  id: string;
  instagramHandle: string | null;
}

export interface Home_Query_fitPics_user_customer {
  __typename: "Customer";
  id: string;
  detail: Home_Query_fitPics_user_customer_detail | null;
}

export interface Home_Query_fitPics_user {
  __typename: "User";
  id: string;
  customer: Home_Query_fitPics_user_customer | null;
}

export interface Home_Query_fitPics {
  __typename: "FitPic";
  id: string;
  location: Home_Query_fitPics_location | null;
  image: Home_Query_fitPics_image;
  includeInstagramHandle: boolean;
  user: Home_Query_fitPics_user;
}

export interface Home_Query_newBottoms_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface Home_Query_newBottoms_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface Home_Query_newBottoms_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_newBottoms_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface Home_Query_newBottoms_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface Home_Query_newBottoms_variants_internalSize {
  __typename: "Size";
  id: string;
  top: Home_Query_newBottoms_variants_internalSize_top | null;
  bottom: Home_Query_newBottoms_variants_internalSize_bottom | null;
}

export interface Home_Query_newBottoms_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
  isSaved: boolean;
  internalSize: Home_Query_newBottoms_variants_internalSize | null;
}

export interface Home_Query_newBottoms_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_newBottoms {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  retailPrice: number | null;
  type: ProductType | null;
  modelSize: Home_Query_newBottoms_modelSize | null;
  brand: Home_Query_newBottoms_brand;
  images: Home_Query_newBottoms_images[];
  variants: Home_Query_newBottoms_variants[] | null;
  extraLargeImages: Home_Query_newBottoms_extraLargeImages[];
  description: string | null;
}

export interface Home_Query_launches_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Home_Query_launches_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  published: boolean;
  websiteUrl: string | null;
  logoImage: Home_Query_launches_brand_logoImage | null;
}

export interface Home_Query_launches_collection {
  __typename: "Collection";
  id: string;
  published: boolean;
  slug: string;
  title: string | null;
}

export interface Home_Query_launches {
  __typename: "Launch";
  id: string;
  launchAt: any;
  brand: Home_Query_launches_brand | null;
  collection: Home_Query_launches_collection | null;
}

export interface Home_Query {
  collections: (Home_Query_collections | null)[];
  blogPosts: (Home_Query_blogPosts | null)[];
  paymentPlans: (Home_Query_paymentPlans | null)[] | null;
  newestBrandProducts: Home_Query_newestBrandProducts[] | null;
  fitPics: Home_Query_fitPics[];
  newBottoms: (Home_Query_newBottoms | null)[];
  __typename: "Query";
  launches: (Home_Query_launches | null)[];
}
