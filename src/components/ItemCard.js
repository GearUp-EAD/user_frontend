import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ imageUrl, title, description, price }) => {

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg"
      style={{ width: "327px", height: "327px" }}
    >
      <img
        src={imageUrl}
        alt={title}
        className=" w-full h-48 object-cover rounded-t-lg" // Adjusted height here
      />
      <div className="py-4 flex flex-col items-center -mb-6">
        <h5 className="text-gray-700 text-sm">{title}</h5>
        <p className="text-gray-700 text-sm">{description}</p>
        <p className="text-gray-700 text-sm">Price: ${price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
