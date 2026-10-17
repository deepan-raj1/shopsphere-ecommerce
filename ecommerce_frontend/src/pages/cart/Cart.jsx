import { useState } from "react";
import { Link } from "react-router-dom";

const initialCartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    quantity: 1,
    image: "https://via.placeholder.com/150x150?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    quantity: 2,
    image: "https://via.placeholder.com/150x150?text=Smart+Watch",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <p className="text-gray-600 mt-2">
          Review your items before checkout.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col sm:flex-row gap-5"
              >

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />

                {/* Product Information */}
                <div className="flex-1">

                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-4">

                    <label className="text-sm font-medium block mb-2">
                      Quantity
                    </label>

                    <div className="flex items-center">

                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        className="w-10 h-10 border border-gray-300 rounded-l-lg font-bold disabled:opacity-40"
                      >
                        −
                      </button>

                      <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                        {item.quantity}
                      </div>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 border border-gray-300 rounded-r-lg font-bold"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

                {/* Item Subtotal & Remove */}
                <div className="flex flex-row sm:flex-col justify-between items-end">

                  <p className="font-semibold text-lg">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium">
                  Free
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-lg font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="block text-center w-full bg-black text-white py-3 rounded-lg mt-6 font-semibold hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="block text-center w-full border border-black py-3 rounded-lg mt-3 font-semibold hover:bg-black hover:text-white"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      ) : (

        /* Empty Cart */
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 mb-6">
            Add some products to your cart and come back here.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

        </div>
      )}

    </div>
  );
}

export default Cart;

