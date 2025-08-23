import React, { useState, useEffect } from "react";
import {
  UtensilsCrossed,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  DollarSign,
  Leaf,
} from "lucide-react";
import { fetchMenuItems, MenuItem } from "../services/canteenService";

const Canteen: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      const items = await fetchMenuItems();
      setMenuItems(items);
      setLoading(false);
    }
    loadMenu();
  }, []);

  if (loading)
    return <p className="text-gray-600 italic">Loading canteen menu...</p>;

  if (menuItems.length === 0)
    return <p className="text-gray-600 italic">No items found in menu.</p>;

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
        <UtensilsCrossed className="w-6 h-6" /> Canteen Menu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-indigo border rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all"
          >
            {/* Title and Special Badge */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              {item.isSpecial && (
                <span className="flex items-center gap-1 text-sm text-yellow-600 font-medium">
                  <Star className="w-4 h-4 fill-yellow-500" /> Special
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>

            {/* Category + Vegetarian */}
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="px-2 py-0.5 rounded-full text-white bg-indigo-500 capitalize">
                {item.category}
              </span>
              {item.isVegetarian && (
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <Leaf className="w-4 h-4" /> Veg
                </span>
              )}
            </div>

            {/* Price and Time */}
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-gray-800 font-medium">
                <DollarSign className="w-4 h-4" /> ₹{item.price}
              </span>
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4" /> {item.prepTime} mins
              </span>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-1 mt-2">
              {item.isAvailable ? (
                <CheckCircle className="text-green-500 w-5 h-5" />
              ) : (
                <XCircle className="text-red-500 w-5 h-5" />
              )}
              <span
                className={`text-sm font-medium ${
                  item.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canteen;
