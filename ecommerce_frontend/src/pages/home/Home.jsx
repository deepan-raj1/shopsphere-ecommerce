import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shop Everything You Love
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover quality products at great prices. Browse our collection
            and find something perfect for you.
          </p>

          <Link
            to="/products"
            className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Shop With Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Quality Products
            </h3>

            <p className="text-gray-600">
              Discover carefully selected products for your everyday needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Secure Shopping
            </h3>

            <p className="text-gray-600">
              Your account and shopping experience are protected with secure
              authentication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Easy Checkout
            </h3>

            <p className="text-gray-600">
              Add products to your cart and complete your order with ease.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>

          <p className="text-gray-600 mb-6">
            Explore our products and find your next favorite item.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80"
          >
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;