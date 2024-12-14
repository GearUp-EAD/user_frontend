/*global payhere*/

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import CartItem from "../components/CartItem";
import Footer from "../components/Footer";
import Header from "../components/Header";

const customerId = "f838e2bf-ee6e-4d51-afc2-c0f928d6698b";

const CartPage = () => {
  const location = useLocation();

  // Retrieve product data passed from the product page
  const { product, selectedSize, sizeId } = location.state || {}; // Include sizeId

  // Initialize cart items from sessionStorage or as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    address: "1234 Elm Street, Springfield, USA",
    phone: "+1 234 567 890",
  });

  // Add a new product to the cart only when the component mounts or the product changes
  useEffect(() => {
    if (product && selectedSize && sizeId) {
      const newItem = {
        id: `${product.productId}-${sizeId}`,
        originalId: product.productId,
        image: product.imageUrl || "https://via.placeholder.com/150",
        name: product.name,
        description: `${product.description}, Size: ${selectedSize}`,
        price:
          product.basePrice +
          product.variants.find((variant) => variant.variantId === sizeId)
            ?.priceAdjustment || 0,
        quantity: 1,
        sizeId: sizeId,
        size: selectedSize,
        checked: false,
      };

      setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find(
          (item) => item.id === newItem.id
        );
        if (existingItem) {
          return prevCartItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCartItems, newItem];
        }
      });

      // Clear location state after adding to cart
      window.history.replaceState({}, document.title);
    }
  }, [product, selectedSize, sizeId]);

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

  const handleProfileChange = (field, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };


  const handleConfirmOrder = async () => {
    console.log("Confirm Order clicked!"); // Debugging log
  
    const orderData = {
      customerId,
      items: checkedItems.map((item) => ({
        productVariantId: item.sizeId, // Use sizeId as productVariantId
        quantity: item.quantity,
      })),
    };
  
    console.log("Order Data: ", JSON.stringify(orderData, null, 2)); // Log the order data for debugging
  
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      console.log(responseData)
  
      if (response.ok) {
        console.log("Order placed successfully!");
  
        // After placing the order, send the shipping address along with the Order_Id
        const shippingData = {
          shippingAddress: userProfile.address, // Sending the shipping address
          order: responseData, // Sending the orderId returned from the order API
        };
  
        // Send shipping address with Order_Id to the backend
        const shippingResponse = await fetch("http://localhost:8080/api/shippings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shippingData),
        });
  
        if (shippingResponse.ok) {
          console.log("Shipping address updated successfully!");
        } else {
          console.error("Failed to update shipping address:", shippingResponse.statusText);
        }
  
        // Remove only the checked items from the cart
        const remainingItems = cartItems.filter((item) => !item.checked);
  
        // Update the cart state with remaining items
        setCartItems(remainingItems);
  
        // Persist the updated cart to session storage
        sessionStorage.setItem("cartItems", JSON.stringify(remainingItems));
  
        setIsModalVisible(false); // Close the modal
        return responseData; // Return the order ID
      } else {
        console.error("Failed to place the order:", response.statusText);
      }
    } catch (error) {
      console.error("Error while placing the order:", error);
    }
  };
  
  // Function to handle payment
  const handlePayment = async (Order_Id) => {
    try {
      // Fetch order details
      const orderResponse = await fetch(`http://localhost:8080/api/orders/${Order_Id}`);
      if (!orderResponse.ok) throw new Error("Failed to fetch order details");
  
      const { totalAmount, orderID } = await orderResponse.json();
      const amount = `${totalAmount}.00`;
      const order_id = orderID;
  
      // Payment details
      const paymentDetails = {
        order_id,
        amount,
        currency: "LKR",
        first_name: "Saman",
        last_name: "Perera",
        email: "samanp@gmail.com",
        phone: "0771234567",
        address: "No.1, Galle Road",
        city: "Colombo",
        country: "Sri Lanka",
      };
  
      // Request hash and merchant ID from backend
      const hashResponse = await fetch(
        "https://evident-chipmunk-assured.ngrok-free.app/api/payments/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentDetails),
        }
      );
      if (!hashResponse.ok) throw new Error("Failed to generate hash for payment");
  
      const response = await hashResponse.json();
      const { hash, merchantId } = response;
      console.log("Hash:", hash);
      console.log("Merchant ID:", merchantId);
  
      // Payment configuration
      const paymentConfig = {
        sandbox: true,
        merchant_id: merchantId,
        return_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/payment/cancel",
        notify_url: "https://evident-chipmunk-assured.ngrok-free.app/api/payments/notify",
        ...paymentDetails,
        items: "Item Title",
        hash,
      };
  
      console.log("Payment config:", paymentConfig);
      payhere.startPayment(paymentConfig);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  
  // Function to handle "Pay Now" button click
  const handlePayNow = async () => {
    try {
      console.log("Placing order...");
      const Order_Id = await handleConfirmOrder(); // Call order confirmation
      console.log(Order_Id)
      console.log("Initiating payment...");
      await handlePayment(Order_Id); // Call payment processing
    } catch (error) {
      console.error("Error occurred during Pay Now process:", error.message);
    }
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
              <span className="font-semibold">Rs.{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping fee</span>
              <span className="font-semibold">Rs.{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Saved</span>
              <span className="font-semibold text-red-500">
                - Rs.{savedAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="w-full bg-brown-500 text-white py-3 rounded-lg mt-4 hover:bg-brown-600"
              disabled={checkedItems.length === 0}
            >
              Checkout ({checkedItems.length})
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] relative">
            <button
              onClick={() => setIsModalVisible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userProfile.name}
                readOnly
              />
            </div> */}

            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Your Address
              </label>
              <input
                type="text"
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userProfile.address}
                onChange={(e) => handleProfileChange("address", e.target.value)} // Allowing address edit
              />
              <FaPen
                className="absolute top-2 right-2 text-gray-400 cursor-pointer"
                onClick={() => {}} // No longer needed for address change, as it's directly editable
              />
            </div>


            {/* <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userProfile.phone}
                readOnly
              />
            </div> */}

            <div className="mt-4 flex justify-between items-center">
              {/* <button
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button> */}
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={handlePayNow}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CartPage;
