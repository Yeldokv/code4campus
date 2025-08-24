// src/services/canteenService.ts
import { supabase } from "./supabaseClient";

// Menu item type
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpecial: boolean;
  rating: number;
  prepTime: number;
}

// Order history entry type
export interface OrderHistoryEntry {
  id: string;
  student_id: string;
  token: string;
  total: number;
  created_at: string;
  items: { name: string; qty: number; price: number }[];
}

// Fetch menu items
export async function fetchMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase.from("canteen_menu").select("*");
  if (error) {
    console.error("❌ Error fetching menu items:", error.message);
    return [];
  }
  return data || [];
}

// Place order (multiple items)
export async function placeOrder(
  studentId: string,
  items: { name: string; qty: number; price: number }[]
): Promise<{ token: string }> {
  const token = Math.floor(1000 + Math.random() * 9000).toString();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const { error } = await supabase.from("canteen_orders").insert([
    {
      student_id: studentId,
      token,
      total,
      items,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    console.error("❌ Error placing order:", error.message);
    throw new Error(error.message);
  }
  return { token };
}

// Fetch order history for a student
export async function fetchOrderHistory(studentId: string): Promise<OrderHistoryEntry[]> {
  const { data, error } = await supabase
    .from("canteen_orders")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error fetching order history:", error.message);
    return [];
  }

  return data || [];
}
