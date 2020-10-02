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
import withApollo from "../../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { screenTrack, Schema } from "../../utils/analytics"
import { BRAND_LIST } from "../../components/Homepage/Brands"

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
    blogPosts(count: 2) {
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
  withApollo({ ssr: true })(() => {
    const { data } = useQuery(HOME_QUERY, {
      variables: {
        brandSlugs: BRAND_LIST,
      },
    })

    return (
      <Layout fixedNav>
        <Nav fixed />
        <Hero />
        <Spacer mb={10} />

        <ColumnList
          items={[
            {
              title: "Reserve your favorite styles",
              text:
                "Browse from a curated list of brands and reserve up to 3 pieces at a time. Save your favorites for later & build a queue.",
            },
            {
              title: "Wear for up to 30-days",
              text:
                "Wear the styles you want to try, but aren’t sure if you want to buy. A new way to discover your style without the commitment or buyers remorse.",
            },
            {
              title: "Shipping & returns are on us",
              text:
                "We handle the shipping back and forth, restoring and cleaning each piece for you. We cover rental insurance too.",
            },
          ]}
        />

        <Spacer mb={10} />
        <Box px={[2, 2, 2, 5, 5]}>
          <Separator />
        </Box>

        <Spacer mb={10} />
        <ProductRail title="Just added tops" products={data?.justAddedTops} />
        <Spacer mb={8} />

        <Box px={[2, 2, 2, 5, 5]}>
          <Separator />
        </Box>

        <Spacer mb={10} />
        <FromCommunity blogPosts={data?.blogPosts} />
        <Spacer mb={10} />

        {!!data?.justAddedBottoms?.length && (
          <>
            <Box px={[2, 2, 2, 5, 5]}>
              <Separator />
            </Box>

            <Spacer mb={10} />
            <ProductRail title="Just added bottoms" products={data?.justAddedBottoms} />
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
)

export default Home
