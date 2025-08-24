import React, { useEffect, useState } from "react";
import { fetchOrderHistory, OrderHistoryEntry } from "../services/canteenService";

const OrderHistory: React.FC<{ studentId: string }> = ({ studentId }) => {
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrderHistory(studentId);
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, [studentId]);

  if (loading) return <p>Loading order history...</p>;

  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="p-3 border rounded-lg shadow">
            <p><strong>Token:</strong> {order.token}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Items:</strong></p>
            <ul className="pl-4 list-disc">
              {order.items.map((item) => (
                <li key={item.name}>{item.name} x {item.qty} = ₹{item.price * item.qty}</li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
