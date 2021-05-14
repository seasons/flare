/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SaveProductButton_SaveItem
// ====================================================

export interface SaveProductButton_SaveItem_saveProduct_productVariant {
  __typename: "ProductVariant";
  id: string;
  isSaved: boolean;
}

export interface SaveProductButton_SaveItem_saveProduct {
  __typename: "BagItem";
  id: string;
  productVariant: SaveProductButton_SaveItem_saveProduct_productVariant;
}

export interface SaveProductButton_SaveItem {
  saveProduct: SaveProductButton_SaveItem_saveProduct | null;
}

export interface SaveProductButton_SaveItemVariables {
  item: string;
  save: boolean;
}
