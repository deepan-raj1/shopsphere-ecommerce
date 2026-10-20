import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

const initialCartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "https://via.placeholder.com/300x200",
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image: "https://via.placeholder.com/300x200",
    quantity: 2,
  },
];

const initialWishlistItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2399,
    image: "https://via.placeholder.com/300x200",
  },
];

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [wishlistItems, setWishlistItems] = useState(
    initialWishlistItems
  );

  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product) => {
    setWishlistItems((items) => {
      const alreadyExists = items.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return items;
      }

      return [...items, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  return useContext(ShopContext);
};

