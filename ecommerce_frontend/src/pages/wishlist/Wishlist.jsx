import { useState } from "react";
import { Link } from "react-router-dom";

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

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(
    initialWishlistItems
  );

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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-600">
            {wishlistItems.length} item
            {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
          </p>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Wishlist is Empty
            </h2>

            <p className="mt-2 text-gray-600">
              Add products you love to your wishlist.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Wishlist Items */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-52 w-full object-cover"
                />

                {/* Product Details */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-lg font-bold text-blue-600">
                    ₹{item.price}
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    {/* View Product */}
                    <Link
                      to={`/products/${item.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-center font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Product
                    </Link>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button>

                    {/* Remove from Wishlist */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Add Product Section */}
        <div className="mt-10 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Products to Wishlist
          </h2>

          <p className="mt-2 text-gray-600">
            Demo buttons for testing wishlist functionality.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {initialWishlistItems.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => addToWishlist(product)}
                className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 hover:bg-blue-50"
              >
                Add {product.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;