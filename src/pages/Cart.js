import React, { useState } from "react";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      name: "Nike Air Max 1 Essential",
      description: "Men's Shoes, White/Summit White/Black, Size 6.5",
      price: 140.0,
      quantity: 1,
      checked: false,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      name: "Nike Sportswear Phoenix Fleece",
      description: "Sweatshirt, Red Sepia/Sail, Size XS (0-2)",
      price: 70.0,
      quantity: 1,
      checked: false,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      name: "Nike Sportswear Phoenix Fleece",
      description: "Sweatshirt, Light Orewood Brown/Sail, Size XXS (00)",
      price: 70.0,
      quantity: 1,
      checked: false,
    },
  ]);

  // Calculate totals for checked items only
  const checkedItems = cartItems.filter((item) => item.checked);
  const subtotal = checkedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = checkedItems.length > 0 ? 290.29 : 0;
  const savedAmount = checkedItems.length > 0 ? 290.29 : 0;
  const total = subtotal + shippingFee - savedAmount;

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

  const handleCheckToggle = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-4">
        <Header />
      </div>
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
              onCheckToggle={() => handleCheckToggle(item.id)}
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
            <button className="w-full bg-brown-500 text-white py-3 rounded-lg mt-4 hover:bg-brown-600">
              Checkout({checkedItems.length})
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
