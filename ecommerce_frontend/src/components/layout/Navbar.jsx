import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          E-Commerce
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:underline">
            Home
          </Link>

          <Link to="/products" className="hover:underline">
            Products
          </Link>

          <Link to="/wishlist" className="hover:underline">
            Wishlist
          </Link>

          <Link to="/cart" className="hover:underline">
            Cart
          </Link>

          <Link to="/orders" className="hover:underline">
            Orders
          </Link>

          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-80"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg border border-black hover:bg-black hover:text-white"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;

