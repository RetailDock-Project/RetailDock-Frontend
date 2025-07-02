import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

type Props = {
  name: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

const SaleItem: React.FC<Props> = ({
  name,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="border p-3 rounded-md mb-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">
            ₹{price.toLocaleString()} each
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onDecrement}
            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={onIncrement}
            className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <p className="text-sm font-semibold min-w-[60px] text-right">
            ₹{(price * quantity).toLocaleString()}
          </p>
          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
            title="Remove"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleItem;
