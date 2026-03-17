import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const producte = useSelector((state) => state.product.products);
  const users = useSelector((state) => state.user.user);
  const orders = useSelector((state=> state.orders.orders));
  const mode = useSelector((state) => state.theme.mode);

  const usercount = users.length;
  const productcount = producte.length;
  const ordercount = orders.length;

  // Revenue Calculation Functions
  const calculateTotalRevenue = () => {
    return orders
      .filter(order => order.status === "Completed")
      .reduce((total, order) => total + (order.amount || 0), 0);
  };

  const calculatePendingRevenue = () => {
    return orders
      .filter(order => order.status === "Pending" || order.status === "Processing")
      .reduce((total, order) => total + (order.amount || 0), 0);
  };

  const calculateMonthlyRevenue = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return orders
      .filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === currentMonth && 
               orderDate.getFullYear() === currentYear &&
               order.status === "Completed";
      })
      .reduce((total, order) => total + (order.amount || 0), 0);
  };

  const calculateAverageOrderValue = () => {
    const completedOrders = orders.filter(order => order.status === "Completed");
    if (completedOrders.length === 0) return 0;
    
    const totalRevenue = calculateTotalRevenue();
    return Math.round(totalRevenue / completedOrders.length);
  };

  const getRevenueGrowth = () => {
    // Simple growth calculation (you can enhance this based on historical data)
    const currentMonthRevenue = calculateMonthlyRevenue();
    const avgMonthlyRevenue = calculateTotalRevenue() / 12; // Assuming 12 months of data
    
    if (avgMonthlyRevenue === 0) return 0;
    return ((currentMonthRevenue - avgMonthlyRevenue) / avgMonthlyRevenue * 100).toFixed(1);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalRevenue = calculateTotalRevenue();
  const pendingRevenue = calculatePendingRevenue();
  const monthlyRevenue = calculateMonthlyRevenue();
  const avgOrderValue = calculateAverageOrderValue();
  const revenueGrowth = getRevenueGrowth();

  const stats = [
    { title: "Total Users", value: usercount, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "bg-blue-500" },
    { title: "Total Products", value: productcount, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "bg-green-500" },
    { title: "Total Orders", value: ordercount, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "bg-purple-500" },
    { title: "Total Revenue", value: formatCurrency(totalRevenue), icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "bg-yellow-500" },
  ];


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(monthlyRevenue)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Current month</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Pending Revenue</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatCurrency(pendingRevenue)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Awaiting completion</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Avg Order Value</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(avgOrderValue)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Per completed order</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition border dark:border-gray-700">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Revenue Growth</p>
            <p className={`text-2xl font-bold ${revenueGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">vs avg monthly</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Revenue by Status</h2>
          <div className="space-y-4">
            {[
              { status: 'Completed', amount: totalRevenue, color: 'bg-green-500', percentage: totalRevenue > 0 ? 100 : 0 },
              { status: 'Pending', amount: pendingRevenue, color: 'bg-orange-500', percentage: totalRevenue > 0 ? (pendingRevenue / (totalRevenue + pendingRevenue)) * 100 : 0 },
              { status: 'Processing', amount: orders.filter(o => o.status === 'Processing').reduce((sum, o) => sum + o.amount, 0), color: 'bg-blue-500', percentage: 0 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.status}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">{formatCurrency(item.amount)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Top Revenue Orders</h2>
          <div className="space-y-3">
            {orders
              .filter(order => order.status === 'Completed')
              .sort((a, b) => b.amount - a.amount)
              .slice(0, 5)
              .map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">#{order.id}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{order.customer}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{order.product}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">{formatCurrency(order.amount)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Product</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">#ORD-{1000 + item}</td>
                  <td className="py-3 px-4 text-gray-700">Customer {item}</td>
                  <td className="py-3 px-4 text-gray-700">Product {item}</td>
                  <td className="py-3 px-4 text-gray-700">${(Math.random() * 1000).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item % 3 === 0 ? "bg-green-100 text-green-800" :
                        item % 3 === 1 ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                      }`}>
                      {item % 3 === 0 ? "Completed" : item % 3 === 1 ? "Pending" : "Processing"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
