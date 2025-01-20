import React, { useContext } from 'react';
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

function Nav() {
  const [products] = useContext(ProductContext);

  let distinct_category = products && products.length > 0 
    ? products.reduce((acc, cv) => [...acc, cv.category], []) 
    : [];

  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 100 + 120).toFixed()}, ${(Math.random() * 100 + 120).toFixed()}, ${(Math.random() * 100 + 120).toFixed()}, 0.6)`; // Softer pastel shades
  };

  return (
    <nav className='w-[20%] h-full bg-gradient-to-b from-gray-200 to-gray-400 p-5 flex flex-col items-start shadow-lg rounded-lg'>
      <a 
        className='py-3 px-6 mb-6 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors duration-200'
        href="/create">
        Add New Product
      </a>
      
      <hr className='w-full border-t-2 border-gray-500 mb-6' />
      
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Category Filter</h1>

      <div className='w-full'>
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className='flex items-center mb-4 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200 ease-in-out'>
            <span
              style={{ backgroundColor: color() }}
              className='rounded-full mr-3 w-[20px] h-[20px]'></span>
            <span className='text-gray-800 font-medium text-lg'>{c}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Nav;
