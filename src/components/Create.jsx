import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
    const [products, updateProducts] = useContext(ProductContext);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const AddProductHandler = (e) => {
        e.preventDefault();

        if (title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 3 || price.trim().length < 1 || description.trim().length < 5) {
            alert("Each input must meet the minimum character length.");
            return;
        }

        const newProduct = {
            id: nanoid(),
            title,
            image,
            category,
            price: parseFloat(price),
            description
        };

        const updatedProducts = [...products, newProduct];
        updateProducts(updatedProducts);
        toast.success("Product added successfully");

        navigate("/");
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
            <form onSubmit={AddProductHandler} className="flex flex-col items-center p-10 w-[90%] md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg">
                <h1 className="mb-8 text-4xl font-semibold text-blue-600">Add New Product</h1>
                
                <input
                    type="url"
                    placeholder="Image Link"
                    className="text-lg bg-gray-50 border border-gray-300 rounded p-4 w-full mb-5 shadow-sm focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />

                <input
                    type="text"
                    placeholder="Title"
                    className="text-lg bg-gray-50 border border-gray-300 rounded p-4 w-full mb-5 shadow-sm focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <div className="w-full flex justify-between mb-5">
                    <input
                        type="text"
                        placeholder="Category"
                        className="text-lg bg-gray-50 border border-gray-300 rounded p-4 w-[48%] shadow-sm focus:ring-2 focus:ring-blue-300"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="text-lg bg-gray-50 border border-gray-300 rounded p-4 w-[48%] shadow-sm focus:ring-2 focus:ring-blue-300"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>

                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Enter product description..."
                    className="text-lg bg-gray-50 border border-gray-300 rounded p-4 w-full mb-8 shadow-sm focus:ring-2 focus:ring-blue-300"
                    rows="6"
                />

                <button
                    type="submit"
                    className="py-3 px-6 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
                >
                    Add New Product
                </button>
            </form>
        </div>
    );
};

export default Create;
