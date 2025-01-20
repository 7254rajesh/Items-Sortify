import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Edit = () => {
  const { id } = useParams();
  const [products, updateProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setTitle(foundProduct.title);
      setImage(foundProduct.image);
      setCategory(foundProduct.category);
      setPrice(foundProduct.price);
      setDescription(foundProduct.description);
    } else {
      toast.error("Product not found");
      navigate("/");  
    }
  }, [id, products, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: parseInt(id),
      title,
      image,
      category,
      price: parseFloat(price),
      description,
    };

    const updatedProducts = products.map((p) =>
      p.id === parseInt(id) ? updatedProduct : p
    );
    updateProducts(updatedProducts);
    toast.success("Product updated successfully");
    navigate(`/details/${id}`);
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-8 w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="mb-8 text-4xl font-semibold text-blue-600">Edit Product</h1>

      {/* Image Input */}
      <input
        type="url"
        placeholder="Image Link"
        className="text-lg bg-gray-100 border border-gray-300 rounded p-4 w-full mb-4 focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        className="text-lg bg-gray-100 border border-gray-300 rounded p-4 w-full mb-4 focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="w-full flex justify-between gap-4 mb-4">
        {/* Category Input */}
        <input
          type="text"
          placeholder="Category"
          className="text-lg bg-gray-100 border border-gray-300 rounded p-4 w-[48%] focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        {/* Price Input */}
        <input
          type="number"
          placeholder="Price"
          className="text-lg bg-gray-100 border border-gray-300 rounded p-4 w-[48%] focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>

      {/* Description Input */}
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Enter product description..."
        className="text-lg bg-gray-100 border border-gray-300 rounded p-4 w-full mb-6 focus:ring-2 focus:ring-blue-400"
        rows="6"
      />

      {/* Submit Button */}
      <button 
        type="submit" 
        className="py-3 px-8 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200">
        Save Changes
      </button>
    </form>
  );
};

export default Edit;
