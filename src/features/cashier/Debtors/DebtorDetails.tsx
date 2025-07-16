import React from 'react'
import DebtorsHeader from './DebtorHeader'
import Debtors from './Debtors'
import Filter from '../../../components/ui/reusable/Filter'

const DebtorDetails: React.FC = () => {

   
  
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <DebtorsHeader />
      <Filter/>
      <Debtors />
    </div>
  )
}

export default DebtorDetails
