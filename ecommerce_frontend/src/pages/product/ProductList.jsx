import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    discountPrice: 1999,
    category: "Electronics",
    brand: "AudioTech",
    image: "https://via.placeholder.com/400x400?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    discountPrice: 2999,
    category: "Electronics",
    brand: "TechWear",
    image: "https://via.placeholder.com/400x400?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2999,
    discountPrice: 2399,
    category: "Fashion",
    brand: "RunFast",
    image: "https://via.placeholder.com/400x400?text=Running+Shoes",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 1999,
    discountPrice: 1499,
    category: "Fashion",
    brand: "CarryAll",
    image: "https://via.placeholder.com/400x400?text=Backpack",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 2499,
    discountPrice: 1899,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://via.placeholder.com/400x400?text=Speaker",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 4999,
    discountPrice: 3999,
    category: "Electronics",
    brand: "KeyTech",
    image: "https://via.placeholder.com/400x400?text=Keyboard",
  },
];

function ProductList() {
  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category") || "";
  const brandFromURL = searchParams.get("brand") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [selectedBrand, setSelectedBrand] = useState(brandFromURL);
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;

    const matchesBrand =
      selectedBrand === "" ||
      product.brand === selectedBrand;

    const matchesPrice =
      maxPrice === "" ||
      product.discountPrice <= Number(maxPrice);

    return (matchesSearch && matchesCategory && matchesBrand && matchesPrice);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          All Products
        </h1>

        <p className="text-gray-600 mt-2">
          Explore our collection of products.
        </p>
      </div>
      

      {/* Search */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Search Products
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Maximum Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum Price
            </label>

            <select
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">Any Price</option>
              <option value="1500">Under ₹1,500</option>
              <option value="2000">Under ₹2,000</option>
              <option value="3000">Under ₹3,000</option>
              <option value="5000">Under ₹5,000</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("");
                setMaxPrice("");
                setSearchTerm("");
              }}
              className="w-full border border-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white"
            >
              Clear Filters
            </button>
          </div>

        </div>

      </div>

      {/* Product Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-3">
            No Products Found
          </h2>

          <p className="text-gray-600">
            Try searching with a different product name.
          </p>
        </div>
      )}

    </div>
  );
}

export default ProductList;

