import React from "react";

const CoverCard = ({ imageUrl, name }) => {
  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg"
      style={{ width: "217px", height: "250px" }}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default CoverCard;
