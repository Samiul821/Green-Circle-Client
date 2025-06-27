import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaLeaf } from "react-icons/fa";
import { GiFlowerPot, GiWaterDrop, GiTreeBranch } from "react-icons/gi";

const CustomSlider = () => {
  return (
    <div className="w-full max-w-[500px] px-4 sm:px-8">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          pauseOnHover: true,
          interval: 4000,
          arrows: false,
        }}
      >
        {[...Array(4)].map((_, index) => {
          const slides = [
            [
              "https://i.ibb.co/Fk9PdmZt/download-26.jpg",
              "https://i.ibb.co/LX5Qgfcr/images-12.jpg",
              "https://i.ibb.co/XfH2r6kn/male-hands-cutting-bushes-with-big-scissors.jpg",
            ],
            [
              "https://i.ibb.co/1GdpdzWn/images-13.jpg",
              "https://i.ibb.co/ycmLjmBn/images-14.jpg",
              "https://i.ibb.co/8gKrQVRj/images-15.jpg",
            ],
            [
              "https://i.ibb.co/gMZ55j40/download-27.jpg",
              "https://i.ibb.co/C53Z7pt1/download-28.jpg",
              "https://i.ibb.co/N6qY9Y8h/images-16.jpg",
            ],
            [
              "https://i.ibb.co/spP6rPrb/images-18.jpg",
              "https://i.ibb.co/MyLLKrDt/images-17.jpg",
              "https://i.ibb.co/WpHKS008/premium-photo-1680286739871-01142bc609df.jpg",
            ],
          ];

          return (
            <SplideSlide key={index}>
              <div className="relative w-full h-[340px] sm:h-[380px] flex justify-center items-center">
                {/* Icons */}
                <FaLeaf className="absolute top-2 left-4 text-green-600 text-xl" />
                <GiFlowerPot className="absolute top-2 right-4 text-green-600 text-xl" />
                <GiWaterDrop className="absolute bottom-16 left-4 text-green-600 text-xl" />
                <GiTreeBranch className="absolute bottom-8 right-6 text-green-600 text-xl" />

                {/* Images */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] top-0 left-1/2 transform -translate-x-1/2 rounded-full overflow-hidden shadow-lg border-4 border-white z-30">
                    <img src={slides[index][0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] bottom-10 left-10 rounded-full overflow-hidden shadow-lg border-4 border-white z-20">
                    <img src={slides[index][1]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bottom-0 right-8 rounded-full overflow-hidden shadow-lg border-4 border-white z-10">
                    <img src={slides[index][2]} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default CustomSlider;
