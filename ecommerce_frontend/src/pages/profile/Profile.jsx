function Profile() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-gray-500">
              U
            </span>
          </div>

          <h2 className="text-xl font-semibold">
            User Name
          </h2>

          <p className="text-gray-500 mt-1">
            customer@example.com
          </p>

          <button
            type="button"
            className="mt-6 w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-80"
          >
            Edit Profile
          </button>

        </div>

        {/* Account Information */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">

          <h2 className="text-xl font-semibold mb-6">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                First Name
              </p>

              <p className="font-medium mt-1">
                User
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Last Name
              </p>

              <p className="font-medium mt-1">
                Name
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium mt-1">
                customer@example.com
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone Number
              </p>

              <p className="font-medium mt-1">
                +91 9876543210
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Account Type
              </p>

              <p className="font-medium mt-1">
                Customer
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <p className="font-medium mt-1">
                Active
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;