import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const location = useLocation();

  // Retrieve product data passed from the product page
  const { product, selectedSize } = location.state || {};

  // Initialize cart items from sessionStorage or as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add a new product to the cart only when the component mounts or the product changes
  useEffect(() => {
    if (product) {
      const newItem = {
        id: `${product.id}-${selectedSize}`, // Unique identifier combining ID and size
        originalId: product.id,
        image: product.imageUrl || "https://via.placeholder.com/150",
        name: product.name,
        description: `${product.description}, Size: ${selectedSize}`,
        price: product.basePrice,
        quantity: 0,
        checked: false,
      };

      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find(
          (item) => item.id === newItem.id
        );
        if (existingItem) {
          // Increment the quantity if the item already exists
          return prevCartItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Add the new item if it doesn't exist
          return [...prevCartItems, newItem];
        }
      });

      // Clear location state after adding to cart
      window.history.replaceState({}, document.title);
    }
  }, [product, selectedSize]);

  // Persist cart items to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate totals for selected items
  const checkedItems = cartItems.filter((item) => item.checked);
  const subtotal = checkedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = checkedItems.length > 0 ? 290.29 : 0;
  const savedAmount = checkedItems.length > 0 ? 290.29 : 0;
  const total = subtotal + shippingFee - savedAmount;

  // Handlers for cart item operations
  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleCheckToggle = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCartItems(updatedCart);
  };

  const handleCheckToggle = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    setCartItems(updatedCart);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex h-screen">
        {/* Cart Items Section */}
        <div className="w-7/12 p-6 border-r border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <div className="overflow-y-auto h-[70vh]">
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="border-b pb-4">
                    <CartItem
                      {...item}
                      onIncrease={() => handleIncrease(item.id)}
                      onDecrease={() => handleDecrease(item.id)}
                      onRemove={() => handleRemove(item.id)}
                      onCheckToggle={() => handleCheckToggle(item.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-5/12 flex items-start justify-center h-screen mt-8">
          <div className="bg-amber-50 p-6 rounded-lg shadow-lg w-10/12">
            <h2 className="text-lg font-bold mb-4">SUMMARY</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping fee</span>
              <span className="font-semibold">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Saved</span>
              <span className="font-semibold text-red-500">
                - ${savedAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-brown-500 text-white py-3 rounded-lg mt-4 hover:bg-brown-600"
              disabled={checkedItems.length === 0}
            >
              Checkout ({checkedItems.length})
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
