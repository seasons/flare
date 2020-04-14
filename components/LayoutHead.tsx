import Head from "next/head"

export const LayoutHead: React.FC<{ title?: string }> = ({ title }) => {
  const description = "Seasons change. Your wardrobe should change with them."
  return (
    <Head>
      <title>{title || "Seasons"}</title>
      <meta content={description} name="description" />
      <meta property="og:title" content="Seasons" />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Seasons" />
      <meta property="og:url" content="https://www.seasons.nyc" />
      <meta property="og:image" content="https://flare-public-assets.s3.amazonaws.com/logo.png" />
      <meta property="twitter:card" content="summary" />
      <meta http-equiv="content-language" content="en-us" />
    </Head>
  )
}
