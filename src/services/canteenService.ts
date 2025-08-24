import { supabase } from "./supabaseClient";

// ------------------ Menu Items ------------------
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "snacks" | "beverages";
  price: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpecial: boolean;
  rating: number;
  prepTime: number;
}

// Fetch menu items
export async function fetchMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase.from("canteen_menu").select("*");

  if (error) {
    console.error("❌ Error fetching menu items:", error.message);
    return [];
  }

  console.log("✅ Supabase returned menu:", data);

  if (!data) return [];

  return data.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    price: row.price,
    isAvailable: row.is_available,
    isVegetarian: row.is_vegetarian,
    isSpecial: row.is_special,
    rating: row.rating,
    prepTime: row.prep_time,
  }));
}

// ------------------ Order History ------------------
export interface OrderHistory {
  id: string;
  item_name: string;
  order_time: string;
  token: string;
}

// Fetch order history
export async function fetchOrderHistory(): Promise<OrderHistory[]> {
  const { data, error } = await supabase
    .from("order_history")
    .select("*")
    .order("order_time", { ascending: false });

  if (error) {
    console.error("❌ Error fetching order history:", error.message);
    return [];
  }

  console.log("✅ Supabase returned history:", data);

  return data || [];
}

// ------------------ Place Order (Optional) ------------------
export async function placeOrder(
  itemName: string
): Promise<{ success: boolean; message: string }> {
  const token = Math.floor(1000 + Math.random() * 9000).toString(); // random 4-digit token

  const { error } = await supabase.from("order_history").insert([
    {
      item_name: itemName,
      order_time: new Date().toISOString(),
      token,
    },
  ]);

  if (error) {
    console.error("❌ Error placing order:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "Order placed successfully!" };
}
