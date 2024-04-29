import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/shoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  //these are the function we need to implement "store" element.
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

//this is common pattern for context provider in React
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Creating the Context
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Creating the custom hook for the context
//Any component that needs to access the shopping cart context can use this hook.
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
    //if the item is not found, return 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      //If the item doesn't exist in the cart, add it with quantity 1 or else increase the quantity by 1
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      //If the item doesn't exist in the cart, add it with quantity 1 or else increase the quantity by 1
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
      <ShoppingCart cartOpen={cartOpen} />
    </ShoppingCartContext.Provider>
  );
}
