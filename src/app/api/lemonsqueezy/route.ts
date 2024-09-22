import { lemonSqueezyApiInstance } from "@/lib/axios"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json()

    console.log(reqData)

    const productId = "526538"
    // reqData.items[0].productId.toString()

    if (!productId) {
      console.error("Product ID is missing")
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      )
    }

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: "123",
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              // id: reqData.items[0].productId.toString(),
              id: productId,
            },
          },
        },
      },
    })

    const checkoutUrl = response.data.data.attributes.url

    console.log(response.data)

    return NextResponse.json(response.data.data.attributes, { status: 200 })
  } catch (error) {
    console.error("Error in POST /api/lemonsqueezy:", error)

    return NextResponse.json({ message: "An error occured" }, { status: 500 })
  }
}
