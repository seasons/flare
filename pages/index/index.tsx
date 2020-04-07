import React from "react"
import Head from "next/head"
import { Nav } from "../../components/Nav/Nav"
import { ColumnList, Hero, ProductRail, UsaMap, ChooseMembership, FAQ } from "./Components"
import { Spacer, Layout, Separator } from "../../components"
import withData from "../../lib/apollo"
import { useQuery } from "@apollo/react-hooks"
import { HOME_QUERY } from "./homeQuery"
import { Brands } from "./Components/Brands"

const Home = withData(() => {
  const { data } = useQuery(HOME_QUERY, {})

  return (
    <Layout fixedNav>
      <Head>
        <title>Seasons</title>
        <meta content="Seasons change. Your wardrobe should change with them." name="description" />
      </Head>
      <Nav fixed />
      <Spacer mt="100px" />
      <Hero />
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
      <ProductRail title="Just added" products={data?.justAddedProducts} />
      <Separator />
      <Spacer mb={6} />
      <UsaMap />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ProductRail title="Just added" products={data?.justAddedProducts} />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ChooseMembership />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <ColumnList
        title="Members benefits"
        items={[
          {
            title: "Quick & easy returns",
            text: "Pack up all 3 pieces, insert the prepaid return label, and drop off at the nearest UPS location.",
          },
          {
            title: "Free dry cleaning",
            text: "Each piece is carefully inspected, cleaned and restored before being delivered to your door.",
          },
          {
            title: "1 to 2 day shipping",
            text: "All orders are processed, shipped and delivered within 1- 2 business days via UPS.",
          },
          {
            title: "Rental insurance",
            text:
              "Any stain, tear or damage gets fixed by us. Just pack it up and ship it back. Lost it? Things happen. We'll just charge a fee to replace it.",
          },
          {
            title: "New styles as they drop",
            text:
              "We buy the newest and latest collections. See something you like that we don't carry? Send us a message on Instagram.",
          },
          {
            title: "Pause or cancel anytime",
            text:
              "Want to take a break for a month? Pause or cancel your membership right in the app. Easily renew whenever you want.",
          },
        ]}
      />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <FAQ />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
      <Brands brands={data?.brands} />
      <Spacer mb={6} />
      <Separator />
      <Spacer mb={6} />
    </Layout>
  )
})

export default Home
