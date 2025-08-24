import React, { useEffect, useState } from "react";

const OrderHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // fetch from API or localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    setHistory(orders);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {history.length === 0 && <p>No orders yet.</p>}
      {history.map((o, idx) => (
        <div key={idx} className="border p-3 mb-2 rounded">
          <p>Token: {o.token}</p>
          {o.items.map((i: any, idx2: number) => (
            <p key={idx2}>
              {i.name} x {i.qty} - ₹{i.price * i.qty}
            </p>
          ))}
          <p>Total: ₹{o.total}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
