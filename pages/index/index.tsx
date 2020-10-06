import React from "react"
import { Nav } from "../../components/Nav/Nav"
import {
  ColumnList,
  Hero,
  ProductRail,
  ChooseMembership,
  FAQ,
  Brands,
  MembershipBenefits,
  TheBag,
  TheApp,
  FromCommunity,
} from "../../components/Homepage"
import { Spacer, Layout, Separator, Box } from "../../components"
import { gql, useQuery } from "@apollo/client"
import { screenTrack, Schema } from "../../utils/analytics"
import { BRAND_LIST } from "../../components/Homepage/Brands"
import { HOW_IT_WORKS_TEXT } from "../../components/Product/HowItWorks"

const HomePageProductFragment = gql`
  fragment HomePageProduct on Product {
    id
    slug
    name
    images {
      url
      id
    }
    brand {
      id
      name
    }
    variants {
      id
      total
      reservable
      nonReservable
      reserved
      internalSize {
        display
      }
    }
  }
`

export const HOME_QUERY = gql`
  query GetBrowseProducts($brandSlugs: [String!]) {
    paymentPlans(where: { status: "active" }) {
      id
      name
      description
      tagline
      price
      planID
      tier
      itemCount
    }
    brands(where: { products_some: { id_not: null }, name_not: null, slug_in: $brandSlugs }) {
      id
      slug
      name
      products {
        id
      }
    }
    blogPosts(count: 3) {
      id
      url
      name
      author
      imageURL
    }
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
    justAddedBottoms: products(
      first: 4
      category: "bottoms"
      orderBy: publishedAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
    newArchival: products(
      first: 4
      orderBy: publishedAt_DESC
      where: { AND: [{ tags_some: { name: "Vintage" } }, { status: Available }] }
    ) {
      ...HomePageProduct
    }
  }
  ${HomePageProductFragment}
`

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(() => {
  const { data } = useQuery(HOME_QUERY, {
    variables: {
      brandSlugs: BRAND_LIST,
    },
  })

  const communityPosts = data?.blogPosts?.slice(1, 3)

  return (
    <Layout fixedNav>
      <Nav fixed />
      <Hero post={data?.blogPosts?.[0]} />
      <Spacer mb={10} />

      <ColumnList items={HOW_IT_WORKS_TEXT} />

      <Spacer mb={10} />
      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <ProductRail title="Just added tops" products={data?.justAddedTops} />

      <Spacer mb={10} />
      <FromCommunity blogPosts={communityPosts} />

      {!!data?.justAddedBottoms?.length && (
        <>
          <Spacer mb={10} />
          <ProductRail title="Just added bottoms" products={data?.justAddedBottoms} />
          <Spacer mb={10} />
        </>
      )}

      {!!data?.newArchival?.length && (
        <>
          <ProductRail title="New to the archive" products={data?.newArchival} />
          <Spacer mb={10} />
        </>
      )}

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <ChooseMembership paymentPlans={data?.paymentPlans} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <TheApp />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <MembershipBenefits />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <TheBag />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <FAQ />
      <Spacer mb={10} />

      <Box px={[2, 2, 2, 5, 5]}>
        <Separator />
      </Box>

      <Spacer mb={10} />
      <Brands brands={data?.brands} />
      <Spacer mb={15} />
    </Layout>
  )
})

export default Home
