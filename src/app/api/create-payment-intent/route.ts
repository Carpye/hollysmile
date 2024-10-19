import { NextRequest, NextResponse } from "next/server"
import stripe from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { ShippingFormInputs } from "@/components/checkout"
import { Product, Variant } from "@prisma/client"
import { ICartItem } from "@/components/cart/cart-context"

export async function POST(request: NextRequest) {
  try {
    const { total, shippingInfo, items } = await request.json() as { total: number, shippingInfo: ShippingFormInputs, items: { variantId: string, quantity: number, productId: string }[] }

    const variants = await prisma.variant.findMany({
      where: {
        id: {
          in: items.map((item: { variantId: string }) => item.variantId),
        },
      },
      include: {
        product: true
      }
    })



    console.log(items);
    console.log(variants);

    if (variants.length !== items.length) {
      return NextResponse.json({ message: "Nie udało się utworzyć sesji płatności" }, { status: 500 })
    }

    // Tworzenie sesji płatności Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "blik"],
      // line_items: [
      //   {
      //     price_data: {
      //       currency: "pln",
      //       product_data: {
      //         name: "Szczoteczka Holly Smile",

      //       },
      //       unit_amount: Number(price) * 100, // kwota w groszach
            
      //     },
      //     quantity: items[0].quantity,
      //     adjustable_quantity: {
      //       enabled: true,
      //       minimum: 1,
      //       maximum: 10,
      //     },
      //   },
        
      // ],
      line_items: items.map((item) => {
        const variantMatch = findVariantMatch(variants, item)
        return {
        price_data: {
          currency: "pln",
          product_data: {
            name: variantMatch?.name ?? variantMatch!.product.name,
            metadata: {
              variantId: variantMatch.id
            },
          },
          unit_amount: variantMatch!.product.price * 100, // kwota w groszach
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: variantMatch?.stock
        }
      }}),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/canceled`,
      metadata: {
        ...shippingInfo,
      }
    })

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (err: any) {
    console.error(err)

    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only supports POST requests" },
    { status: 405 }
  )
}


function findVariantMatch(variants: (Variant & { product: Product })[], item: ICartItem): Variant & { product: Product } {
  return variants.find((variant) => variant.id === item.variantId) as Variant & { product: Product }
}
