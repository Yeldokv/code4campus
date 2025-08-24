import React, { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  DollarSign,
  Loader2,
} from "lucide-react";
import { fetchMenuItems, MenuItem, placeOrder } from "../services/canteenService";
import { useNavigate } from "react-router-dom";

// Fallback demo menu for testing if DB is empty
const DEMO_MENU: MenuItem[] = [
  {
    id: "demo1",
    name: "Masala Dosa",
    description: "Crispy dosa with spicy potato filling.",
    category: "breakfast",
    price: 40,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: false,
    rating: 4.5,
    prepTime: 10,
  },
  {
    id: "demo2",
    name: "Chicken Biryani",
    description: "Aromatic rice with chicken and spices.",
    category: "lunch",
    price: 90,
    isAvailable: true,
    isVegetarian: false,
    isSpecial: true,
    rating: 4.8,
    prepTime: 20,
  },
  {
    id: "demo3",
    name: "Tea",
    description: "Hot Indian chai.",
    category: "beverages",
    price: 10,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: false,
    rating: 4.2,
    prepTime: 3,
  },
];

const Canteen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentItem, setPaymentItem] = useState<MenuItem | null>(null);
  const [orderResult, setOrderResult] = useState<{
    token: string;
    item: string;
    price: number;
  } | null>(null);
  const [orderQty, setOrderQty] = useState<{ [id: string]: number }>({});
  const navigate = useNavigate();
  const [studentId] = useState(() => localStorage.getItem("studentId") || "");

  useEffect(() => {
    async function loadMenu() {
      const items = await fetchMenuItems();
      setMenuItems(items && items.length > 0 ? items : DEMO_MENU);
      setLoading(false);
    }
    loadMenu();
  }, []);

  const handleOrder = async (itemName: string) => {
    const item = menuItems.find((i) => i.name === itemName);
    if (!item || !studentId) return;
    setOrdering(itemName);
    setPaymentItem(item);
    setShowPayment(true);

    const qty = orderQty[item.id] || 1;

    setTimeout(async () => {
      try {
        const result = await placeOrder(studentId, [
          { name: itemName, qty, price: item.price },
        ]);
        setOrderResult({ token: result.token, item: itemName, price: item.price * qty });
        setShowPayment(false);
        setOrdering(null);
      } catch (e: any) {
        setShowPayment(false);
        setOrdering(null);
        alert("Order failed: " + e.message);
      }
    }, 2000);
  };

  const closeResult = () => setOrderResult(null);

  if (loading) return <p className="text-gray-600">Loading canteen menu...</p>;

  if (menuItems.length === 0)
    return <p className="text-gray-600">No items found in menu.</p>;

  return (
    <div>
      {/* Title + History Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <UtensilsCrossed /> Canteen Menu
        </h2>
        <button
          onClick={() => navigate("/history")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Order History
        </button>
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold flex items-center justify-between">
              {item.name}
              {item.isSpecial && <Star className="text-yellow-500 w-5 h-5" />}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-500 capitalize">
              Category: {item.category}
            </p>
            <p className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> {item.price}
            </p>
            <p className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {item.prepTime} mins
            </p>
            <p className="flex items-center gap-1 mb-2">
              {item.isAvailable ? (
                <CheckCircle className="text-green-500 w-4 h-4" />
              ) : (
                <XCircle className="text-red-500 w-4 h-4" />
              )}
              {item.isAvailable ? "Available" : "Not Available"}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <label htmlFor={`qty-${item.id}`} className="text-xs text-gray-500">
                Qty:
              </label>
              <input
                id={`qty-${item.id}`}
                type="number"
                min={1}
                max={10}
                value={orderQty[item.id] || 1}
                onChange={(e) =>
                  setOrderQty((q) => ({
                    ...q,
                    [item.id]: Math.max(1, Number(e.target.value)),
                  }))
                }
                className="w-14 px-2 py-1 border rounded text-sm"
              />
            </div>
            <button
              onClick={() => handleOrder(item.name)}
              disabled={!item.isAvailable || ordering === item.name}
              className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
            >
              {ordering === item.name ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Ordering...
                </span>
              ) : (
                "Order"
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Animation Modal */}
      {showPayment && paymentItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <div className="text-lg font-bold mb-2 text-gray-800">
              Processing Payment...
            </div>
            <div className="text-gray-600 mb-2">
              <span>
                Item: <b>{paymentItem.name}</b>
              </span>
              <br />
              <span>
                Price: <b>₹{paymentItem.price}</b>
              </span>
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
            <div className="text-lg font-bold mb-2 text-gray-800">
              Order Successful!
            </div>
            <div className="mb-2 text-gray-700">
              <div>
                <b>Token:</b> <span className="text-blue-600">{orderResult.token}</span>
              </div>
              <div>
                <b>Item:</b> {orderResult.item}
              </div>
              <div>
                <b>Total:</b> ₹{orderResult.price}
              </div>
            </div>
            <button
              onClick={closeResult}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canteen;
