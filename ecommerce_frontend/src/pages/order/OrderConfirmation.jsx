import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            Order Information Not Found
          </h1>

          <p className="mb-6 text-gray-600">
            We could not find the order confirmation details.
          </p>

          <Link
            to="/products"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">✓</span>
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-3xl font-bold text-gray-800">
            Order Placed Successfully!
          </h1>

          <p className="mb-8 text-gray-600">
            Thank you for your order. Your order has been successfully placed.
          </p>

          {/* Order Details */}
          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Order Details
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold text-gray-800">
                  #{order.orderNumber}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold uppercase text-gray-800">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-800">
                  ₹{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8 rounded-lg border border-gray-200 p-6 text-left">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Shipping Address
            </h2>

            <p className="font-medium text-gray-800">
              {order.address?.fullName}
            </p>

            <p className="text-gray-600">
              {order.address?.addressLine1}
            </p>

            {order.address?.addressLine2 && (
              <p className="text-gray-600">
                {order.address.addressLine2}
              </p>
            )}

            <p className="text-gray-600">
              {order.address?.city}, {order.address?.state} -{" "}
              {order.address?.postalCode}
            </p>

            <p className="text-gray-600">
              {order.address?.country}
            </p>

            <p className="mt-2 text-gray-600">
              Phone: {order.address?.phoneNumber}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/orders"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

