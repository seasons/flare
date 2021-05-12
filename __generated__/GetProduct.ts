/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, SizeType, LetterSize, BottomSizeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_modelSize {
  __typename: "Size";
  display: string;
  type: SizeType | null;
}

export interface GetProduct_product_color {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_product_secondaryColor {
  __typename: "Color";
  id: string;
  name: string;
}

export interface GetProduct_product_brand_images {
  __typename: "Image";
  id: string;
  url: string | null;
  resized: string | null;
}

export interface GetProduct_product_brand_logoImage {
  __typename: "Image";
  id: string;
  url: string | null;
  height: number | null;
  width: number | null;
}

export interface GetProduct_product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
  since: any | null;
  images: GetProduct_product_brand_images[] | null;
  websiteUrl: string | null;
  logoImage: GetProduct_product_brand_logoImage | null;
}

export interface GetProduct_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface GetProduct_product_variants_manufacturerSizes {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
}

export interface GetProduct_product_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
  sleeve: number | null;
  shoulder: number | null;
  chest: number | null;
  neck: number | null;
  length: number | null;
}

export interface GetProduct_product_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  type: BottomSizeType | null;
}

export interface GetProduct_product_variants_internalSize {
  __typename: "Size";
  id: string;
  display: string;
  type: SizeType | null;
  productType: ProductType | null;
  top: GetProduct_product_variants_internalSize_top | null;
  bottom: GetProduct_product_variants_internalSize_bottom | null;
}

export interface GetProduct_product_variants_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyNewPrice: number | null;
  buyNewAvailableForSale: boolean | null;
}

export interface GetProduct_product_variants {
  __typename: "ProductVariant";
  id: string;
  displayShort: string | null;
  displayLong: string | null;
  total: number;
  reservable: number;
  nonReservable: number;
  reserved: number;
  isInBag: boolean;
  isSaved: boolean;
  isWanted: boolean;
  manufacturerSizes: GetProduct_product_variants_manufacturerSizes[] | null;
  internalSize: GetProduct_product_variants_internalSize | null;
  price: GetProduct_product_variants_price;
}

export interface GetProduct_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  createdAt: any;
  updatedAt: any;
  description: string | null;
  retailPrice: number | null;
  type: ProductType | null;
  modelSize: GetProduct_product_modelSize | null;
  modelHeight: number | null;
  color: GetProduct_product_color;
  secondaryColor: GetProduct_product_secondaryColor | null;
  brand: GetProduct_product_brand;
  outerMaterials: string[];
  innerMaterials: string[];
  images: GetProduct_product_images[];
  isSaved: boolean | null;
  variants: GetProduct_product_variants[] | null;
}

export interface GetProduct {
  product: GetProduct_product | null;
}

export interface GetProductVariables {
  slug: string;
}
