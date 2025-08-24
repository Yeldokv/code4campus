import React, { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";
import { fetchMenuItems, MenuItem } from "../services/canteenService";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Canteen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMenu() {
      const items = await fetchMenuItems();
      setMenuItems(items);
      setLoading(false);
    }
    loadMenu();
  }, []);

  const handleOrder = async (itemName: string) => {
    setOrdering(itemName);
    const result = await placeOrder("student123", itemName); // temporary hardcoded student ID
    alert(`✅ Order placed!\nItem: ${result.itemName}\nToken: ${result.tokenNumber}`);
    setOrdering(null);
  };

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

            {/* Order button */}
            {item.isAvailable && (
              <button
                onClick={() => handleOrder(item.name)}
                disabled={ordering === item.name}
                className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
              >
                {ordering === item.name ? "Ordering..." : "Order"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canteen;
