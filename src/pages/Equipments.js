import React, { useState } from "react";
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
  const categories = [
    {
      id: "cat1",
      name: "Balls",
      imageUrl: image1,
    },
    {
      id: "cat2",
      name: "Bags and Bottles",
      imageUrl: image2,
    },
    {
      id: "cat3",
      name: "Fitness and Gym",
      imageUrl: image3,
    },
    {
      id: "cat4",
      name: "Rackets and Bats",
      imageUrl: image4,
    },
    {
      id: "cat5",
      name: "Protective Gear",
      imageUrl: image5,
    },
  ];

  const items = [
    {
      id: 1,
      title: "Item 1",
      description: "Description 1",
      price: 100,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat1",
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description 2",
      price: 200,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat2",
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description 3",
      price: 300,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat3",
    },
    {
      id: 4,
      title: "Item 4",
      description: "Description 4",
      price: 400,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat4",
    },
    {
      id: 5,
      title: "Item 5",
      description: "Description 5",
      price: 500,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat5",
    },
    {
      id: 6,
      title: "Item 6",
      description: "Description 6",
      price: 600,
      imageUrl: "https://via.placeholder.com/150",
      categoryId: "cat1",
    },
    // Add more items as needed
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.categoryId === selectedCategory)
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
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer"
            >
              <CoverCard imageUrl={category.imageUrl} name={category.name} />
            </div>
          ))}
        </div>

        <div className="text-2xl font-bold text-gray-800 mt-6 mx-10">
          Available Items
        </div>

        {/* Items Display */}
        <div className="flex overflow-x-auto space-x-4 py-4 mx-10">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Equipment;
