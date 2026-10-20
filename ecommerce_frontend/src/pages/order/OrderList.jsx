import { Link } from "react-router-dom";

const orders = [
  {
    id: 1,
    orderNumber: "ORD-100001",
    date: "20 Oct 2026",
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
    total: 7997,
    status: "Confirmed",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
  },
  {
    id: 2,
    orderNumber: "ORD-100002",
    date: "18 Oct 2026",
    items: [
      {
        id: 3,
        name: "Running Shoes",
        quantity: 1,
        price: 2399,
      },
    ],
    total: 2399,
    status: "Delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
  },
  {
    id: 3,
    orderNumber: "ORD-100003",
    date: "15 Oct 2026",
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
    total: 3398,
    status: "Shipped",
    paymentMethod: "Credit / Debit Card",
    paymentStatus: "Paid",
  },
];

const OrderList = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View and track your recent orders.
          </p>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              No Orders Found
            </h2>

            <p className="mb-6 text-gray-600">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order Number
                    </p>

                    <h2 className="text-lg font-bold text-gray-800">
                      #{order.orderNumber}
                    </h2>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">
                      Order Date
                    </p>

                    <p className="font-medium text-gray-800">
                      {order.date}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="py-5">
                  <h3 className="mb-4 font-semibold text-gray-800">
                    Order Items
                  </h3>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-gray-800">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Information */}
                <div className="grid gap-4 border-t border-gray-200 pt-5 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="font-bold text-gray-800">
                      ₹{order.total}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Order Status
                    </p>

                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-medium text-gray-800">
                      {order.paymentMethod}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>

                {/* View Order */}
                <div className="mt-5 border-t border-gray-200 pt-5">
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;

