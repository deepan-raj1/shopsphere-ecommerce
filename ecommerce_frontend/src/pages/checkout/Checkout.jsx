import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useShop } from "../../context/ShopContext";

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

const emptyAddress = {
  fullName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

function Checkout() {
  const { cartItems, clearCart } = useShop();

  const [addresses, setAddresses] = useState(initialAddresses);

  const [selectedAddressId, setSelectedAddressId] = useState(
    initialAddresses.find((address) => address.isDefault)?.id ||
      initialAddresses[0]?.id ||
      null,
  );

  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressFormData, setAddressFormData] = useState(emptyAddress);

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const tax = 0;
  const discount = 0;

  const total = subtotal + shipping + tax - discount;

  // Handle address form input changes
  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddressFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Cancel address form
  const handleCancelAddressForm = () => {
    setAddressFormData(emptyAddress);
    setShowAddressForm(false);
  };

  // Save new address
  const handleSaveAddress = (e) => {
    e.preventDefault();

    const newAddressId = Date.now();

    const newAddress = {
      ...addressFormData,
      id: newAddressId,
    };

    setAddresses((previous) => {
      // If the new address is default,
      // remove default status from existing addresses.
      const updatedAddresses = addressFormData.isDefault
        ? previous.map((address) => ({
            ...address,
            isDefault: false,
          }))
        : previous;

      return [...updatedAddresses, newAddress];
    });

    // Automatically select the newly added address
    setSelectedAddressId(newAddressId);

    // Reset form
    setAddressFormData(emptyAddress);

    // Close form
    setShowAddressForm(false);
  };

  // Place order
  const handlePlaceOrder = () => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Check if shipping address is selected
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }

    // Check if payment method is selected
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Get selected address
    const selectedAddress = addresses.find(
      (address) => address.id === selectedAddressId,
    );

    // Create frontend-only order information
    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      paymentMethod: paymentMethod,
      total: total,
      address: selectedAddress,
    };

    // Clear cart
    clearCart();

    // Navigate to order confirmation page
    navigate("/order-confirmation", {
      state: {
        order: orderData,
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="mt-2 text-gray-600">
          Complete your details to place your order.
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer Information */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold">Customer Information</h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Shipping Address</h2>

                {!showAddressForm && (
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="font-medium text-blue-600 hover:text-blue-800"
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
                      <div className="flex items-start gap-4">
                        {/* Radio */}
                        <input
                          type="radio"
                          name="shippingAddress"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id)}
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

                          {/* Country */}
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
                <form onSubmit={handleSaveAddress}>
                  <h3 className="mb-5 text-lg font-semibold">
                    Add New Address
                  </h3>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={addressFormData.fullName}
                        onChange={handleAddressInputChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phoneNumber"
                        value={addressFormData.phoneNumber}
                        onChange={handleAddressInputChange}
                        placeholder="Enter your phone number"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Address Line 1 */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Address Line 1
                      </label>

                      <input
                        type="text"
                        name="addressLine1"
                        value={addressFormData.addressLine1}
                        onChange={handleAddressInputChange}
                        placeholder="House number, street name"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Address Line 2 */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Address Line 2
                      </label>

                      <input
                        type="text"
                        name="addressLine2"
                        value={addressFormData.addressLine2}
                        onChange={handleAddressInputChange}
                        placeholder="Apartment, area, landmark"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* City / State */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* City */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          City
                        </label>

                        <input
                          type="text"
                          name="city"
                          value={addressFormData.city}
                          onChange={handleAddressInputChange}
                          placeholder="Enter city"
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* State */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          State
                        </label>

                        <input
                          type="text"
                          name="state"
                          value={addressFormData.state}
                          onChange={handleAddressInputChange}
                          placeholder="Enter state"
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Postal Code / Country */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {/* Postal Code */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Postal Code
                        </label>

                        <input
                          type="text"
                          name="postalCode"
                          value={addressFormData.postalCode}
                          onChange={handleAddressInputChange}
                          placeholder="Enter postal code"
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Country */}
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Country
                        </label>

                        <input
                          type="text"
                          name="country"
                          value={addressFormData.country}
                          readOnly
                          className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
                        />
                      </div>
                    </div>

                    {/* Set as Default */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={addressFormData.isDefault}
                        onChange={handleAddressInputChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />

                      <label className="text-sm font-medium text-gray-700">
                        Set as default address
                      </label>
                    </div>
                  </div>

                  {/* Address Form Actions */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleCancelAddressForm}
                      className="rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Select your preferred payment method.
                </p>
              </div>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order is delivered.
                    </p>
                  </div>
                </label>

                {/* UPI */}
                <label
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div className="ml-4">
                    <p className="font-medium text-gray-800">UPI</p>

                    <p className="text-sm text-gray-500">
                      Pay using Google Pay, PhonePe, Paytm or another UPI app.
                    </p>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      Credit / Debit Card
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay securely using your credit or debit card.
                    </p>
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                    paymentMethod === "netbanking"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === "netbanking"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div className="ml-4">
                    <p className="font-medium text-gray-800">Net Banking</p>

                    <p className="text-sm text-gray-500">
                      Pay directly through your bank account.
                    </p>
                  </div>
                </label>

                {/* Wallet */}
                <label
                  className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4"
                  />

                  <div className="ml-4">
                    <p className="font-medium text-gray-800">Wallet</p>

                    <p className="text-sm text-gray-500">
                      Pay using a supported digital wallet.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

            {/* Products */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.name}</p>

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

            <div className="mt-6 space-y-4 border-t pt-5">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>

                <span className="font-medium">Free</span>
              </div>

              {/* Tax */}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>

                <span className="font-medium">
                  ₹{tax.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>

                <span className="font-medium">
                  - ₹{discount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between border-t pt-4">
                <span className="text-lg font-bold">Total</span>

                <span className="text-lg font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Place Order */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Place Order
            </button>

            {/* Back to Cart */}
            <Link
              to="/cart"
              className="mt-3 block w-full rounded-lg border border-black py-3 text-center font-semibold hover:bg-black hover:text-white"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="py-20 text-center">
          <h2 className="mb-3 text-2xl font-bold">Your Cart is Empty</h2>

          <p className="mb-6 text-gray-600">
            Add products to your cart before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;

