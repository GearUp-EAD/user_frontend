import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/image1.jpeg";
import image2 from "../assets/images/image2.jpeg";
import image3 from "../assets/images/image3.jpeg";
import image4 from "../assets/images/image4.jpeg";
import image5 from "../assets/images/image5.jpeg";
import image6 from "../assets/images/image6.jpeg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import CoverCard from "../components/CoverCard";

const   Home = () => {
  const navigate = useNavigate();

  const image = "https://via.placeholder.com/150";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of slides visible
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const items = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150",
      title: "Item 1",
      description: "Description of Item 1",
      price: 100,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      title: "Item 2",
      description: "Description of Item 2",
      price: 120,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      title: "Item 3",
      description: "Description of Item 3",
      price: 150,
    },
    // Add more items as needed
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-4">
        <Header />
      </div>
      {/* Image Carousel */}
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          <div>
            <img
              src={image1}
              alt="Image 1"
              className="h-100 w-full object-cover"
            />
          </div>
          <div>
            <img
              src={image2}
              alt="Image 2"
              className="h-100 w-full object-cover "
            />
          </div>
          <div>
            <img
              src={image4}
              alt="Image 3"
              className="h-100 w-full object-cover "
            />
          </div>
          <div>
            <img
              src={image3}
              alt="Image 4"
              className="h-100 w-full object-cover "
            />
          </div>
          <div>
            <img
              src={image5}
              alt="Image 5"
              className="h-100 w-full object-cover "
            />
          </div>
          <div>
            <img
              src={image6}
              alt="Image 6"
              className="h-100 w-full object-cover "
            />
          </div>
        </Slider>
      </div>
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Your Ultimate Sports Gear Destination!
        </h1>
        <p className="mt-4 text-gray-600 text-center mx-auto max-w-2xl">
          Discover premium sportswear, footwear, and equipment for every
          athlete. Whether you’re training, competing, or exploring, find
          everything you need to reach your peak. Shop top brands, score
          exclusive deals, and get ready to conquer your game.
        </p>
        <p className="mt-2 text-center text-xl font-semibold">
          <span style={{ color: "rgba(84, 51, 16, 1)" }}>Shop. Play.</span>{" "}
          <span style={{ color: "#AF8F6F" }}>Achieve.</span>
        </p>

        <button className="mt-6 px-6 py-2 bg-brown-500 text-white font-semibold rounded hover:bg-brown-600">
          Shop Now
        </button>
      </div>{" "}
      <div className="text-4xl font-bold text-gray-800 mb-4 mx-10">
        New Arrival
      </div>
      <div className="flex overflow-x-auto space-x-4 py-4 mx-10">
        {items.map((item) => (
          <ItemCard
            key={item.id} // Use unique id as key
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
      <div className="flex justify-center items-center h-full mt-14 mb-14">
        <button
          className="px-8 py-4 bg-brown-500 text-white font-semibold text-lg rounded hover:bg-brown-600 mb-4"
          onClick={() => navigate("../contact-us")}
        >
          Contact Us
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
