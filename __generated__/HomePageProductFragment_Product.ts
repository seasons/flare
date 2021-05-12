/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductType, LetterSize } from "./globalTypes";

// ====================================================
// GraphQL fragment: HomePageProductFragment_Product
// ====================================================

export interface HomePageProductFragment_Product_modelSize {
  __typename: "Size";
  id: string;
  display: string;
}

export interface HomePageProductFragment_Product_brand {
  __typename: "Brand";
  id: string;
  slug: string;
  name: string;
}

export interface HomePageProductFragment_Product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomePageProductFragment_Product_variants_internalSize_top {
  __typename: "TopSize";
  id: string;
  letter: LetterSize | null;
}

export interface HomePageProductFragment_Product_variants_internalSize_bottom {
  __typename: "BottomSize";
  id: string;
  value: string | null;
}

export interface HomePageProductFragment_Product_variants_internalSize {
  __typename: "Size";
  id: string;
  top: HomePageProductFragment_Product_variants_internalSize_top | null;
  bottom: HomePageProductFragment_Product_variants_internalSize_bottom | null;
}

export interface HomePageProductFragment_Product_variants {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayShort: string | null;
  isSaved: boolean;
  internalSize: HomePageProductFragment_Product_variants_internalSize | null;
}

export interface HomePageProductFragment_Product_extraLargeImages {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface HomePageProductFragment_Product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  retailPrice: number | null;
  type: ProductType | null;
  modelSize: HomePageProductFragment_Product_modelSize | null;
  brand: HomePageProductFragment_Product_brand;
  images: HomePageProductFragment_Product_images[];
  variants: HomePageProductFragment_Product_variants[] | null;
  extraLargeImages: HomePageProductFragment_Product_extraLargeImages[];
  description: string | null;
}
