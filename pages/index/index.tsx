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
import withData from "../../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { screenTrack, Schema } from "../../utils/analytics"

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
      orderBy: publishedAt_DESC
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

const Home = screenTrack(() => ({
  page: Schema.PageNames.HomePage,
  path: "/",
}))(
  withData(() => {
    const { data } = useQuery(HOME_QUERY, {})

    return (
      <Layout fixedNav>
        <Nav fixed />
        <Hero />
        <Spacer mb={10} />
        <Box px="2">
          <Separator />
        </Box>
        <Spacer mb={10} />

        <ColumnList
          title="How it works"
          items={[
            {
              title: "Choose your items",
              text:
                "Browse from over 40 different brands and reserve up to 3 pieces per order. Not sure what to get? We’ll recommend some.",
            },
            {
              title: "Wear, swap & repeat",
              text:
                "Wear the styles you want to try, but aren’t sure if you want to buy. A new way to discover your style without the commitment or buyers remorse.",
            },
            {
              title: "Returns & dry cleaning’s on us",
              text:
                "We handle the shipping back and forth, restoring and cleaning each piece for you. Oh, we cover rental insurance too.",
            },
          ]}
        />

        <Spacer mb={10} />
        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <ProductRail title="Just added tops" products={data?.justAddedTops} />
        <Spacer mb={8} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <FromCommunity blogPosts={data?.blogPosts} />
        <Spacer mb={10} />

        {!!data?.justAddedBottoms?.length && (
          <>
            <Box px="2">
              <Separator />
            </Box>

            <Spacer mb={10} />
            <ProductRail title="Just added bottoms" products={data?.justAddedBottoms} />
            <Spacer mb={10} />
          </>
        )}

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={12} />
        <ChooseMembership />
        <Spacer mb={12} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <TheApp />
        <Spacer mb={10} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <MembershipBenefits />
        <Spacer mb={10} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <TheBag />
        <Spacer mb={10} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <FAQ />
        <Spacer mb={10} />

        <Box px="2">
          <Separator />
        </Box>

        <Spacer mb={10} />
        <Brands brands={data?.brands} />
        <Spacer mb={15} />
      </Layout>
    )
  })
)

export default Home
