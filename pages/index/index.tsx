import React from "react"
import { Nav } from "../../components/Nav/Nav"
import {
  ColumnList,
  Hero,
  ProductRail,
  UsaMap,
  ChooseMembership,
  FAQ,
  Brands,
  MembershipBenefits,
  AsSeenIn,
  TheBag,
  TheApp,
  FromCommunity,
} from "../../components/Homepage"
import { Spacer, Layout, Separator } from "../../components"
import withData from "../../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

export const HOME_QUERY = gql`
  query GetBrowseProducts {
    brands {
      id
      slug
      name
      products {
        id
      }
    }
    blogPosts(collection: "5e72a4bad1075fcf7313bf38", count: 3) {
      id
      url
      name
      author
      imageURL
    }
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
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
    justAddedBottoms: products(
      first: 4
      category: "bottoms"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
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
  }
`

const Home = withData(() => {
  const { data } = useQuery(HOME_QUERY, {})

  return (
    <Layout fixedNav>
      <Nav fixed />
      <Hero />
      <Separator />

      <Spacer mb={5} />
      <AsSeenIn />
      <Spacer mb={5} />

      <Separator />
      <Spacer mb={6} />

      <ColumnList
        items={[
          {
            title: "Pick your 3 styles",
            text:
              "Browse our curated brands and reserve up to 3 tops at a time. We'll deliver them straight to your door with a pre-paid return shipping label.",
          },
          {
            title: "Rotate them out",
            text:
              "Wear them once or as many times as you want. Ready for something new? Return all 3 of your pieces and reserve your next order.",
          },
          {
            title: "Shipping & dry cleaning's on us",
            text:
              "We handle the back and forth, restoring and cleaning each piece before it gets to you. Oh, rental insurance is covered too.",
          },
        ]}
      />

      <Spacer mb={10} />
      <ProductRail title="Just added tops" products={data?.justAddedTops} />
      <Spacer mb={8} />

      <Separator />

      <Spacer mb={10} />
      <FromCommunity blogPosts={data?.blogPosts} />
      <Spacer mb={10} />

      <Separator />

      <Spacer mb={6} />
      <ProductRail title="Just added bottoms" products={data?.justAddedBottoms} />
      <Spacer mb={2} />

      <Separator />

      <Spacer mb={15} />
      <ChooseMembership />
      <Spacer mb={15} />

      <Separator />

      <Spacer mb={15} />
      <MembershipBenefits />
      <Spacer mb={15} />

      <Separator />

      <Spacer mb={10} />
      <TheApp />
      <Spacer mb={10} />

      <Separator />

      <Spacer mb={13} />
      <TheBag />
      <Spacer mb={13} />

      <Separator />

      <Spacer mb={15} />
      <FAQ />
      <Spacer mb={15} />

      <Separator />

      <Spacer mb={15} />
      <UsaMap />
      <Spacer mb={15} />

      <Brands brands={data?.brands} />
      <Spacer mb={15} />
    </Layout>
  )
})

export default Home
