import React, { useEffect, useState } from "react";
import {
  Star,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Loader2,
  UtensilsCrossed,
  Leaf,
} from "lucide-react";
import { fetchMenuItems, placeOrder, MenuItem } from "../services/canteenService";
import { useNavigate } from "react-router-dom";

// Demo menu fallback
const DEMO_MENU: MenuItem[] = [
  { id: "demo1", name: "Masala Dosa", description: "Crispy dosa with spicy potato filling.", category: "breakfast", price: 40, isAvailable: true, isVegetarian: true, isSpecial: false, rating: 4.5, prepTime: 10 },
  { id: "demo2", name: "Chicken Biryani", description: "Aromatic rice with chicken and spices.", category: "lunch", price: 90, isAvailable: true, isVegetarian: false, isSpecial: true, rating: 4.8, prepTime: 20 },
  { id: "demo3", name: "Tea", description: "Hot Indian chai.", category: "beverages", price: 10, isAvailable: true, isVegetarian: true, isSpecial: false, rating: 4.2, prepTime: 3 },
];

const Canteen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentItem, setPaymentItem] = useState<MenuItem | null>(null);
  const [orderResult, setOrderResult] = useState<{ token: string; items: { name: string; qty: number; price: number }[]; total: number } | null>(null);
  const [orderQty, setOrderQty] = useState<{ [id: string]: number }>({});

  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId") || "";

  // Load menu
  useEffect(() => {
    async function loadMenu() {
      const items = await fetchMenuItems();
      setMenuItems(items.length > 0 ? items : DEMO_MENU);
      setLoading(false);
    }
    loadMenu();
  }, []);

  const handleOrder = async (item: MenuItem) => {
    if (!studentId) return;
    const qty = orderQty[item.id] || 1;

    setOrdering(item.id);
    setPaymentItem(item);
    setShowPayment(true);

    try {
      const res = await placeOrder(studentId, [{ name: item.name, qty, price: item.price }]);
      setOrderResult({ token: res.token, items: [{ name: item.name, qty, price: item.price }], total: item.price * qty });
    } catch (e: any) {
      alert("Order failed: " + e.message);
    } finally {
      setShowPayment(false);
      setOrdering(null);
    }
  };

  const closeResult = () => setOrderResult(null);

  if (loading) return <p className="text-gray-600">Loading canteen menu...</p>;

  return (
    <div className="max-w-3xl mx-auto px-2 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UtensilsCrossed /> Canteen Menu
        </h2>
        <button
          onClick={() => navigate("/history")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Order History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-lg">{item.name}</span>
              {item.isSpecial && <Star className="text-yellow-500 w-5 h-5" />}
            </div>

            <p className="text-sm text-gray-600 mb-1">{item.description}</p>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 capitalize">{item.category}</span>
              {item.isVegetarian && <Leaf className="w-4 h-4 text-green-500" />}
            </div>

            <div className="flex items-center gap-2 text-sm mb-1">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>₹{item.price}</span>
              <Clock className="w-4 h-4 ml-3 text-yellow-500" />
              <span>{item.prepTime} min</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {item.isAvailable ? <CheckCircle className="text-green-500 w-4 h-4" /> : <XCircle className="text-red-500 w-4 h-4" />}
              <span className="text-xs">{item.isAvailable ? "Available" : "Not Available"}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <label htmlFor={`qty-${item.id}`} className="text-xs text-gray-500">Qty:</label>
              <input
                id={`qty-${item.id}`}
                type="number"
                min={1}
                max={10}
                value={orderQty[item.id] || 1}
                onChange={(e) =>
                  setOrderQty((q) => ({ ...q, [item.id]: Math.max(1, Number(e.target.value)) }))
                }
                className="w-14 px-2 py-1 border rounded text-sm"
              />
            </div>

            <button
              onClick={() => handleOrder(item)}
              disabled={!item.isAvailable || ordering === item.id}
              className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 mt-auto"
            >
              {ordering === item.id ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Ordering...</span> : "Order"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPayment && paymentItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <div className="text-lg font-bold mb-2">Processing Payment...</div>
            <div className="text-gray-600 mb-2">
              <div>Item: <b>{paymentItem.name}</b></div>
              <div>Price: <b>₹{paymentItem.price}</b></div>
            </div>
            <div className="text-blue-500 font-semibold">Please wait</div>
          </div>
        </div>
      )}

      {/* Order Result Modal */}
      {orderResult && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
            <div className="text-lg font-bold mb-2">Order Successful!</div>
            <div className="mb-2 text-gray-700">
              <div><b>Token:</b> <span className="text-blue-600">{orderResult.token}</span></div>
              <div><b>Items:</b>
                <ul className="pl-4 list-disc">
                  {orderResult.items.map((i) => (
                    <li key={i.name}>{i.name} x {i.qty} = ₹{i.price * i.qty}</li>
                  ))}
                </ul>
              </div>
              <div><b>Total:</b> ₹{orderResult.total}</div>
            </div>
            <button onClick={closeResult} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canteen;
