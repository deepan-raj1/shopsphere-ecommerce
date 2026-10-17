import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/profile/Profile";
import ProductList from "../pages/product/ProductList";
import ProductDetail from "../pages/product/ProductDetail";
import CategoryList from "../pages/product/CategoryList";
import BrandList from "../pages/product/BrandList";
import Cart from "../pages/cart/Cart";
import Wishlist from "../pages/wishlist/Wishlist";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/categories" element={<CategoryList />} />
          <Route path="/brands" element={<BrandList />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<h1>Checkout Page</h1>} />
          <Route path="/orders" element={<h1>Orders Page</h1>} />
          <Route path="/orders/:id" element={<h1>Order Detail Page</h1>} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

