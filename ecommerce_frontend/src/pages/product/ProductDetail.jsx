import { Link, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    discountPrice: 1999,
    category: "Electronics",
    brand: "AudioTech",
    stock: 15,
    description:
      "High-quality wireless headphones with clear sound, comfortable ear cushions, and long battery life.",
    image: "https://via.placeholder.com/600x600?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    discountPrice: 2999,
    category: "Electronics",
    brand: "TechWatch",
    stock: 10,
    description:
      "A stylish smart watch with fitness tracking, notifications, and everyday health features.",
    image: "https://via.placeholder.com/600x600?text=Smart+Watch",
  },
];

function ProductDetail() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {" / "}

        <Link to="/products" className="hover:underline">
          Products
        </Link>

        {" / "}

        <span>{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Product Information */}
        <div>

          <p className="text-sm text-gray-500 mb-2">
            {product.category} • {product.brand}
          </p>

          <h1 className="text-4xl font-bold mb-6">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">
              ₹{product.discountPrice}
            </span>

            <span className="text-xl text-gray-400 line-through">
              ₹{product.price}
            </span>
          </div>

          {/* Stock */}
          <p className="text-green-600 font-medium mb-6">
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of Stock"}
          </p>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">
              Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-24 border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="button"
              className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:opacity-80"
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="flex-1 border border-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white"
            >
              Add to Wishlist
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductDetail;

