/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Blog_Query
// ====================================================

export interface Blog_Query_connection_aggregate {
  __typename: "AggregateBlogPost";
  count: number;
}

export interface Blog_Query_connection {
  __typename: "BlogPostConnection";
  aggregate: Blog_Query_connection_aggregate;
}

export interface Blog_Query_blogPosts_edges_node_image {
  __typename: "Image";
  id: string;
  url: string | null;
}

export interface Blog_Query_blogPosts_edges_node {
  __typename: "BlogPost";
  id: string;
  slug: string;
  url: string | null;
  name: string | null;
  author: string | null;
  category: string | null;
  image: Blog_Query_blogPosts_edges_node_image | null;
}

export interface Blog_Query_blogPosts_edges {
  __typename: "BlogPostEdge";
  /**
   * The item at the end of the edge.
   */
  node: Blog_Query_blogPosts_edges_node;
}

export interface Blog_Query_blogPosts {
  __typename: "BlogPostConnection";
  /**
   * A list of edges.
   */
  edges: (Blog_Query_blogPosts_edges | null)[];
}

export interface Blog_Query {
  connection: Blog_Query_connection;
  blogPosts: Blog_Query_blogPosts;
}

export interface Blog_QueryVariables {
  first: number;
  skip: number;
}
