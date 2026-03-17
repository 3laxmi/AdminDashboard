import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProduct } from '../features/products/Productslice'
import Productform from '../components/Productform'


const Products = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const products = useSelector((state) => state.product.products)
  const dispatch = useDispatch();

  const navigate = useNavigate()



  return (

    <div >

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Products</h1>
      <button
        onClick={() => {
          setSelectedProduct(null);
          setIsFormOpen(true);
        }}
        className=" bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded mb-6 mt-4"
      >
        Add Product
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>

              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-300 font-semibold">ID</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-300 font-semibold">Name</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-300 font-semibold">Price</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-300 font-semibold">Category</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{product.id}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">${product.price}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{product.category}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedProduct(product)
                          setIsFormOpen(true)
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>

                      <button onClick={() => dispatch(deleteProduct(product.id))} className="bg-red-300 hover:bg-red-400 text-white text-sm font-medium px-3 py-1 rounded transition">
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
        <Productform
          product={selectedProduct}
          closeForm={() => setIsFormOpen(false)}
        />
      )}
    </div>
  )
}

export default Products
