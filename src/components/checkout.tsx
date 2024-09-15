"use client"
import { useEffect, useState } from "react"
import { useCart } from "./cart/cart-context"
import { getCartDetails } from "@/actions/cart"
import { CartDetails } from "@/types"
import Image from "next/image"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import CartItem from "./cart/cart-item"
import { Button } from "./ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
interface ShippingFormInputs {
    name: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
  }

export default function Checkout() {
    const { state } = useCart()
    const [cartDetails, setCartDetails] = useState<CartDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormInputs>()

  const onSubmit: SubmitHandler<ShippingFormInputs> = (data) => {
    console.log(data)
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
      return <div className="text-center py-12">Loading...</div>
    }
  
    if (!cartDetails || cartDetails.items.length === 0) {
      return <div className="text-center py-12">Your cart is empty. Please add some items before checking out.</div>
    }
  
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {cartDetails.items.map((item) => (
                   <CartItem
                   item={item}
                   />
                  ))}
                </ul>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex justify-between text-lg font-medium">
                    <p>Total</p>
                    <p>${cartDetails.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    {...register("name", { required: "Name is required" })} 
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                      }
                    })} 
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    type="text" 
                    id="address" 
                    {...register("address", { required: "Address is required" })} 
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      type="text" 
                      id="city" 
                      {...register("city", { required: "City is required" })} 
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      type="text" 
                      id="postalCode" 
                      {...register("postalCode", { required: "Postal code is required" })} 
                    />
                    {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    type="text" 
                    id="country" 
                    {...register("country", { required: "Country is required" })} 
                  />
                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full">
                Continue to Payment
              </Button>
            </form>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Payment</h2>
              {/* <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <Stripe>
                  <StripeCheckoutForm />
                </Stripe>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }