import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../features/users/Userslice";

const Userform = ({ user, closeForm }) => {

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "User",
    status: "Active"
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      dispatch(updateUser(formData));
    } else {
      dispatch(
        addUser({
          ...formData,

        })
      );
    }


    // const newUser = {
    //   ...formData,
    //   id: user ? user.id : Date.now()
    // };


    closeForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border dark:border-gray-700">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {user ? "Update User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="id"
            placeholder="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>User</option>
            <option>Admin</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option>Active</option>
            <option>Blocked</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">

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
              {user ? "Update User" : "Add User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Userform;