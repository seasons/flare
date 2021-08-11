/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ViewType } from "./globalTypes";

// ====================================================
// GraphQL query operation: HowDidYouFindOutAboutUs
// ====================================================

export interface HowDidYouFindOutAboutUs_howDidYouFindOutAboutUs {
  __typename: "View";
  id: string;
  title: string;
  caption: string | null;
  type: ViewType | null;
  properties: any | null;
}

export interface HowDidYouFindOutAboutUs {
  howDidYouFindOutAboutUs: HowDidYouFindOutAboutUs_howDidYouFindOutAboutUs | null;
}
