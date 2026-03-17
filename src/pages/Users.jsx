import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { deleteUser } from "../features/users/Userslice";
import Userform from "../components/Userform";

const Users = () => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Users
      </h1>

      <button
        onClick={() => {
          setSelectedUser(null);
          setIsFormOpen(true);
        }}
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded mb-6 mt-4"
      >
        Add User
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b dark:border-gray-700">

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  ID
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Name
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Email
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Phone
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Role
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Status
                </th>

                <th className="text-left py-3 px-4 text-gray-600 font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users?.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >

                  <td className="py-3 px-4">{user.id}</td>

                  <td className="py-3 px-4">{user.name}</td>

                  <td className="py-3 px-4">{user.email}</td>

                  <td className="py-3 px-4">{user.phone}</td>

                  <td className="py-3 px-4">{user.role}</td>

                  <td className="py-3 px-4">{user.status}</td>

                  <td className="py-3 px-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsFormOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          dispatch(deleteUser(user.id))
                        }
                        className="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {isFormOpen && (

        <Userform
          user={selectedUser}
          closeForm={() => setIsFormOpen(false)}
        />

      )}

    </div>
  );
};

export default Users;