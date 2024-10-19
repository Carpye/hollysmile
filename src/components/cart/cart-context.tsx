"use client"
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react"

// Define the structure of a cart item
export interface ICartItem {
  productId: string
  quantity: number
  variantId: string
}

// Define the structure of the cart state
interface CartState {
  items: ICartItem[]
}

// Define the possible actions for the cart
type CartAction =
  | { type: "ADD_ITEM"; payload: ICartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { variantId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: ICartItem[] }

// Create the initial state
const initialState: CartState = {
  items: [],
}

// Create the context
const CartContext = createContext<
  | {
      state: CartState
      dispatch: React.Dispatch<CartAction>
    }
  | undefined
>(undefined)

// Create a cart reducer function
function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState
  switch (action.type) {
    case "ADD_ITEM": {
      if (action.payload.variantId) {
        const existingItemIndex = state.items.findIndex(
          (item) => item.variantId === action.payload.variantId
        )
        if (existingItemIndex > -1) {
          const newItems = state.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
          newState = { ...state, items: newItems }
        } else {
          newState = { ...state, items: [...state.items, action.payload] }
        }

        break
      }

      const existingItemIndex = state.items.findIndex(
        (item) => item.variantId === action.payload.variantId
      )
      if (existingItemIndex > -1) {
        const newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        newState = { ...state, items: newItems }
      } else {
        newState = { ...state, items: [...state.items, action.payload] }
      }
      break
    }
    case "REMOVE_ITEM": {
      newState = {
        ...state,
        items: state.items.filter((item) => item.variantId !== action.payload),
      }
      break
    }
    case "UPDATE_QUANTITY": {
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.payload.variantId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
      break
    }
    case "CLEAR_CART":
      newState = initialState
      break
    case "LOAD_CART":
      newState = { ...state, items: action.payload }
      break
    default:
      newState = state
  }

  // Save to local storage after each action
  localStorage.setItem("cart", JSON.stringify(newState.items))
  return newState
}

// Create a CartProvider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (!Array.isArray(parsedCart)) {
          throw new Error("Nieprawidłowy format koszyka");
        }

        if (parsedCart.length === 0) {
          console.log("Koszyk jest pusty");
          dispatch({ type: "CLEAR_CART" });
          return;
        }

        for (const item of parsedCart) {
          if (
            typeof item !== "object" ||
            !item.hasOwnProperty("productId") ||
            !item.hasOwnProperty("variantId") ||
            !item.hasOwnProperty("quantity") ||
            typeof item.productId !== "string" ||
            typeof item.variantId !== "string" ||
            typeof item.quantity !== "number"
          ) {
            throw new Error("Nieprawidłowa struktura elementu koszyka");
          }
          
          if (item.quantity <= 0) {
            console.log("Opróżnianie koszyka");
            throw new Error("Nieprawidłowa ilość w koszyku");
          }
        }
        
        console.log("Koszyk jest prawidłowy, ładowanie koszyka");
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Błąd podczas ładowania koszyka:", error);
        localStorage.removeItem("cart");
        dispatch({ type: "CLEAR_CART" });
      }
    }
  }, [])

  useEffect(() => {
    console.log(state.items)
  }, [state.items])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// Create a custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Create utility functions for common cart operations
export function useCartActions() {
  const { dispatch } = useCart()

  const addToCart = (productId: string, variantId: string, quantity: number = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { productId, quantity, variantId } })
  }

  const removeFromCart = (variantId: string) => {
    console.log(variantId)

    dispatch({ type: "REMOVE_ITEM", payload: variantId })
  }

  const updateQuantity = (variantId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { variantId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return { addToCart, removeFromCart, updateQuantity, clearCart }
}
