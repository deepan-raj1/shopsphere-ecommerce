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

const AddressList = () => {
  const [addresses] = useState(initialAddresses);

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
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add New Address
          </button>
        </div>

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
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Edit
                </button>

                <button
                  type="button"
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
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;
