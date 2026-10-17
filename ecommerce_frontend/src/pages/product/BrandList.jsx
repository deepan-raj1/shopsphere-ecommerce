import { Link } from "react-router-dom";

const brands = [
  {
    id: 1,
    name: "AudioTech",
    description: "Quality audio products and accessories.",
    image: "https://via.placeholder.com/400x250?text=AudioTech",
  },
  {
    id: 2,
    name: "TechWear",
    description: "Smart wearable technology and accessories.",
    image: "https://via.placeholder.com/400x250?text=TechWear",
  },
  {
    id: 3,
    name: "RunFast",
    description: "Performance footwear and sports products.",
    image: "https://via.placeholder.com/400x250?text=RunFast",
  },
  {
    id: 4,
    name: "CarryAll",
    description: "Practical bags and everyday accessories.",
    image: "https://via.placeholder.com/400x250?text=CarryAll",
  },
  {
    id: 5,
    name: "SoundMax",
    description: "Powerful speakers and audio equipment.",
    image: "https://via.placeholder.com/400x250?text=SoundMax",
  },
  {
    id: 6,
    name: "KeyTech",
    description: "Mechanical keyboards and computer accessories.",
    image: "https://via.placeholder.com/400x250?text=KeyTech",
  },
];

function BrandList() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Brands
        </h1>

        <p className="text-gray-600 mt-2">
          Explore products from our trusted brands.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >

            {/* Brand Image */}
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-48 object-cover"
            />

            {/* Brand Content */}
            <div className="p-5">

              <h2 className="text-xl font-semibold mb-2">
                {brand.name}
              </h2>

              <p className="text-gray-600 text-sm mb-5">
                {brand.description}
              </p>

              <Link
                to={`/products?brand=${brand.name}`}
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

export default BrandList;

