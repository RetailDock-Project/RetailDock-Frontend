import React from "react";
import POSProductCard from "./POSProductCard";
import { useProducts } from "../../../hooks/useProducts";
import type { Product } from "./PointOfSale";




type props= {
  searchText:string; 
  handleProductAdd:(product:Product)=>void;
  
}

const POSProductList: React.FC<props> = ({searchText,handleProductAdd}) => {

 const {data}=useProducts({search:searchText});
 
  if (!searchText.trim()) return null;
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((product:any, index:number) => (
        <button onClick={()=>handleProductAdd(product)}>  <POSProductCard key={index} product={product} /></button>
      
      ))}
    </div>
  );
};

export default POSProductList;
