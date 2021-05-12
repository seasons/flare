/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SavedItemsTabFragment_Me
// ====================================================

export interface SavedItemsTabFragment_Me_savedItems_productVariant_product_brand {
  __typename: "Brand";
  id: string;
  name: string;
}

export interface SavedItemsTabFragment_Me_savedItems_productVariant_product_images {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface SavedItemsTabFragment_Me_savedItems_productVariant_product {
  __typename: "Product";
  id: string;
  slug: string;
  name: string;
  brand: SavedItemsTabFragment_Me_savedItems_productVariant_product_brand;
  images: SavedItemsTabFragment_Me_savedItems_productVariant_product_images[];
}

export interface SavedItemsTabFragment_Me_savedItems_productVariant {
  __typename: "ProductVariant";
  id: string;
  reservable: number;
  displayLong: string | null;
  hasRestockNotification: boolean;
  product: SavedItemsTabFragment_Me_savedItems_productVariant_product;
}

export interface SavedItemsTabFragment_Me_savedItems {
  __typename: "BagItem";
  id: string;
  saved: boolean | null;
  productVariant: SavedItemsTabFragment_Me_savedItems_productVariant;
}

export interface SavedItemsTabFragment_Me {
  __typename: "Me";
  id: string | null;
  savedItems: SavedItemsTabFragment_Me_savedItems[] | null;
}
