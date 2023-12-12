// Featured.js

import React, { useState, useEffect } from 'react';
import image1 from '../images/image1.jfif';
import image2 from '../images/imag2.jfif';
import image3 from '../images/image3.jfif';
import image4 from '../images/image4.jfif';
import image5 from '../images/image5.jfif';

const Featured = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      image: image1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 2000,
    },
    {
      image: image2,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 4000,
    },
    {
      image: image3,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 7000,
    },
    {
      image: image4,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 1000,
    },
    {
      image: image5,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 14000,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <>
      <h1 className="text-2xl text-center text-white bg-black">
        Featured Vehicle
      </h1>
      <div className="relative p-5 flex bg-black items-center">
        <div className="w-1/2">
          <img
            src={images[currentImage].image}
            alt={`Featured ${currentImage + 1}`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Half - Description and Price Card */}
        <div className="w-1/2 max-w-md mx-auto p-4 border border-gray-300 text-white">
          <h2 className="text-xl font-semibold mb-2">Car Information</h2>
          <p>{images[currentImage].description}</p>
          <p className="text-xl mt-4">${images[currentImage].price}</p>
        </div>
      </div>
    </>
  );
};

export default Featured;
