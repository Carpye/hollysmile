import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNATURE

    console.log(secret)

    if (!secret) {
      console.error("LEMON_SQUEEZY_WEBHOOK_SIGNATURE is not set")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const signature = request.headers.get("X-Signature")

    if (!signature) {
      console.error("X-Signature header is missing")
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    const hmac = crypto.createHmac("sha256", secret)
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8")
    const signatureBuffer = Buffer.from(signature, "utf8")

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error("Invalid signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    console.log("Order webhook received:", JSON.parse(rawBody))

    // Process the webhook payload here
    // For example, update database, send emails, etc.

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Webhook endpoint is functioning" },
    { status: 200 }
  )
}
