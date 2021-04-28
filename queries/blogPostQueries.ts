import { gql } from "@apollo/client"

export const BlogPost_Query = gql`
  query BlogPost_Query($slug: String!) {
    blogPost(where: { slug: $slug }) {
      id
      slug
      name
      author
      category
      content
      summary
      image {
        id
        url
      }
    }
  }
`
