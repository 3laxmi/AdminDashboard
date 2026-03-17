import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../features/theme/ThemeSlice";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const profile = useSelector((state) => state.profile);

  return (
    // <header className="bg-white shadow-md h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6">
      <header className="bg-white dark:bg-gray-900 dark:text-white shadow-md h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6">
      <h2 className="text-xl font-bold text-gray-800  dark:text-white">Admin Panel</h2>

      <div className="flex items-center gap-4 relative">

        {/* Notification */}
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
            6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 
            6 8.388 6 11v3.159c0 .538-.214 1.055-.595 
            1.436L4 17h5m6 0v1a3 3 0 11-6 
            0v-1m6 0H9" />
          </svg>
        </button>

        {/* Theme toggle placeholder */}
        <button onClick = {()=>dispatch(toggleTheme())} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 
            9.003 9.003 0 0012 21a9.003 
            9.003 0 008.354-5.646z" />
          </svg>

          {mode === "dark" ? "Light" : "Dark"}
        </button>

        {/* Profile */}
        <div className="relative">

          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-blue-600 transition"
          >
            {profile.avatar}
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-64 bg-white  dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 overflow-hidden">

              {/* Profile Info */}
              <div className="p-4">
                <p className="font-semibold text-gray-800 dark:text-white">{profile.name}</p>
                <p className="text-sm text-gray-500 dark:text-white">{profile.email}</p>
              </div>

              {/* Divider */}
              <div className="border-t"></div>

              {/* Edit Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700"
              >

                Edit profile
              </Link>

              {/* Divider */}
              <div className="border-t"></div>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("currentUser");
                  window.location.href = "/";
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white-700 text-gray-700 w-full text-left"
              >
                <span></span>
                Sign out
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;