import { getCartDetails } from "./actions/cart";

export type CartDetails = Awaited<ReturnType<typeof getCartDetails>>