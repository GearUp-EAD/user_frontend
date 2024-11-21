import React, { useState } from "react";
import Contact from "../components/Contact";
import CoverCard from "../components/CoverCard";
import Balls from "../assets/img/balls.jpeg";
import ItemCard from "../components/ItemCard";
import basketBall from "../assets/img/basketBall.jpeg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsVisible(true)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Open Contact Form
      </button>
      <Contact isVisible={isVisible} setIsVisible={setIsVisible} />

      <CoverCard imageUrl={Balls} name="Balls" />
      <ItemCard
        imageUrl={basketBall}
        title="Molten"
        description="BasketBall"
        price="28.00"
      />
    </div>
  );
};

export default Home;
