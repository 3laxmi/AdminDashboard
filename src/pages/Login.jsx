import React, { useState } from 'react'
import { Admin_Login } from '../config/Adminauth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputValues = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    handleError(name, value);
  };

  const handleError = (fieldName, fieldValue) => {
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;

    let message = "";

    if (fieldName === "email") {
      if (!fieldValue) {
        message = "Email is required";
      } else if (!email_regex.test(fieldValue)) {
        message = "Invalid email address";
      }
    }

    if (fieldName === "password") {
      if (!fieldValue) {
        message = "Password is required";
      } else if (!password_regex.test(fieldValue)) {
        message =
          "Password must contain uppercase, lowercase, number & special character";
      }
    }

    setError((prev) => ({
      ...prev,
      [fieldName]: message
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(data.email && data.password)) {
      alert("Field is required");
      return;
    }

    if (error.email || error.password) {
      alert("First fix the Error");
      return;
    }

    if (data.email === Admin_Login.email && data.password === Admin_Login.password) {

      alert("Admin Login Successful");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({ email: "admin@gmail.com" }));

      navigate("/dashboard");

    } else {
      alert("Invalid Admin Credentials");
    }

    setData({
      email: "",
      password: ""
    });
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-100">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <div className="space-y-4">

          <div>
            <input
              placeholder="Email Id"
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputValues}
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleInputValues}
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

        </div>

      </form>

    </div>
  );
}

export default Login



