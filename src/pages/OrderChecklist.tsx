
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "delivered";
  orderDate: string;
}

// Temporary mock data - In a real app, this would come from your backend
const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "John Doe",
    items: [
      { name: "Fresh Tomatoes", quantity: 2, price: 40.00 },
      { name: "Onions", quantity: 1, price: 30.00 }
    ],
    total: 110.00,
    status: "pending",
    orderDate: "2025-04-25"
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    items: [
      { name: "Chicken Breast", quantity: 1, price: 150.00 },
      { name: "Rice", quantity: 2, price: 120.00 }
    ],
    total: 390.00,
    status: "delivered",
    orderDate: "2025-04-25"
  }
];

const OrderChecklist = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order Checklist</h1>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  {order.status === "delivered" ? (
                    <span className="inline-flex items-center text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Delivered
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-orange-600">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Mark as Delivered
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderChecklist;
