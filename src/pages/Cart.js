import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const shippingFee = 290.29;
  const savedAmount = 290.29;

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    // Send cart data to the backend on checkout
    const response = await fetch("https://your-backend-api.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    if (response.ok) {
      alert("Checkout successful!");
      setCartItems([]); // Clear cart after checkout
      localStorage.removeItem("cartItems"); // Clear localStorage
    } else {
      alert("Checkout failed. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee - savedAmount;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="flex h-screen">
        {/* Left Section: Cart Items */}
        <div className="w-7/12 p-6 border-r border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
        </div>

        {/* Right Section: Summary */}
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
              onClick={handleCheckout}
              className="w-full bg-brown-500 text-white py-3 rounded-lg mt-4 hover:bg-brown-600"
            >
              Checkout({cartItems.length})
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
