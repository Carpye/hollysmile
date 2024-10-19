import axios from "axios"

export const STRIPE_ENDPOINT = "https://api.stripe.com/"

export const stripeApi = axios.create({
  baseURL: STRIPE_ENDPOINT,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${process.env.STRIPE_API_KEY}`,
  },
})
