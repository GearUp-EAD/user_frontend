import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProductItem = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();

  const product = {
    name: "Nike Air Max 1",
    category: "Men's Shoes",
    price: 109.97,
    images: [
      { id: 1, url: "https://via.placeholder.com/150" },
      { id: 2, url: "https://via.placeholder.com/150" },
      { id: 3, url: "https://via.placeholder.com/150" },
    ],
    sizes: ["8", "9", "10", "11", "12"],
    description: `Meet the leader of the pack. Walking on clouds above the noise, 
      the Air Max 1 blends timeless design with cushioned comfort. Sporting 
      a pared-back colorway and unmatched Nike Air, the classic look is 
      future forward and continues to be the soul of the franchise today.`,
    shippingInfo: "Shipping options available at checkout.",
    colorway: "White/Pure Platinum/Medium Olive/Black",
    sku: "FD9082-102",
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-14">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg flex gap-8 bg-white mb-14">
        <div className="flex-1">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt="Thumbnail"
                className="w-16 h-16 object-cover rounded-md cursor-pointer border hover:border-gray-400"
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-500">{product.category}</p>
          <h3 className="text-xl font-semibold mt-2">
            ${product.price.toFixed(2)}
          </h3>

          <div className="mt-4">
            <label htmlFor="size" className="block font-medium mb-2">
              Select Size:
            </label>
            <select
              id="size"
              value={selectedSize}
              onChange={handleSizeChange}
              className="border border-[#74512D] rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-[#74512D]"
            >
              <option value="">-- Select --</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => navigate("../cart")}
            className="mt-4 w-full bg-[#74512D] text-white py-2 px-4 rounded-md hover:bg-[#654321] transition"
          >
            Add to Cart
          </button>

          {isAddedToCart && (
            <p className="text-green-600 mt-2">Item added to cart!</p>
          )}

          <p className="mt-6 text-gray-600">{product.description}</p>

          <p className="mt-4">
            <strong>Shipping:</strong> {product.shippingInfo}
          </p>
          <p>
            <strong>Shown:</strong> {product.colorway}
          </p>
          <p>
            <strong>Style:</strong> {product.sku}
          </p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductItem;
