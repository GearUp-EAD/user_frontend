import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProductItem = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Make sure this is correctly extracted
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeId, setSizeId] = useState(null); // Variable to store size ID
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSizeChange = (e) => {
    const selectedSizeValue = e.target.value;
    setSelectedSize(selectedSizeValue);

    // Find the variantId based on the selected size
    const selectedVariant = product?.variants.find(
      (variant) => variant.size === selectedSizeValue
    );
    setSizeId(selectedVariant?.variantId || null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const product_img = {
    images: product.imageUrl ? [{ id: 1, url: product.imageUrl }] : [],
  };

  const size = product.variants;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-14">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg flex gap-8 bg-white mb-14">
        <div className="flex-1">
          {product_img.images.length > 0 && (
            <img
              src={product_img.images[0].url}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
          )}
          <div className="flex gap-2 mt-4">
            {product_img.images.map((img) => (
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
          <p className="text-gray-500">{product.description}</p>
          <h3 className="text-xl font-semibold mt-2">
            Rs {product.basePrice.toFixed(2)}
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
              {size.map((variant, index) => (
                <option key={index} value={variant.size}>
                  {variant.size}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              if (!selectedSize) {
                alert("Please select a size before adding to the cart.");
                return;
              }
              navigate("../cart", {
                state: {
                  product,
                  selectedSize,
                  sizeId, // Include size ID in the cart state
                },
              });
            }}
            className="mt-4 w-full bg-[#74512D] text-white py-2 px-4 rounded-md hover:bg-[#654321] transition"
          >
            Add to Cart
          </button>

          {isAddedToCart && (
            <p className="text-green-600 mt-2">Item added to cart!</p>
          )}

          <div className="mt-6 text-gray-600 ">
            <p className="font-bold">Why Shop With Us?</p>
            <p>
              Every product is carefully selected and tested to ensure top-notch
              quality, with safe and secure payments facilitated through our encrypted
              payment gateway for worry-free transactions. If you're not satisfied,
              enjoy hassle-free returns within 14 days. Trusted by thousands, we invite
              you to join our growing community of happy customers. Click "Add to Cart"
              now and experience the difference!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductItem;
