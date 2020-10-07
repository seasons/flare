import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2020-08-27",
})

export default async (req, res) => {
  const { sessionId } = req.body

  // Sign customer up for subscription and add donation if provided
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const setupIntentID = session?.setup_intent

  const intent = await stripe.setupIntents.retrieve(setupIntentID as string)

  console.log(intent)

  res.send({
    session,
    intent,
  })
}
