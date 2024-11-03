"use client"
import { getCartDetails } from "@/actions/cart"
import { CartDetails } from "@/types"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCart } from "./cart/cart-context"
import CartItem from "./cart/cart-item"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import Link from "next/link"

export interface ShippingFormInputs {
  email: string
  city: string
  inPostCode: string
  phoneNumber: string
}

// Załaduj Stripe poza komponentem, aby uniknąć wielokrotnego ładowania
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function Checkout() {
  const { state } = useCart()
  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>()

  const onSubmit: SubmitHandler<ShippingFormInputs> = async (data) => {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        shippingInfo: { ...data },
        items: state.items.map((item) => ({
          variantId: item.variantId,
          productId: item.productId,
          quantity: item.quantity,
        })),
        total: cartDetails?.total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const resData = await res.json()

    const { sessionId } = resData

    const stripe = await stripePromise
    if (!stripe) {
      throw new Error("Stripe failed to load")
    }

    // Przekierowanie do Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }

    // if (resData.url) {
    //   router.push(resData.url)
    // } else {
    //   console.error("Error creating checkout")
    // }

    // Here you would typically send this data to your server
  }

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (state.items.length > 0) {
        const details = await getCartDetails(state.items)
        setCartDetails(details)
      }
      setIsLoading(false)
    }
    fetchCartDetails()
  }, [state.items])

  if (isLoading) {
    return <div className="py-12 text-center">Loading...</div>
  }

  if (!cartDetails || cartDetails.items.length === 0) {
    return <div className="h-screen py-12 text-center">Koszyk jest pusty</div>
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-3xl font-extrabold text-gray-900">
          Podsumowanie
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Zamówienie
            </h2>
            <div className="overflow-hidden bg-background-secondary shadow sm:rounded-lg">
              <ul className="flex flex-col gap-4 p-4">
                {cartDetails.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              <div className="px-4 pb-4 sm:px-6">
                <div className="flex justify-between text-lg font-medium">
                  <p>Razem</p>
                  <p>{cartDetails.total.toFixed(2)}zł</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Informacje do dostawy
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="overflow-hidden bg-background-secondary p-6 shadow sm:rounded-lg"
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="email">Adres e-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Adres e-mail jest wymagany",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Nieprawidłowy format adresu e-mail",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Numer telefonu</Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    autoComplete="tel"
                    {...register("phoneNumber", {
                      required: "Numer telefonu jest wymagany",
                      pattern: {
                        value: /^\+?[0-9]{9,15}$/,
                        message: "Nieprawidłowy format numeru telefonu",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">Miasto</Label>
                  <Input
                    type="text"
                    id="city"
                    {...register("city", { required: "Miasto jest wymagane" })}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="inPostCode">Kod paczkomatu InPost</Label>
                  <Input
                    type="text"
                    id="inPostCode"
                    {...register("inPostCode", {
                      required: "Kod paczkomatu jest wymagany",
                      pattern: {
                        value: /^[A-Z]{3}\d{2}[A-Z0-9]{1,3}$/,
                        message: "Niepoprawny format kodu paczkomatu",
                      },
                    })}
                  />
                  {errors.inPostCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.inPostCode.message}
                    </p>
                  )}
                  <Label htmlFor="inPostCode" className="text-sm text-gray-500">
                    Obecnie wspierana jest tylko dostawa do paczkomatów InPost
                    <br />
                    Znajdź swój paczkomat{" "}
                    <Link
                      href={"https://inpost.pl/znajdz-paczkomat"}
                      className="text-primary underline"
                      target="_blank"
                    >
                      tutaj
                    </Link>
                    .
                  </Label>
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full">
                Przejdź do płatności
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
