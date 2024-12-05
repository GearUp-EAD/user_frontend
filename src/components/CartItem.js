import React from "react";

const CartItem = ({
  image,
  name,
  description,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  checked,
  onCheckToggle,
}) => {
  return (
    <div className="flex items-start p-4 border-b border-gray-200">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckToggle}
        className="mr-4 accent-red-500"
      />

      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg mr-4"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-gray-600 mt-2">Price: ${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600">
          Total: ${(price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end ml-4">
        <div className="flex items-center mt-2">
          <button
            onClick={onDecrease}
            className="w-8 h-8 flex justify-center items-center border border-gray-400 rounded-md text-gray-600"
          >
            -
          </button>
          <span className="w-8 h-8 flex justify-center items-center text-lg">
            {quantity}
          </span>
          <button
            onClick={onIncrease}
            className="w-8 h-8 flex justify-center items-center border border-gray-400 rounded-md text-gray-600"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="bg-red-500 text-white text-sm mt-2 py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
