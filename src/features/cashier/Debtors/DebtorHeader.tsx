import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../../components/ui/reusable/PageHeader';
import { Button } from '../../../components/ui/reusable/Button';
import Modal from '../../../components/ui/reusable/Modal';
import { FaPlus } from 'react-icons/fa';
import AddCreditCustomerModal from './AddCustomerModal';



const DebtorsHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  
 
  return (
    <div className="p-6">
      <PageHeader
        title="Customer"

        subtitle="View and manage All the Debtors"
        actions={
          <div className="flex gap-2">
            <Button
              size="lg"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
               <FaPlus className='w-5 h-4'/> Add Customer
            </Button>
          </div>
        }
      />

      {/* Modal for Add Customer */}
   <AddCreditCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default DebtorsHeader;
