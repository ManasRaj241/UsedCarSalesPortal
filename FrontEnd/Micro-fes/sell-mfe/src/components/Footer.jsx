import React from 'react';

const Footer = () => {
  const imgAlt = 'Image Alt Text';

  return (
    <div className="bg-black text-gray-700 font-sans text-base">
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-white text-xl font-bold mb-4">
              Download Our App
            </h3>
            <p className="text-gray-500">
              Download App for Android and iOS mobile phone.
            </p>
            <div className="flex mt-4">
              <img
                className="w-16 mr-4"
                src={`/images/play-store.png`}
                alt={imgAlt}
              />
              <img
                className="w-16"
                src={`/images/app-store.png`}
                alt={imgAlt}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <img
              className="w-32 mb-4 mx-auto"
              src={`/images/logo.png`}
              alt={imgAlt}
            />
            <p className="text-gray-500 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, maiores exercitationem fugit nemo placeat
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-white text-xl font-bold mb-4">Useful Links</h3>
            <ul className="text-gray-500">
              <li>Coupons</li>
              <li>Blog Post</li>
              <li>Return Policy</li>
              <li>Join Affiliate</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="text-white text-xl font-bold mb-4">Follow Us</h3>
            <ul className="text-gray-500">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Youtube</li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-600 my-8" />
        <p className="text-center text-gray-500">
          Copyright 2023 - Manas Ranjan Satapathy
        </p>
      </div>
    </div>
  );
};

export default Footer;