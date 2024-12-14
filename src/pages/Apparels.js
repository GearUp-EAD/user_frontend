import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import CoverCard from "../components/CoverCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import image1 from "../assets/images/Apparels/Compression Wear.jpg";
import image2 from "../assets/images/Apparels/Jackets & Hoodies.jpg";
import image3 from "../assets/images/Apparels/Shorts.jpg";
import image4 from "../assets/images/Apparels/Swimwear.jpg";
import image5 from "../assets/images/Apparels/T-shirts & Jerseys.jpg";

const categories = [
  { id: "0a18d3f7-7f18-4d61-bff0-4fecb75475a8", name: "Compression Wear", imageUrl: image1 },
  { id: "6e55c2ff-cd44-44a1-b57d-92bc91b64f69", name: "Jackets & Hoodies", imageUrl: image2 },
  { id: "1a297e80-9ec4-448c-a51a-fc06f2daf202", name: "Shorts", imageUrl: image3 },
  { id: "61c57393-b969-4e1c-b4a1-7354c5edcf9a", name: "Swimwear", imageUrl: image4 },
  { id: "59f4e609-383b-4c43-b691-9676e3f0ac2b", name: "T-shirts & Jerseys", imageUrl: image5 },
];

const Apparels = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  useEffect(() => {
    fetchItems(categories[0].id); // Load default category on mount
  }, []);

  const fetchItems = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products?categoryId=${categoryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    fetchItems(categoryId); // Fetch items on category click
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-4">
        <Header />
      </div>
      <div className="p-6">
        {/* Category Display */}
        <div className="flex justify-center gap-4 mb-6">
          {categories.map((category) => (
            <CoverCard
              key={category.id}
              imageUrl={category.imageUrl}
              name={category.name}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center mt-20 mb-10">
          <div className="flex-grow border-t border-brown-500"></div>
          <div className="text-3xl font-bold text-gray-800 mx-4">Available Items</div>
          <div className="flex-grow border-t border-brown-500"></div>
        </div>

        {/* Items Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/product-item/${item.productId}`)}
            >
              <ItemCard
                imageUrl={item.imageUrl}
                title={item.name}
                description={item.description}
                price={item.basePrice}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apparels;
