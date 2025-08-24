import React from "react";
import { fetchOrders, Order } from "../services/orderService";

interface Props {
  studentId: string;
}

const OrderHistory: React.FC<Props> = ({ studentId }) => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders(studentId);
      setOrders(data);
    };
    loadOrders();
  }, [studentId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="p-3 border rounded-lg shadow">
              <p><strong>Item:</strong> {order.itemName}</p>
              <p><strong>Token:</strong> {order.tokenNumber}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
