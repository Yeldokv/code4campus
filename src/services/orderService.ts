// services/orderService.ts
import { v4 as uuidv4 } from "uuid";

export interface Order {
  id: string;
  studentId: string;
  itemName: string;
  tokenNumber: number;
  createdAt: string;
}

// Simulated in-memory orders (replace later with Supabase calls)
let orders: Order[] = [];

// Generate token number (simple random 100–999)
function generateToken(): number {
  return Math.floor(100 + Math.random() * 900);
}

// Place new order
export async function placeOrder(studentId: string, itemName: string): Promise<Order> {
  const newOrder: Order = {
    id: uuidv4(),
    studentId,
    itemName,
    tokenNumber: generateToken(),
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

// Fetch all orders for a student
export async function fetchOrders(studentId: string): Promise<Order[]> {
  return orders.filter((order) => order.studentId === studentId);
}
