import { supabase } from "./supabaseClient";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';
  price: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpecial: boolean;
  rating: number;
  prepTime: number;
}

// Fetch menu items from Supabase
export async function fetchMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase.from("canteen_menu").select("*");

  if (error) {
    console.error("❌ Error fetching menu items:", error.message);
    return [];
  }

  console.log("✅ Supabase returned:", data);

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
