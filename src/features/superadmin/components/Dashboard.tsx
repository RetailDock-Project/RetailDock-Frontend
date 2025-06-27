import React from 'react';
import { Building, Users, CreditCard, Calendar } from 'lucide-react';
import DashboardBarChart from './Charts';


interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, iconBg }) => (
  <div className="flex items-center justify-between border rounded-lg min-w-[250px] p-4 bg-white shadow-sm space-x-4 h-32">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold text-gray-800">{value}</h2>
    </div>
    <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen overflow-y-auto p-6 space-y-6 scrollbar-hide" >
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Developer Dashboard</h1>
        <p className="text-sm text-gray-500">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Organizations"
          value='13'
          icon={<Building className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-100"
        />
        <MetricCard
          title="Total Users"
          value="843"
          icon={<Users className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-100"
        />
        <MetricCard
          title="Current Month Revenue"
          value="₹4,56,000"
          icon={<CreditCard className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-100"
        />
        <MetricCard
          title="Current Year Revenue"
          value="₹54,72,000"
          icon={<Calendar className="w-5 h-5 text-yellow-600" />}
          iconBg="bg-yellow-100"
        />
      </div>

     
  <DashboardBarChart />
{/* Account Status Summary */}
<div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
  <div>
    <h2 className="text-lg font-semibold text-gray-800">Account Status Summary</h2>
    <p className="text-sm text-gray-500">Active vs Inactive Organizations</p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Active Organizations */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Active Organizations</span><span>156</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
      </div>
    </div>

    {/* Inactive Organizations */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Inactive Organizations</span><span>31</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
      </div>
    </div>

    {/*Registered Users */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Registered Users (No Organization)</span><span>38</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
      </div>
    </div>

    {/* Expired Accounts */}
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>Expired Accounts</span><span>15</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
      </div>
    </div>
  </div>
</div>


    </div>
    </div >
  );
};

export default Dashboard;