import React, { useState } from "react";
import SaleItem from "./SaleItem";
import SaleSummary from "./SaleSummary";
import ProceedToPayment from "./ProceedToPayment";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const initialItems: CartItem[] = [
  { id: 1, name: "Samsung Galaxy M13", price: 12999, quantity: 1 },
  { id: 2, name: "HP Printer Ink Black", price: 999, quantity: 1 },
  { id: 3, name: "Mi Power Bank 10000mAh", price: 1499, quantity: 1 },
];

const CurrentSale: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const increment = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-4 border rounded-xl shadow-md w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Current Sale
      </h2>

      {items.map((item) => (
        <SaleItem
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          onIncrement={() => increment(item.id)}
          onDecrement={() => decrement(item.id)}
          onRemove={() => remove(item.id)} // <-- new
        />
      ))}

      <SaleSummary subtotal={subtotal} gstPercent={18} />

      <ProceedToPayment onClick={() => alert("Redirecting to payment...")} />
    </div>
  );
};

export default CurrentSale;
