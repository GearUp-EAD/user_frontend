import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [address, setAddress] = useState("123 Main Street, Springfield");
  const [phone, setPhone] = useState("+1 234 567 890");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/orders/customer/f838e2bf-ee6e-4d51-afc2-c0f928d6698b"
      );
      console.log(response);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/orderItems/${orderId}`
      );
      setOrderItems(response.data); // Assuming the API returns an array of order items
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const openPopup = (orderId) => {
    setSelectedOrder(orderId);
    fetchOrderItems(orderId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setOrderItems([]);
  };

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
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
        </div>

        <div className="mt-6">
          {loading && <p className="text-gray-500">Loading...</p>}

          {activeTab === "orders" && !loading && (
            <div>
              {orders.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {orders.map((order) => (
                    <li
                      key={order.orderID}
                      className="p-4 bg-gray-50 rounded-lg shadow flex justify-between"
                    >
                      <div>
                        <h4 className="font-semibold">Order #{order.orderID}</h4>
                        <p className="text-sm text-gray-600">
                          Placed on: {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                        <p className="text-sm text-gray-600">Total Amount: {order.totalAmount}</p>
                      </div>
                      <button
                        onClick={() => openPopup(order.orderID)}
                        className="px-4 py-2 text-black text-12px"
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-4">No orders found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup for order items */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Order #{selectedOrder} Details</h3>
            <ul className="space-y-2">
              {orderItems.map((item) => (
                <li key={item.orderItemID} className="flex justify-between">
                  <span className="font-medium">Product Variant ID:</span>
                  <span>{item.productVariantId}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-[#74512D] text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
