import { useState } from "react";

const initialAddresses = [
  {
    id: 1,
    fullName: "Deepan Raj",
    phone: "9876543210",
    addressLine1: "123 Main Street",
    addressLine2: "",
    city: "Velachery",
    state: "Tamil Nadu",
    postalCode: "600042",
    country: "India",
    isDefault: true,
  },
  {
    id: 2,
    fullName: "Deepan Raj",
    phone: "9876543210",
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
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

function AddressList() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState(emptyAddress);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
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
      phone: address.phone,
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

    if (editingAddressId) {
      setAddresses((previous) =>
        previous.map((address) =>
          address.id === editingAddressId
            ? {
                ...address,
                ...formData,
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
        if (formData.isDefault) {
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

  // 3.10.5 Set Default Address
  const handleSetDefaultAddress = (id) => {
    setAddresses((previous) =>
      previous.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
            <p className="mt-2 text-gray-600">
              Manage your shipping addresses.
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

        {/* Address Form */}
        {showAddressForm && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={handleSaveAddress}>
              <div className="grid gap-5 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="mb-2 block font-semibold text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Default Address Checkbox */}
              <div className="mt-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      isDefault: event.target.checked,
                    }))
                  }
                  className="h-4 w-4"
                />

                <label
                  htmlFor="isDefault"
                  className="font-medium text-gray-700"
                >
                  Set as default address
                </label>
              </div>

              {/* Form Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingAddressId ? "Save Changes" : "Add Address"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Address List */}
        <div className="space-y-5">
          {addresses.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-md">
              <h2 className="text-xl font-bold text-gray-800">
                No addresses found
              </h2>

              <p className="mt-2 text-gray-600">Add an address to continue.</p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className={`rounded-xl bg-white p-6 shadow-md ${
                  address.isDefault
                    ? "border-2 border-blue-500"
                    : "border border-gray-100"
                }`}
              >
                {/* Address Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-800">
                        {address.fullName}
                      </h2>

                      {address.isDefault && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          Default Address
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-gray-600">Phone: {address.phone}</p>
                  </div>
                </div>

                {/* Address Details */}
                <div className="mt-5 leading-7 text-gray-700">
                  <p>{address.addressLine1}</p>

                  {address.addressLine2 && <p>{address.addressLine2}</p>}

                  <p>
                    {address.city}, {address.state} - {address.postalCode}
                  </p>

                  <p>{address.country}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {address.isDefault ? (
                    <button
                      type="button"
                      disabled
                      className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-500"
                    >
                      Default Address
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      Set as Default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleEditAddress(address)}
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
  );
}

export default AddressList;
