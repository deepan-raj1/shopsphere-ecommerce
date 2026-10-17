import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Explore the latest electronic products and gadgets.",
    image: "https://via.placeholder.com/400x250?text=Electronics",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Discover stylish clothing, footwear and accessories.",
    image: "https://via.placeholder.com/400x250?text=Fashion",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Find useful products for your home and kitchen.",
    image: "https://via.placeholder.com/400x250?text=Home+%26+Kitchen",
  },
  {
    id: 4,
    name: "Sports",
    description: "Shop sports equipment, fitness products and accessories.",
    image: "https://via.placeholder.com/400x250?text=Sports",
  },
];

function CategoryList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <p className="text-gray-600 mt-2">
          Browse products by category.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >

            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />

            {/* Category Content */}
            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {category.name}
              </h2>

              <p className="text-gray-600 text-sm mb-5">
                {category.description}
              </p>

              <Link
                to={`/products?category=${category.name}`}
                className="inline-block border border-black px-4 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
              >
                View Products
              </Link>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CategoryList;

