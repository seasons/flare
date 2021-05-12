/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductBuyCTA_ProductVariantFragment
// ====================================================

export interface ProductBuyCTA_ProductVariantFragment_price {
  __typename: "ProductVariantPrice";
  id: string;
  buyUsedEnabled: boolean;
  buyUsedPrice: number | null;
  buyUsedAvailableForSale: boolean | null;
  buyNewEnabled: boolean;
  buyNewPrice: number | null;
  buyNewAvailableForSale: boolean | null;
}

export interface ProductBuyCTA_ProductVariantFragment {
  __typename: "ProductVariant";
  id: string;
  price: ProductBuyCTA_ProductVariantFragment_price;
}
