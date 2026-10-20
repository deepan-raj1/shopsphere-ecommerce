import { Link, useParams } from "react-router-dom";

const orders = [
  {
    id: 1,
    orderNumber: "ORD-100001",
    date: "20 Oct 2026",
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",

    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        quantity: 1,
        price: 1999,
      },
      {
        id: 2,
        name: "Smart Watch",
        quantity: 2,
        price: 2999,
      },
    ],

    subtotal: 7997,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 7997,

    shippingAddress: {
      fullName: "Deepan Raj",
      phoneNumber: "9876543210",
      addressLine1: "123 Main Street",
      addressLine2: "Velachery",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600042",
      country: "India",
    },
  },

  {
    id: 2,
    orderNumber: "ORD-100002",
    date: "18 Oct 2026",
    status: "Delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",

    items: [
      {
        id: 3,
        name: "Running Shoes",
        quantity: 1,
        price: 2399,
      },
    ],

    subtotal: 2399,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 2399,

    shippingAddress: {
      fullName: "Deepan Raj",
      phoneNumber: "9876543210",
      addressLine1: "456 Anna Nagar",
      addressLine2: "Near Tower Park",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600040",
      country: "India",
    },
  },

  {
    id: 3,
    orderNumber: "ORD-100003",
    date: "15 Oct 2026",
    status: "Cancelled",
    paymentMethod: "Credit / Debit Card",
    paymentStatus: "Paid",

    items: [
      {
        id: 4,
        name: "Laptop Backpack",
        quantity: 1,
        price: 1499,
      },
      {
        id: 5,
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 1899,
      },
    ],

    subtotal: 3398,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 3398,

    shippingAddress: {
      fullName: "Deepan Raj",
      phoneNumber: "9876543210",
      addressLine1: "123 Main Street",
      addressLine2: "Velachery",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600042",
      country: "India",
    },
  },
];

const orderStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

const OrderDetail = () => {
  const { id } = useParams();

  const order = orders.find((item) => item.id === Number(id));

  const currentStatusIndex = order ? orderStatuses.indexOf(order.status) : -1;

  const getStatusIcon = (statusIndex) => {
    if (statusIndex < currentStatusIndex) {
      return "✓";
    }

    if (statusIndex === currentStatusIndex) {
      return "●";
    }

    return "○";
  };

  const getStatusTextClass = (statusIndex) => {
    if (statusIndex <= currentStatusIndex) {
      return "font-semibold text-blue-600";
    }

    return "text-gray-400";
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            Order Not Found
          </h1>

          <p className="mb-6 text-gray-600">
            The order you are looking for does not exist.
          </p>

          <Link
            to="/orders"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/orders"
            className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Orders
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Order Details
              </h1>

              <p className="mt-2 text-gray-600">Order #{order.orderNumber}</p>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">Order Date</p>

              <p className="font-medium text-gray-800">{order.date}</p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">Order Status</p>

              <h2 className="mt-1 text-xl font-bold text-gray-800">
                {order.status}
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-gray-500">Payment Status</p>

              <span className="mt-2 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          {order.status === "Cancelled" ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-red-600">✕</span>

                <div>
                  <p className="font-semibold text-red-700">Order Cancelled</p>

                  <p className="text-sm text-red-600">
                    This order has been cancelled.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              {orderStatuses.map((status, index) => {
                const isLast = index === orderStatuses.length - 1;

                return (
                  <div key={status} className="flex">
                    {/* Timeline Icon and Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-bold ${
                          index <= currentStatusIndex
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {getStatusIcon(index)}
                      </div>

                      {!isLast && (
                        <div
                          className={`h-10 w-0.5 ${
                            index < currentStatusIndex
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>

                    {/* Status Text */}
                    <div className="ml-4 pb-8">
                      <p className={`text-base ${getStatusTextClass(index)}`}>
                        {status}
                      </p>

                      {index === currentStatusIndex && (
                        <p className="mt-1 text-sm text-gray-500">
                          Current order status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* Order Items */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">Order Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>

                  <p className="font-bold text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing and Shipping */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Price Summary */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Price Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">
                  ₹{order.subtotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">
                  ₹{order.shipping}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">₹{order.tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-green-600">
                  -₹{order.discount}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total</span>

                  <span className="text-lg font-bold text-gray-800">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-800">
              Shipping Address
            </h2>

            <div className="space-y-1 text-gray-600">
              <p className="font-semibold text-gray-800">
                {order.shippingAddress.fullName}
              </p>

              <p>{order.shippingAddress.addressLine1}</p>

              {order.shippingAddress.addressLine2 && (
                <p>{order.shippingAddress.addressLine2}</p>
              )}

              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>

              <p>{order.shippingAddress.postalCode}</p>

              <p>{order.shippingAddress.country}</p>

              <p className="pt-2">Phone: {order.shippingAddress.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Payment Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>

              <p className="mt-1 font-medium text-gray-800">
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>

              <p className="mt-1 font-medium text-gray-800">
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back to Orders
          </Link>

          <Link
            to="/products"
            className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

