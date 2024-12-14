import React, { useState, useEffect } from "react";
import keycloak from "keycloak-js"; // Assuming keycloak-js is already initialized

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState(""); // Address field
  const [loading, setLoading] = useState(true);

  const defaultProfileIcon =
    "https://via.placeholder.com/150?text=Profile+Icon"; // Default profile icon

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if the user is authenticated
        if (!keycloak.authenticated) {
          console.error("User is not authenticated");
          setLoading(false);
          return;
        }

        // Retrieve user details from Keycloak token
        const userInfo = keycloak.tokenParsed;
        console.log(userInfo); // Log to inspect the structure

        // Set user details into state
        setProfileImage(defaultProfileIcon); // Keycloak doesn't provide an image URL by default
        setName(userInfo?.preferred_username || userInfo?.name || ""); // Use Keycloak username or name
        setEmail(userInfo?.email || ""); // Email from Keycloak

        // Handle custom claims for address if available
        const userAddress = userInfo?.address || ""; // Check if 'address' exists in Keycloak token
        setAddress(userAddress); // Default empty if not present in Keycloak

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty array ensures the effect only runs once on mount

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Update profile image state with selected file
      };
      reader.readAsDataURL(file); // Convert the image to base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example: Update to backend if needed
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileImage,
          name,
          email,
          password: password.includes("*") ? undefined : password, // Conditionally send password
          newPassword,
          address,
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={profileImage || defaultProfileIcon}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <label
                htmlFor="profileImage"
                className="px-4 py-2 bg-[#74512D] text-white rounded-lg shadow cursor-pointer hover:bg-blue-600"
              >
                Change Image
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <p className="text-gray-600">{address}</p>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#74512D] text-white rounded-lg shadow hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
