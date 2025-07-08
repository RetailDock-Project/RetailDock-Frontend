import React, { useState } from "react";
import POSHeader from "./POSHeader";
import POSSearchBar from "./POSSearchBar";
// import POSCategories from "./POSCategories";
import POSProductList from "./POSProductList";
import CurrentSale from "./CurrentSale";
import { Button } from "../../../components/ui/reusable/Button";
import SaleLedgers from "./SaleLedgers";
import { useNavigate } from "react-router-dom";
import AddCreditCustomerModal from "../Debtors/AddCustomerModal";
import AddCustomerModal from "./AddCustomer";


const PointOfSale: React.FC = () => {


  const [isCreditModalOpen,setIsCreditModalOpen]=useState(false);
  const [isCashModalOpen,setIsCashModalOpen]=useState(false);
  return (
    <div className="grid p-6 grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
      <div className="w-full ">
        <div className="flex  justify-between">
         <h1 className="text-xl font-semibold">Point of Sale</h1>
           <div className="flex  gap-5">
                 <Button size="sm" className="bg-blue-600" variant="primary" onClick={() => setIsCashModalOpen(true)}>
                   + Add Cash Customer
                 </Button>
                 <Button size="sm" variant="primary" onClick={() => { setIsCreditModalOpen(true) }}>
                   + Add Credit Customer
                 </Button>
     
               </div>
               </div>
        <POSHeader />

        <POSSearchBar />
        {/* <POSCategories /> */}
        <POSProductList />
      </div>
      
      <div className="w-full">
        <div>
          <SaleLedgers/>
        </div>
        <div className=" ">
        <CurrentSale />
        </div>
      </div>

      
<AddCustomerModal
      isOpen={isCashModalOpen}
        onClose={() => setIsCashModalOpen(false)}
/>


                     <AddCreditCustomerModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
      />
    </div>
  );
};

export default PointOfSale;
