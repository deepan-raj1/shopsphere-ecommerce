import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </Link>

      {/* Product Information */}
      <div className="p-5">

        <Link to={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold hover:underline">
            {product.name}
          </h2>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-bold">
            ₹{product.discountPrice}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.price}
          </span>
        </div>

        {/* View Product */}
        <Link
          to={`/products/${product.id}`}
          className="block text-center bg-black text-white py-2 rounded-lg mt-4 hover:opacity-80"
        >
          View Product
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;

