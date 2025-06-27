import React from 'react'


interface user {
  businessName: string;
  email: string;
  plan: 'Basic' | 'Premium';
  status: 'trial' | 'active' | 'canceled';
  signupDate: string;
  expiry: string;
  users: number;
  stores: number;
}

const Customers: user[] = [
  {
    businessName: 'Local Mart Enterprises',
    email: 'contact@localmart.in',
    plan: 'Basic',
    status: 'trial',
    signupDate: '4/1/2024',
    expiry: '6/15/2025',
    users: 5,
    stores: 1,
  },
  {
    businessName: 'Retail Store Chain Ltd.',
    email: 'info@retailchain.com',
    plan: 'Premium',
    status: 'active',
    signupDate: '1/15/2023',
    expiry: '12/31/2025',
    users: 45,
    stores: 12,
  },
  {
    businessName: 'Tech Gadget Store',
    email: 'support@techgadget.co.in',
    plan: 'Premium',
    status: 'canceled',
    signupDate: '3/15/2023',
    expiry: '6/10/2024',
    users: 15,
    stores: 2,
  },
];

const customers :React.FC = () => {
  return (
  <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
      <p className="text-sm text-gray-500 mb-4">Manage all subscribed retail businesses</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by business name or email..."
          className="border px-4 py-3 text-sm placeholder:text-xs rounded w-full sm:w-80"
        />
        <select className="border px-3 py-2 rounded">
          <option>All Statuses</option>
        </select>
        <select className="border px-3 py-2 rounded">
          <option>All Plans</option>
        </select>
       
      
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2">Business Name</th>
              <th className="text-left px-4 py-2">Plan Name & Status</th>
              <th className="text-left px-4 py-2">Sign Up Date</th>
              <th className="text-left px-4 py-2">Expiry</th>
              <th className="text-left px-4 py-2">Total users</th>
              <th className="text-left px-4 py-2">Business Status</th>
               <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Customers.map((x, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-800">{x.businessName}</div>
                  <div className="text-gray-500 text-xs">{x.email}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs border rounded px-2 py-1 text-gray-600 bg-gray-100">{x.plan}</span>
                    <span className={`text-xs rounded px-2 py-1 text-white ${
                      x.status === 'trial'
                        ? 'bg-blue-300'
                        : x.status === 'active'
                        ? 'bg-green-400'
                        : 'bg-gray-400'
                    }`}>
                      {x.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">{x.signupDate}</td>
                <td className="px-4 py-2">{x.expiry}</td>
                <td className="px-4 py-2">
                  {x.users} users
                  <br />
                  <span className="text-xs text-gray-500">{x.stores} stores</span>
                </td>
                <td></td>
                <td className="px-4 py-2 text-center">
                  <button className="text-gray-500 hover:text-gray-700">&#x22EE;</button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  
};

export default  customers