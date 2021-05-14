/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DrawerFAQ_Query
// ====================================================

export interface DrawerFAQ_Query_faq_sections_subsections {
  __typename: "FaqSubsection";
  title: string;
  text: string;
}

export interface DrawerFAQ_Query_faq_sections {
  __typename: "FaqSection";
  title: string;
  subsections: DrawerFAQ_Query_faq_sections_subsections[];
}

export interface DrawerFAQ_Query_faq {
  __typename: "Faq";
  sections: DrawerFAQ_Query_faq_sections[];
}

export interface DrawerFAQ_Query {
  faq: DrawerFAQ_Query_faq | null;
}
