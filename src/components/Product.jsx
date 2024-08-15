import React from 'react'
import { FaStar } from 'react-icons/fa'

const Product = ({item}) => {
  return (
    <div className="max-w-xs overflow-hidden bg-white rounded-lg shadow-xl border-t-2 border-gray-500 hover:scale-105 duration-300">
    <div className="px-4 py-2">
        <h1 className="text-md font-bold text-gray-800">{item.product_name}</h1>
        <div className='mt-2'>
        {
            item.description
        }
        </div>
    </div>

    <img className="object-cover w-full h-48 mt-2" src={item.image} alt="NIKE AIR" />

    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${item.price}</h1>

        <div className="flex items-center justify-between gap-1">
        <h1 className="text-lg font-bold text-white">{item.ratings}</h1>
        <FaStar className='text-md text-white'/>
        </div>

        <button className="btn btn-xs border-none px-2 py-1 text-md font-semibold text-white bg-blue-600 rounded hover:bg-blue-500">{item.category}</button>
    </div>
</div>
  )
}

export default Product
