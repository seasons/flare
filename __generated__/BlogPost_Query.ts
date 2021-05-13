/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPost_Query
// ====================================================

export interface BlogPost_Query_blogPost_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface BlogPost_Query_blogPost {
  __typename: "BlogPost";
  id: string;
  slug: string;
  name: string | null;
  author: string | null;
  category: string | null;
  content: string | null;
  summary: string | null;
  image: BlogPost_Query_blogPost_image | null;
}

export interface BlogPost_Query {
  blogPost: BlogPost_Query_blogPost | null;
}

export interface BlogPost_QueryVariables {
  slug: string;
}
