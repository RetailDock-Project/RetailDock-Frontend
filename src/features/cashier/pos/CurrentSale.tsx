import React, { useEffect, useState } from "react";
import SaleItem from "./SaleItem";
import SaleSummary from "./SaleSummary";
import ProceedToPayment from "./AddNewSale";
import type { Product, saleItem } from "./PointOfSale";
import toast from "react-hot-toast";
import AddNewSale from "./AddNewSale";

type props={
  newSale:()=>void;
  isLoading:boolean;
  saleItems:saleItem[];
  creditCustomer:boolean;
  paymentMode:string;
  setSaleItems:React.Dispatch<React.SetStateAction<saleItem[]>>;
  productSelected:Product[];
  setProductSelected: React.Dispatch<React.SetStateAction<Product[]>>;
}






const CurrentSale: React.FC<props> = ({productSelected,setProductSelected,saleItems,setSaleItems,newSale,isLoading,creditCustomer,paymentMode}) => {

  

useEffect(() => {
  setSaleItems((prev) => {
    const newItems = [...prev];

    for (const product of productSelected) {
      const exists = prev.find((item) => item.productId === product.id);
      if (!exists) {
        newItems.push({
          productId: product.id,
          unitPrice: product.sellingPrice,
          discountAmount: 0,
          quantity: 1
        });
      }
    }

    return newItems;
  });
}, [productSelected]);


  const subtotal = saleItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discountAmount = saleItems.reduce(
    (sum, item) => sum + item.discountAmount* item.quantity,
    0
  );

  const taxAmount = saleItems.reduce((sum, item) => {
  const product = productSelected.find(p => p.id === item.productId);
  if (!product) return sum;
  const taxableAmount = (item.unitPrice - item.discountAmount) * item.quantity;
  const tax = (taxableAmount * product.gstRate) / 100;
  return sum + tax;
}, 0);

  const increment = (id: string) => {
     const product = productSelected.find(p => p.id === id);
  if (!product) return;
  
    setSaleItems((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
  
    setSaleItems((prev) =>
      prev.map((item) =>
        item.productId  === id && item.quantity >= 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const remove = (id: string) => {
    setProductSelected((prev) => prev.filter((item) => item.id !== id));
    setSaleItems((prev) => prev.filter((item) => item.productId !== id));
  };



const onChangePrice = (id: string, value: number) => {
  const product = productSelected.find(p => p.id === id);
  if (!product) return;

  // Prevent price from exceeding MRP or falling below costPrice
  if (value > product.mrp ) return;
 if(value < product.costPrice)
 {
  toast.error("price is lessthan cost price");
 }
  setSaleItems((prevItems) =>
    prevItems.map((item) =>
      item.productId === id ? { ...item, unitPrice: value } : item
    )
  );
};


const onChangeDiscountAmount = (id: string, value: number) => {
    const product = saleItems.find(p => p.productId === id);
    const goods = productSelected.find(p => p.id === id);
  if (!product || !goods) return;
  
  setSaleItems((prevItems) =>
    prevItems.map((item) => 
      item.productId === id ? { ...item, discountAmount: value } : item
)
  );

     

};

  return (
  <div className="bg-white mt-[72px] p-4 border rounded-xl shadow-md w-full max-w-sm  ">
    



 
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Current Sale
      </h2>
 <div className="overflow-y-auto max-h-[280px] pr-1">
      {productSelected.map((item:any,index) => (
        <SaleItem
          key={index}
         product={item}
         saleItem={saleItems.find((curr)=>curr.productId==item.id)}
        onChangePrice={(val)=>onChangePrice(item.id,val)}
        onChangeDiscountAmount={(val)=>onChangeDiscountAmount(item.id,val)}
          onIncrement={() => increment(item.id)}
          onDecrement={() => decrement(item.id)}
          onRemove={() => remove(item.id)} // <-- new
        />
      ))}
   </div>
      <SaleSummary discount={discountAmount} subtotal={subtotal} taxAmount={taxAmount} />

      <AddNewSale onClick={() => newSale()} isLoading={isLoading} />
         
 

    </div>
  );
};

export default CurrentSale;
