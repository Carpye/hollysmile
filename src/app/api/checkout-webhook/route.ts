import { NextRequest, NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import Stripe from "stripe"
import { headers } from "next/headers"
import { Resend } from "resend"
import {
  CustomerEmailTemplate,
  OwnerEmailTemplate,
} from "@/components/email-template"
import { ShippingFormInputs } from "@/components/checkout"
import { prisma } from "@/lib/prisma"
import { buffer } from "stream/consumers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  console.log("Received webhook request")

  // Read the raw request body
  // ! This is a temporary workaround
  // @ts-ignore
  const rawBody = await buffer(request.body!)
  console.log("rawBody: ", rawBody)

  const body = rawBody.toString()
  console.log("body: ", body)

  const signature = headers().get("stripe-signature")!
  console.log("signature: ", signature)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log("event: ", event)
  } catch (err: any) {
    console.log(`Webhook Error: ${err.message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    console.log("session: ", session)

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    })
    console.log("lineItems: ", lineItems)

    const variantIds = lineItems.data
      .map((item) => {
        const product = item.price?.product as Stripe.Product
        return product.metadata.variantId
      })
      .filter(Boolean)
    console.log("variantIds: ", variantIds)

    const productDetails = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    })
    console.log("productDetails: ", productDetails)

    const productDetailsWithQuantity = productDetails.map((product) => ({
      ...product,
      quantity:
        lineItems.data.find(
          (item) =>
            (item.price?.product as Stripe.Product).metadata.variantId ===
            product.id
        )?.quantity || 0,
    }))
    console.log("productDetailsWithQuantity: ", productDetailsWithQuantity)

    // Aktualizacja ilości w bazie danych
    for (const variant of productDetailsWithQuantity) {
      try {
        await prisma.variant.update({
          where: { id: variant.id },
          data: { stock: { decrement: variant.quantity } },
        })
        console.log(`Zaktualizowano ilość dla wariantu ${variant.id}`)
      } catch (error) {
        console.error(
          `Błąd podczas aktualizacji ilości dla wariantu ${variant.id}:`,
          error
        )
      }
    }

    const shippingInfo: ShippingFormInputs =
      session.metadata as unknown as ShippingFormInputs
    console.log("shippingInfo: ", shippingInfo)

    // Send order confirmation to customer
    try {
      await resend.emails.send({
        from: "Holly Smile <hollysmile@thefinalpath.net>",
        to: [shippingInfo.email],
        subject: "Order confirmation " + session.id,
        react: CustomerEmailTemplate({
          shippingInfo,
          productDetails: productDetailsWithQuantity,
        }),
      })
      console.log("Customer email sent successfully")
    } catch (error) {
      console.error("Error sending customer email:", error)
    }

    // Send order notification to owner
    try {
      await resend.emails.send({
        from: "Holly Smile <hollysmile@thefinalpath.net>",
        to: [process.env.OWNER_EMAIL!],
        subject: "New order " + session.id,
        react: OwnerEmailTemplate({
          shippingInfo,
          sessionData: session,
          productDetails: productDetailsWithQuantity,
        }),
      })
      console.log("Owner email sent successfully")
    } catch (error) {
      console.error("Error sending owner email:", error)
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
