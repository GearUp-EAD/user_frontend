import React from "react";

const CoverCard = ({ imageUrl, name, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative group overflow-hidden rounded-lg shadow-lg cursor-pointer ${
        isActive ? "active" : ""
      }`}
      style={{ width: "217px", height: "327px" }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <p className="text-white text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default CoverCard;
