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

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  console.log("Received webhook request")

  const body = await request.text()

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
    // console.log("session: ", session)

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    })
    // console.log("lineItems: ", lineItems)

    const variantIds = lineItems.data
      .map((item) => {
        const product = item.price?.product as Stripe.Product
        return product.metadata.variantId
      })
      .filter(Boolean)
    // console.log("variantIds: ", variantIds)

    const productDetails = await prisma.variant.findMany({
      where: { id: { in: variantIds } },
      include: { product: true },
    })
    // console.log("productDetails: ", productDetails)

    const productDetailsWithQuantity = productDetails.map((product) => ({
      ...product,
      quantity:
        lineItems.data.find(
          (item) =>
            (item.price?.product as Stripe.Product).metadata.variantId ===
            product.id
        )?.quantity || 0,
    }))
    // console.log("productDetailsWithQuantity: ", productDetailsWithQuantity)

    // Aktualizacja ilości w bazie danych
    for (const variant of productDetailsWithQuantity) {
      try {
        await prisma.variant.update({
          where: { id: variant.id },
          data: { stock: { decrement: variant.quantity } },
        })
        // console.log(`Zaktualizowano ilość dla wariantu ${variant.id}`)
      } catch (error) {
        console.error(
          `Błąd podczas aktualizacji ilości dla wariantu ${variant.id}:`,
          error
        )
      }
    }

    const shippingInfo: ShippingFormInputs =
      session.metadata as unknown as ShippingFormInputs
    // console.log("shippingInfo: ", shippingInfo)

    // Create order in the database
    try {
      const order = await prisma.order.create({
        data: {
          id: session.id,
          email: shippingInfo.email,
          city: shippingInfo.city,
          inpostCode: shippingInfo.inPostCode,
          phone: shippingInfo.phoneNumber,
          info: JSON.stringify(
            productDetailsWithQuantity.map((variant) => ({
              variantId: variant.id,
              quantity: variant.quantity,
              productName: variant.product.name,
              variantName: variant.name,
              price: variant.product.price,
              productImage: variant.product.mainImage,
              color: variant.color,
            }))
          ),
        },
      })
      console.log("Order created successfully:", order)
    } catch (error) {
      console.error("Error creating order:", error)
    }

    // Send order confirmation to customer
    try {
      await resend.emails.send({
        from: `Holly Smile <${process.env.WEBSITE_EMAIL}>`,
        to: [shippingInfo.email],
        subject: "Potwierdzenie zamówienia z Holly Smile",
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
        from: `Holly Smile <${process.env.WEBSITE_EMAIL}>`,
        to: [process.env.OWNER_EMAIL!],
        subject: "Nowe zamówienie z Holly Smile - " + session.id,
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

/*
[{"id":"a78b13d5-484e-4254-b1e8-6d66d546d9d0","name":"Czarny","color":"#242424","stock":24,"price":null,"image":null,"productId":"9a4b8d7e-028c-45b1-8bec-aad3d96198f2","product":{"id":"9a4b8d7e-028c-45b1-8bec-aad3d96198f2","name":"Szczoteczka Soniczna","description":"Świetna szczoteczka soniczna","price":250,"stock":49,"mainImage":"https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2321.webp","images":["https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2321.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2375.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2400.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2404.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2427.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2437.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2493.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2670.webp"],"createdAt":"2024-09-11T08:34:36.743Z","updatedAt":"2024-09-13T06:38:40.773Z"},"quantity":1},{"id":"6d284164-5c97-46f8-9761-071f14202208","name":"Różowy","color":"#ffd3c4","stock":25,"price":null,"image":null,"productId":"9a4b8d7e-028c-45b1-8bec-aad3d96198f2","product":{"id":"9a4b8d7e-028c-45b1-8bec-aad3d96198f2","name":"Szczoteczka Soniczna","description":"Świetna szczoteczka soniczna","price":250,"stock":49,"mainImage":"https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2321.webp","images":["https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2321.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2375.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2400.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2404.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2427.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2437.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2493.webp","https://dehjtwqjlvvbxcwvmvhr.supabase.co/storage/v1/object/public/hollysmile-images//DSCF2670.webp"],"createdAt":"2024-09-11T08:34:36.743Z","updatedAt":"2024-09-13T06:38:40.773Z"},"quantity":2}]
*/
