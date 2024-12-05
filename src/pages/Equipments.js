import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import CoverCard from "../components/CoverCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import image1 from "../assets/images/Equipments/Balls.jpg";
import image2 from "../assets/images/Equipments/Bags and Bottles.jpg";
import image3 from "../assets/images/Equipments/Fitness and Gym.jpg";
import image4 from "../assets/images/Equipments/Rackets and Bats.jpg";
import image5 from "../assets/images/Equipments/Protective Gear.jpg";

const Equipment = () => {

  const navigate = useNavigate();

  const categories = [
    { id: "a6bec2cf-511a-4fb0-a588-db251d6e68f3", name: "Balls", imageUrl: image1 },
    { id: "044b3f97-23f4-497d-b325-b7dbc20fa08c", name: "Bags and Bottles", imageUrl: image2 },
    { id: "7b566af0-753b-4334-82e4-524d4933e4a3", name: "Fitness and Gym", imageUrl: image3 },
    { id: "be20330b-bfdd-463c-ac1d-0e849b79ee43", name: "Rackets and Bats", imageUrl: image4 },
    { id: "63bc7d14-e09f-4996-9210-6c5e611a98df", name: "Protective Gear", imageUrl: image5 },
  ];

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryClick = (categoryId) => {
    const selectedCategoryName = categories.find((category) => category.id === categoryId)?.name;
    setSelectedCategory(selectedCategoryName);
    setActiveCategory(categoryId); // Keep track of active category for hover effect
  };
  
  const filteredItems = selectedCategory 
      ? items.filter((item) => item.categoryName === selectedCategory)
      : items;

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
              isActive={activeCategory === category.id} // Check if active
              onClick={() => handleCategoryClick(category.id)} // Handle click
            />
          ))}
        </div>

        <div className="text-2xl font-bold text-gray-800 mt-6 text-center">
          Available Items
        </div>

        {/* Items Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/product-item/${item.productId}`)} // Navigate with productId
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

export default Equipment;
