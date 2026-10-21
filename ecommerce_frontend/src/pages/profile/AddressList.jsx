import { useState } from "react";

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

const AddressList = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = () => {
    setEditingAddressId(null);
    setFormData(emptyAddress);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);

    setFormData({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });

    setShowAddressForm(true);
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();

    if (editingAddressId !== null) {
      setAddresses((previous) =>
        previous.map((address) =>
          address.id === editingAddressId
            ? {
                ...address,
                ...formData,
                isDefault: formData.isDefault,
              }
            : formData.isDefault
              ? {
                  ...address,
                  isDefault: false,
                }
              : address,
        ),
      );
    } else {
      const newAddress = {
        id: Date.now(),
        ...formData,
      };

      setAddresses((previous) => {
        if (newAddress.isDefault) {
          return [
            ...previous.map((address) => ({
              ...address,
              isDefault: false,
            })),
            newAddress,
          ];
        }

        return [...previous, newAddress];
      });
    }

    setFormData(emptyAddress);
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const handleCancel = () => {
    setFormData(emptyAddress);
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
  };

  const handleCancelDelete = () => {
    setAddressToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) {
      return;
    }

    setAddresses((previous) =>
      previous.filter((address) => address.id !== addressToDelete.id),
    );

    setAddressToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>

            <p className="mt-2 text-gray-600">
              Manage your saved shipping addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddAddress}
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add New Address
          </button>
        </div>

        {/* Add / Edit Address Form */}
        {showAddressForm && (
          <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAddressId !== null ? "Edit Address" : "Add New Address"}
              </h2>

              <p className="mt-1 text-gray-600">
                {editingAddressId !== null
                  ? "Update your saved address details."
                  : "Enter your shipping address details."}
              </p>
            </div>

            <form onSubmit={handleSaveAddress}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="addressLine1"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Address Line 1
                  </label>

                  <input
                    id="addressLine1"
                    name="addressLine1"
                    type="text"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="House / Flat / Street"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="addressLine2"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Address Line 2
                  </label>

                  <input
                    id="addressLine2"
                    name="addressLine2"
                    type="text"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Area / Landmark (Optional)"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Enter postal code"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block font-semibold text-gray-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Default Address */}
              <div className="mt-6">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />

                  <span className="font-semibold text-gray-700">
                    Set as default address
                  </span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingAddressId !== null ? "Save Changes" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-5">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Address Header */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    {address.fullName}
                  </h2>

                  {address.isDefault && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Default Address
                    </span>
                  )}
                </div>

                <p className="text-gray-600">📞 {address.phoneNumber}</p>
              </div>

              {/* Address Details */}
              <div className="space-y-1 text-gray-700">
                <p>{address.addressLine1}</p>

                {address.addressLine2 && <p>{address.addressLine2}</p>}

                <p>
                  {address.city}, {address.state} - {address.postalCode}
                </p>

                <p>{address.country}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => handleEditAddress(address)}
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(address)}
                  className="rounded-lg border border-red-600 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>

                {!address.isDefault && (
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {addresses.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">
              No Saved Addresses
            </h2>

            <p className="mt-2 text-gray-600">
              Add an address to make checkout faster.
            </p>

            <button
              type="button"
              onClick={handleAddAddress}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add New Address
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {addressToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <h2 className="mb-3 text-xl font-bold text-gray-800">
                Delete Address?
              </h2>

              <p className="mb-2 text-gray-600">
                Are you sure you want to delete this address?
              </p>

              <p className="mb-6 font-semibold text-gray-800">
                {addressToDelete.addressLine1}, {addressToDelete.city}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Keep Address
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                >
                  Yes, Delete Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;

