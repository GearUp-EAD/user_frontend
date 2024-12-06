import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [address, setAddress] = useState("123 Main Street, Springfield");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dummyOrders = [
    {
      id: "001",
      date: "2024-11-20T14:35:00Z",
      status: "Delivered",
      items: [
        { name: "Wireless Mouse", quantity: 1, price: 25.99 },
        { name: "Keyboard", quantity: 1, price: 49.99 },
      ],
      totalAmount: 75.98,
    },
    {
      id: "002",
      date: "2024-11-22T09:10:00Z",
      status: "Shipped",
      items: [
        { name: "Bluetooth Headphones", quantity: 1, price: 89.99 },
      ],
      totalAmount: 89.99,
    },
    {
      id: "003",
      date: "2024-12-01T18:30:00Z",
      status: "Processing",
      items: [
        { name: "Laptop Stand", quantity: 1, price: 35.99 },
        { name: "USB Cable", quantity: 2, price: 5.99 },
      ],
      totalAmount: 47.97,
    },
    {
      id: "004",
      date: "2024-12-02T10:45:00Z",
      status: "Delivered",
      items: [
        { name: "Smartphone Case", quantity: 2, price: 19.99 },
      ],
      totalAmount: 39.98,
    },
  ];

  const fetchOrders = () => {
    // Simulating API call with dummy data
    setOrders(dummyOrders);
  };

  const fetchWishlist = () => {
    // Simulating API call with dummy data (empty for now)
    setWishlist([]);
  };

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "wishlist") fetchWishlist();
  }, [activeTab]);

  const navigateEdit = () => {
    navigate("/profile-edit");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/150?text=Profile+Icon"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-[#b08254]"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <p className="text-gray-600">{email}</p>
              <p className="text-gray-600">{address}</p>
              <p className="text-gray-600">{phone}</p>
            </div>
          </div>
          <button
            className="px-4 py-1 bg-[#74512D] text-white rounded-md"
            onClick={navigateEdit}
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "orders"
                  ? "text-[#74512D] border-b-2 border-[#74512D]"
                  : "text-gray-600"
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "wishlist"
                  ? "text-[#74512D] border-b-2 border-[#74512D]"
                  : "text-gray-600"
              }`}
            >
              Wishlist
            </button>
          </div>
        </div>

        <div className="mt-6">
          {loading && <p className="text-gray-500">Loading...</p>}

          {activeTab === "orders" && !loading && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Order History
              </h3>
              {orders.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {orders.map((order) => (
                    <li
                      key={order.id}
                      className="p-4 bg-gray-50 rounded-lg shadow flex justify-between"
                    >
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">
                          Placed on: {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status: {order.status}
                        </p>
                      </div>
                      <button className="px-4 py-2 text-black text-12px">
                        {order.status === "Delivered"
                          ? "View Details→"
                          : "Track Order"}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-4">No orders found.</p>
              )}
            </div>
          )}

          {activeTab === "wishlist" && !loading && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
              {wishlist.length > 0 ? (
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <li
                      key={item.id}
                      className="bg-gray-50 rounded-lg shadow p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <h4 className="mt-2 font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price}</p>
                      <button className="mt-2 px-4 py-1 bg-[#74512D] text-white rounded-md">
                        Add to Cart
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-4">Your wishlist is empty.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
