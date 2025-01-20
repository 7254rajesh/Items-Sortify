import React, { useContext, useState, useEffect } from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/Context';
import Loading from './Loading';

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    console.log("category:", category);  // Log category
    console.log("products before filtering:", products);  // Log products before filtering

    if (!category || category === "undefined") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      console.log("filtered products:", filtered); // Log filtered products
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  // Show Loading component only if products are not available
  console.log("filteredProducts:", filteredProducts); // Log filtered products

  return products.length === 0 ? (
    <Loading />
  ) : (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap justify-center gap-6 overflow-x-hidden overflow-y-auto">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              state={{ from: location.pathname }} // Passing current page as "from" for redirection
              className="card w-[18%] h-[350px] p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between items-center"
            >
              <div
                className="w-full h-[70%] bg-contain bg-no-repeat bg-center mb-4 rounded-lg"
                style={{ backgroundImage: `url(${p.image})` }}
              ></div>
              <h1 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                {p.title}
              </h1>
              <p className="text-sm text-gray-600 mt-2">{p.category}</p>
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
}

export default Home;
