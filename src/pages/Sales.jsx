import React from "react";
import { salesData } from "../components/common/Orderdata"
import { useSelector } from "react-redux";
import Orderform from "../components/Orderform";

const Sales = () => {
  const orders = useSelector((state) => state.orders.orders)
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);


  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Sales
      </h1>
      <button
        onClick={() => {
          setSelectedOrder(null);
          setIsFormOpen(true);
        }}
        className=" bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded mb-6 mt-4"
      >
        edit order
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold">Customer</th>
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Payment</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>


              </tr>
            </thead>

            <tbody>

              {salesData.map((sale) => (

                <tr key={sale.id} className="border-b hover:bg-gray-50">

                  <td className="py-3 px-4">#ORD-{sale.id}</td>

                  <td className="py-3 px-4">{sale.customer}</td>

                  <td className="py-3 px-4">{sale.product}</td>

                  <td className="py-3 px-4">{sale.quantity}</td>

                  <td className="py-3 px-4">₹{sale.amount}</td>

                  <td className="py-3 px-4">{sale.payment}</td>

                  <td className="py-3 px-4">

                    <span
                      className={`px-2 py-1 text-xs rounded ${sale.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : sale.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : sale.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {sale.status}
                    </span>

                  </td>

                  <td className="py-3 px-4">{sale.date}</td>
                  <td className="py-3 px-4">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(sale);
                          setIsFormOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      {isFormOpen && (
        <Orderform
          order={selectedOrder}
          closeForm={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
};

export default Sales;