import React from "react";

const ItemCard = ({ imageUrl, title, description, price }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-lg"
      style={{ width: "217px", height: "327px" }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="pt-4 w-full h-45 object-cover rounded-t-lg"
      />
      <div className="py-4 flex flex-col items-center">
        <h5 className="text-gray-700 text-sm">{title}</h5>
        <p className="text-gray-700 text-sm">{description}</p>
        <p className="text-gray-700 text-sm">Price: ${price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
