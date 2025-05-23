import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    speed: 1200,
    cssEase: "ease-in-out",
    arrows: false,
  };

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/slides")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[520px] lg:h-[620px] mb-12 rounded-xl overflow-hidden shadow-xl">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide._id}>
            <div
              className="
                relative 
                w-full 
                h-[400px] md:h-[520px] lg:h-[620px] 
                rounded-xl 
                overflow-hidden
                transition-transform duration-500 ease-in-out
                hover:scale-[1.02] hover:shadow-2xl
                cursor-pointer
              "
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                filter: "brightness(0.65) saturate(1.1)",
              }}
            >
              {/* Overlay with blur */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6 md:px-16 lg:px-24">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white text-base md:text-lg max-w-3xl mb-10 drop-shadow-md leading-relaxed tracking-wide">
                  {slide.description}
                </p>
                <button className="
                  bg-gradient-to-r from-green-400 to-green-600 
                  text-white 
                  font-semibold 
                  py-3 px-8 
                  rounded-full 
                  shadow-lg 
                  hover:from-green-500 hover:to-green-700 
                  transition-all duration-300
                  active:scale-95
                ">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
