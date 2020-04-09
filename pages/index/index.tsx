import React from "react"
import Head from "next/head"
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
    justAddedTops: products(
      first: 4
      category: "tops"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      images
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
    justAddedPants: products(
      first: 4
      category: "pants"
      orderBy: createdAt_DESC
      where: { AND: [{ variants_some: { id_not: null } }, { status: Available }] }
    ) {
      id
      images
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
      <Head>
        <title>Seasons</title>
        <meta content="Seasons change. Your wardrobe should change with them." name="description" />
      </Head>
      <Nav fixed />
      <Spacer mt="59px" />
      <Hero />
      <Separator />
      <Spacer mb={6} />
      <AsSeenIn />
      <Spacer mb={6} />
      <Separator />
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
      <Spacer mb={6} />
      <ProductRail title="Just added tops" products={data?.justAddedTops} />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <UsaMap />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ProductRail title="Just added pants" products={data?.justAddedPants} />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ChooseMembership />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <MembershipBenefits />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <FAQ />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <Brands brands={data?.brands} />
      <Spacer mb={6} />
    </Layout>
  )
})

export default Home
