
import { AiOutlineWarning } from "react-icons/ai";
import { MetricCard } from "../../superadmin/components/Dashboard";


import { FaRupeeSign, FaShoppingCart, FaTruck, FaUsers } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

const data = [
    { month: 'Jan', sales: 4000, purchase: 2400 },
    { month: 'Feb', sales: 3000, purchase: 1398 },
    { month: 'Mar', sales: 5000, purchase: 2000 },
    { month: 'Apr', sales: 2780, purchase: 3908 },
    { month: 'May', sales: 1890, purchase: 4800 },
    { month: 'Jun', sales: 2390, purchase: 3800 },

];

const AccountantDashboard = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50 overflow-y-auto p-6 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Accountant Dashboard</h1>
                    <p className="text-sm text-gray-500">Platform overview and key metrics</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Sales"
                        value={
                            <>
                                ₹4,56,000
                                <p className="text-xs text-green-600 mt-1">Current Year</p>
                            </>
                        }
                        icon={<FaRupeeSign className="w-5 h-5 text-blue-600" />}
                        iconBg="bg-blue-100"
                    />
                    <MetricCard
                        title="Total Customers"
                        value="843"
                        icon={<FaUsers className="w-5 h-5 text-green-600" />}
                        iconBg="bg-green-100"
                    />
                    <MetricCard
                        title="Total Purchase"
                        value={
                            <>
                                ₹13,00,000
                                <p className="text-xs text-green-600 mt-1">Current Year</p>
                            </>
                        }
                        icon={<FaShoppingCart className="w-5 h-5 text-purple-600" />}
                        iconBg="bg-purple-100"
                    />
                    <MetricCard
                        title="Total Suppliers"
                        value="18"
                        icon={<FaTruck className="w-5 h-5 text-yellow-600" />}
                        iconBg="bg-yellow-100"
                    />
                </div>
                {/*chart Component*/}
                <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl shadow-md w-full md:w-[600px]">
                        <h2 className="text-lg font-semibold mb-4">Monthly Sales vs Purchase (Current Year)</h2>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#4ade80" radius={[4, 4, 0, 0]} name="Sales" />
                                <Bar dataKey="purchase" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Purchase" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>


                    {/*Due Component*/}
                    <div className="flex justify-end overflow-x-auto p-2">
                        <div className="bg-white border rounded-xl p-6 w-full max-w-lg shadow-md relative min-w-[400px]">
                            <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-xl"></div>

                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                                    <span> <AiOutlineWarning className="w-5 h-5" /></span>
                                    <span>Payments Due</span>
                                </div>

                            </div>

                            <p className="text-gray-500 text-sm mb-5">Upcoming payments to suppliers</p>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800">Parts Unlimited</p>
                                        <p className="text-sm text-gray-500">PO-1092 · Due: 2025-05-29</p>
                                    </div>
                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">$1850.00</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800">Supply Co</p>
                                        <p className="text-sm text-gray-500">PO-1089 · Due: 2025-05-27</p>
                                    </div>
                                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">$2450.75</span>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/*Invoice Component*/}
                </div>
                <div className="bg-white border rounded-xl p-4 w-full shadow-sm overflow-y-auto max-h-80">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Pending Invoices</h2>
                        <p className="text-sm text-gray-500">Upcoming customer payments</p>
                    </div>

                    <div className="space-y-4 pr-2">
                        {[
                            { id: 'INV-4592', name: 'Acme Corp', due: '2025-05-30', amount: '$2150.50' },
                            { id: 'INV-4588', name: 'Widget Inc', due: '2025-05-28', amount: '$1750.25' },
                            { id: 'INV-4585', name: 'Tech Solutions', due: '2025-05-26', amount: '$3250.75' },
                            { id: 'INV-4583', name: 'Delta Pvt Ltd', due: '2025-05-24', amount: '$1325.00' },
                            { id: 'INV-4581', name: 'Brightworks Ltd', due: '2025-05-22', amount: '$980.00' },
                        ].map((invoice, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-900">{invoice.id} – {invoice.name}</p>
                                    <p className="text-sm text-gray-500">Due: {invoice.due}</p>
                                </div>
                                <span className="bg-slate-800 text-white text-sm px-3 py-1 rounded-full font-semibold">
                                    {invoice.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}

export default AccountantDashboard
