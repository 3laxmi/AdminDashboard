import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateOrder } from "../features/sales/Orderslice";

const Orderform = ({ order, closeForm }) => {

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    product: "",
    quantity: "",
    amount: "",
    payment: "",
    status: "",
    date: ""
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (order) {
      dispatch(updateOrder(formData));
    } else {
      dispatch(
        addOrder({
          ...formData,
         
        })
      );
    }

    closeForm();
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border dark:border-gray-700">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {order ? "Edit Order" : "Add Order"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
              
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formData.product}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Payment Method</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Order Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              {order ? "Update Order" : "Create Order"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Orderform;