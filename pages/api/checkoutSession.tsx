import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2020-08-27",
})

export default async (req, res) => {
  const priceId = "price_1HYuqrKj0L34HDecmYXdDWrl"
  const productId = "prod_I9DHNrVSNeA5fE"
  const domainURL = "http://localhost:3000"
  const { plan } = req.body

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ]

  // Sign customer up for subscription and add donation if provided
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: lineItems,
    success_url: `${domainURL}/signup?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/cancel`,
    allow_promotion_codes: true,
  })

  res.send({
    checkoutSessionId: session.id,
  })
}
