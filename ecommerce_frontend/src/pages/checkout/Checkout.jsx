import { Link } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../../context/ShopContext";

function Checkout() {
  const { cartItems } = useShop();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const tax = 0;
  const discount = 0;

  const total = subtotal + shipping + tax - discount;

  const initialAddresses = [
    {
        id: 1,
        fullName: "Deepan Raj",
        phoneNumber: "9876543210",
        addressLine1: "123 Main Street",
        addressLine2: "Velachery",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600042",
        country: "India",
        isDefault: true,
    },
    {
        id: 2,
        fullName: "Deepan Raj",
        phoneNumber: "9876543210",
        addressLine1: "456 Anna Nagar",
        addressLine2: "Near Tower Park",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600040",
        country: "India",
        isDefault: false,
    },
];
  const [addresses, setAddresses] = useState(initialAddresses);  
  const [selectedAddressId, setSelectedAddressId] = useState(initialAddresses.find((address) => address.isDefault)?.id || initialAddresses[0]?.id || null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <p className="text-gray-600 mt-2">
          Complete your details to place your order.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6">

              <h2 className="text-xl font-bold mb-6">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

            </div>

            {/* Shipping Address */}
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                Shipping Address
                </h2>

                {!showAddressForm && (
                <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="text-blue-600 font-medium hover:text-blue-800"
                >
                    + Add New Address
                </button>
                )}
            </div>

            {/* Saved Addresses */}
            {!showAddressForm && (
                <div className="space-y-4">

                {addresses.map((address) => (
                    <div
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`relative cursor-pointer rounded-lg border p-5 ${
                        selectedAddressId === address.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    >

                    {/* Radio */}
                    <div className="flex items-start gap-4">

                        <input
                        type="radio"
                        name="shippingAddress"
                        checked={selectedAddressId === address.id}
                        onChange={() =>
                            setSelectedAddressId(address.id)
                        }
                        className="mt-1 h-4 w-4"
                        />

                        <div className="flex-1">

                        {/* Name & Default */}
                        <div className="flex items-center gap-3">

                            <h3 className="font-semibold">
                            {address.fullName}
                            </h3>

                            {address.isDefault && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                Default
                            </span>
                            )}

                        </div>

                        {/* Phone */}
                        <p className="mt-2 text-gray-600">
                            {address.phoneNumber}
                        </p>

                        {/* Address */}
                        <p className="mt-2 text-gray-600">
                            {address.addressLine1}
                            {address.addressLine2 &&
                            `, ${address.addressLine2}`}
                            , {address.city}, {address.state} -{" "}
                            {address.postalCode}
                        </p>

                        <p className="mt-1 text-gray-600">
                            {address.country}
                        </p>

                        </div>

                    </div>

                    </div>
                ))}

                </div>
            )}

            {/* Add New Address Form */}
            {showAddressForm && (
                <div>

                <h3 className="text-lg font-semibold mb-5">
                    Add New Address
                </h3>

                <div className="space-y-5">

                    {/* Full Name */}
                    <div>
                    <label className="block text-sm font-medium mb-2">
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                    </div>

                    {/* Phone */}
                    <div>
                    <label className="block text-sm font-medium mb-2">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                    <label className="block text-sm font-medium mb-2">
                        Address Line 1
                    </label>

                    <input
                        type="text"
                        placeholder="House number, street name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                    <label className="block text-sm font-medium mb-2">
                        Address Line 2
                    </label>

                    <input
                        type="text"
                        placeholder="Apartment, area, landmark"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                    </div>

                    {/* City / State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                        City
                        </label>

                        <input
                        type="text"
                        placeholder="Enter city"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                        State
                        </label>

                        <input
                        type="text"
                        placeholder="Enter state"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>

                    </div>

                    {/* Postal Code / Country */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                        Postal Code
                        </label>

                        <input
                        type="text"
                        placeholder="Enter postal code"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                        Country
                        </label>

                        <input
                        type="text"
                        value="India"
                        readOnly
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
                        />
                    </div>

                    </div>

                </div>

                {/* Address Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                    <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="border border-gray-300 px-5 py-3 rounded-lg font-medium hover:bg-gray-50"
                    >
                    Cancel
                    </button>

                    <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="bg-black text-white px-5 py-3 rounded-lg font-medium hover:bg-gray-800"
                    >
                    Save Address
                    </button>

                </div>

                </div>
            )}

            </div>
            
            {/* Payment Method Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-6">

              <h2 className="text-xl font-bold mb-4">
                Payment Method
              </h2>

              <div className="border border-gray-300 rounded-lg p-4">
                <p className="font-medium">
                  Payment method selection will be added next.
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  This section is currently UI only.
                </p>
              </div>

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold mb-6">
              Order Summary
            </h2>

            {/* Products */}
            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

            </div>

            <div className="border-t mt-6 pt-5 space-y-4">

              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium">
                  Free
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Tax
                </span>

                <span className="font-medium">
                  ₹{tax.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Discount
                </span>

                <span className="font-medium">
                  - ₹{discount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Total */}
              <div className="border-t pt-4 flex justify-between">

                <span className="text-lg font-bold">
                  Total
                </span>

                <span className="text-lg font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            {/* Place Order */}
            <button
              type="button"
              className="w-full bg-black text-white py-3 rounded-lg mt-6 font-semibold hover:bg-gray-800"
            >
              Place Order
            </button>

            {/* Back to Cart */}
            <Link
              to="/cart"
              className="block text-center w-full border border-black py-3 rounded-lg mt-3 font-semibold hover:bg-black hover:text-white"
            >
              Back to Cart
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
            Add products to your cart before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Browse Products
          </Link>

        </div>
      )}

    </div>
  );
}

export default Checkout;


