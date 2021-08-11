/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGift
// ====================================================

export interface GetGift_gift {
  __typename: "ChargebeeGift";
  gift: any | null;
  subscription: any | null;
}

export interface GetGift {
  gift: GetGift_gift | null;
}

export interface GetGiftVariables {
  giftID: string;
}
