import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../features/products/Productslice';

const Productform = ({ product, closeForm, }) => {

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product) {
      dispatch(updateProduct(formData));
    } else {
      dispatch(
        addProduct({
          ...formData,
          id: Date.now()
        })
      );
    }

    closeForm();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70">

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 border dark:border-gray-700">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {product ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

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
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              {product ? "Update Product" : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};


export default Productform;



// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addProduct, updateProduct } from "../../redux/slices/ProductSlice";

// const ProductForm = ({ product, closeForm }) => {

//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     price: "",
//     category: ""
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData(product);
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (product) {
//       dispatch(updateProduct(formData));
//     } else {
//       dispatch(
//         addProduct({
//           ...formData,
//           id: Date.now()
//         })
//       );
//     }

//     closeForm();
//   };

//   return (

//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

//       <div className="bg-white rounded-lg shadow-lg w-[450px] p-6">

//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           {product ? "Update Product" : "Add Product"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">
//               Product Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">
//               Price
//             </label>

//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-600 text-sm mb-1">
//               Category
//             </label>

//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4">

//             <button
//               type="button"
//               onClick={closeForm}
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {product ? "Update Product" : "Add Product"}
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default Productform;