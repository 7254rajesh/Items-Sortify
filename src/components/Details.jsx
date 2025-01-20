import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ProductContext } from '../utils/Context';
import { toast } from 'react-toastify';

function Details() {
  const [products, updateProducts] = useContext(ProductContext); 
  const [product, setProduct] = useState(null);
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id || p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, products]);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    updateProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success("Product deleted successfully");
    navigate("/"); 
  };

  return product ? (
    <div className="flex flex-wrap justify-center items-center py-10 px-6 bg-gray-50">
      {/* Product Image */}
      <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0">
        <img 
          className="object-contain max-h-[400px] w-[80%] rounded-xl shadow-lg"
          src={product.image} 
          alt={product.title} 
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-start bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">{product.title}</h1>
        <h3 className="text-lg text-gray-500 mb-3">{product.category}</h3>
        <h2 className="text-2xl text-red-500 mb-4">${product.price}</h2>
        <p className="text-lg text-gray-700 mb-6">{product.description}</p>

        <div className="flex gap-4">
          {/* Edit Button */}
          <Link 
            to={`/edit/${product.id}`} 
            state={{ from: location.pathname }}  
            className="py-3 px-6 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Edit
          </Link>

          {/* Delete Button */}
          <button 
            className="py-3 px-6 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
