import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext([[], () => {}]);

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products from localStorage...");

    try {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      if (savedProducts && Array.isArray(savedProducts)) {
        console.log("Products loaded:", savedProducts); // Log products
        setProducts(savedProducts);
      } else {
        console.log("No products found in localStorage, setting default products.");
        const defaultProducts = [
          {
            id: 1,
            title: "Premium Clothing",
            category: "clothing",
            image: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: 2,
            title: "Electronics Special",
            category: "electronics",
            image: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];
        setProducts(defaultProducts);
        localStorage.setItem("products", JSON.stringify(defaultProducts));
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setProducts([]); // Fallback in case of error
    }
  }, []);

  const updateProducts = (newProducts, append = false) => {
    const updatedProducts = append
      ? [...products, ...newProducts]
      : newProducts;
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <ProductContext.Provider value={[products, updateProducts]}>
      {children}
    </ProductContext.Provider>
  );
};

export default Context;
