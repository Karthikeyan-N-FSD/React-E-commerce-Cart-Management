import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function OrdersPage() {
  const { token } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.orders || []);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch orders. Please try again."
        );
      }
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
      {loading ? (
        <div className="text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-700">
                  Order ID: <span className="text-gray-900">{order._id}</span>
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="ml-2 text-gray-900">₹{order.total}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">
                  Delivery Address:
                </span>
                <span className="ml-2 text-gray-900">{order.address}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Items:</span>
                <ul className="ml-4 mt-2 list-disc">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-800">
                      {item.title} (x{item.quantity}) - ₹{item.price} each
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;