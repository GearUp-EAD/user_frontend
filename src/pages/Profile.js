import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const navigateEdit = () => {
    navigate("/profile-edit");
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders");
      setOrders(response.data);

      const details = await axios.get("/api/user/profile");
      setName(details.data.name);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/wishlist");
      setWishlist(response.data);
    } catch (error) {
      console.error(
        "Error fetching wishlist:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "wishlist") fetchWishlist();
  }, [activeTab]);

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
