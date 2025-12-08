import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image1 from '../assets/Image1.jpg';
import Image2 from '../assets/Image2.jpg';
import Image3 from '../assets/Image3.jpg';
import './CarouselComponent.css';

const CarouselComponent = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/shopping');
  };

  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div className="carousel-slide">
        <div className="carousel-content">
        <h2>Discover the Joy of Shopping with ShopEasy</h2>
        <p>Step into a world of endless possibilities with ShopEasy. From the latest trends to timeless classics, our shopping app brings you the best of everything. Experience unparalleled convenience, exclusive deals, and a user-friendly interface designed to make your shopping journey delightful and memorable. Unleash the joy of shopping today and indulge in the finest products curated just for you.</p>
          <button className="start-shopping-button" onClick={handleStartShopping}>Start Shopping</button>
        </div>
        <img src={Image1} alt="Slide 1" className="carousel-image" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-content">
          <h2>Discover the Joy of Shopping with ShopEasy</h2>
          <p>Step into a world of endless possibilities with ShopEasy. From the latest trends to timeless classics, our shopping app brings you the best of everything. Experience unparalleled convenience, exclusive deals, and a user-friendly interface designed to make your shopping journey delightful and memorable. Unleash the joy of shopping today and indulge in the finest products curated just for you.</p>
          <button className="start-shopping-button" onClick={handleStartShopping}>Start Shopping</button>

        </div>
        <img src={Image2} alt="Slide 2" className="carousel-image" />
      </div>
      <div className="carousel-slide">
        <div className="carousel-content">
        <h2>Discover the Joy of Shopping with ShopEasy</h2>
                <p>Step into a world of endless possibilities with ShopEasy. From the latest trends to timeless classics, our shopping app brings you the best of everything. Experience unparalleled convenience, exclusive deals, and a user-friendly interface designed to make your shopping journey delightful and memorable. Unleash the joy of shopping today and indulge in the finest products curated just for you.</p>

          <button className="start-shopping-button" onClick={handleStartShopping}>Start Shopping</button>

        </div>
        <img src={Image3} alt="Slide 3" className="carousel-image" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
