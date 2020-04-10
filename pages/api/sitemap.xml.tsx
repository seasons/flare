import { NextApiRequest, NextApiResponse } from "next"
import { SitemapStream, streamToPromise, EnumChangefreq } from "sitemap"
import { createGzip } from "zlib"

const fetchProducts = () => {
  return fetch(`https://monsoon.seasons.nyc/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "{ products { slug updatedAt } }" }),
  }).then((res) => res.json())
}

// https://annacoding.com/article/10Sarw7UOPidixIhFDtnY5/How-to-generate-sitemap.xml-with-Next.js-build-in-server-and-Typescript
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!res) return {}
  try {
    // Set response header
    res.setHeader("content-type", "application/xml")
    res.setHeader("Content-Encoding", "gzip")

    // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
    // The readable stream it transforms must be in object mode.
    const smStream = new SitemapStream({
      hostname: "https://www.seasons.nyc",
    })

    const pipeline = smStream.pipe(createGzip())
    // Add any static entries here
    smStream.write({ url: "/", lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY })
    smStream.write({ url: "/browse", lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY })
    smStream.write({ url: "/about", lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY })
    smStream.write({ url: "/contact", lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY })
    // E.g. we create a sitemap.xml for articles
    // Set products change frequencey is weekly
    const products = await fetchProducts()
    products?.data?.products.map((product) => {
      console.log("product", product.slug)
      smStream.write({
        url: `/product/${product.slug}`,
        lastmod: product.updatedAt,
        changefreq: EnumChangefreq.WEEKLY,
      })
    })
    smStream.end()

    // cache the response
    // streamToPromise.then(sm => sitemap = sm)
    streamToPromise(pipeline)
    // stream the response
    pipeline.pipe(res).on("error", (e) => {
      throw e
    })
  } catch (e) {
    res.status(500).end()
  }
}
