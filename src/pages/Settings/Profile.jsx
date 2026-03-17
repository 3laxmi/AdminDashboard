
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/profile/ProfileSlice";

const Profile = () => {
  const mode = useSelector((state) => state.theme.mode);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update Redux store
    dispatch(updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.name.charAt(0).toUpperCase()
    }));

    // Save to localStorage for persistence
    localStorage.setItem('userProfile', JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    }));

    console.log("Updated Profile:", formData);
    alert("Profile Updated Successfully");
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Edit Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 max-w-xl border dark:border-gray-700"
      >

        {/* Profile Photo */}
        <div className="mb-6 flex items-center gap-4">

          <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {profile.avatar}
          </div>

          <button
            type="button"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Change Photo
          </button>

        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Change Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
};

export default Profile;
