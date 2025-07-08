import React from "react";
import POSHeader from "./POSHeader";
import POSSearchBar from "./POSSearchBar";
import POSCategories from "./POSCategories";
import POSProductList from "./POSProductList";
import CurrentSale from "./CurrentSale";

const PointOfSale: React.FC = () => {
  return (
    <div className="grid p-6 grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
      <div className="w-full">
        <POSHeader />
        
        <POSSearchBar />
        <POSCategories />
        <POSProductList />
      </div>
      <div className="w-full">
        <CurrentSale />
      </div>
    </div>
  );
};

export default PointOfSale;
