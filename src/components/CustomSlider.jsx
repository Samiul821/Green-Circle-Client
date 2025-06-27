import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FaLeaf } from "react-icons/fa";
import { GiFlowerPot, GiWaterDrop, GiTreeBranch } from "react-icons/gi";

const CustomSlider = () => {
  return (
    <div className="w-full md:w-1/2 mx-auto px-2">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          pauseOnHover: true,
          interval: 4000,
        }}
      >
        {/* ===== Slide 1 ===== */}
        <SplideSlide>
          <div className="relative w-full flex justify-center items-center">
            <FaLeaf
              size={24}
              className="absolute top-2 left-4 sm:left-20 text-green-600"
            />
            <GiFlowerPot
              size={24}
              className="absolute top-2 right-4 sm:right-10 text-green-600"
            />
            <GiWaterDrop
              size={24}
              className="absolute bottom-20 left-4 sm:left-12 text-green-600"
            />
            <GiTreeBranch
              size={24}
              className="absolute bottom-10 right-4 sm:right-14 text-green-600"
            />

            <div className="relative min-w-[260px] min-h-[260px] sm:min-w-[380px] sm:min-h-[380px]">
              <img
                src="https://i.ibb.co/Fk9PdmZt/download-26.jpg"
                alt="Gardening"
                className="rounded-full border-4 border-white shadow-lg w-32 sm:w-[220px] h-32 sm:h-[220px] object-cover absolute top-0 left-1/2 transform -translate-x-1/2"
              />
              <img
                src="https://i.ibb.co/LX5Qgfcr/images-12.jpg"
                alt="Gardening"
                className="rounded-full border-4 border-white shadow-lg w-28 sm:w-[200px] h-28 sm:h-[200px] object-cover absolute top-28 left-[40%]"
              />
              <img
                src="https://i.ibb.co/XfH2r6kn/male-hands-cutting-bushes-with-big-scissors.jpg"
                alt="Gardening"
                className="rounded-full border-4 border-white shadow-lg w-24 sm:w-[180px] h-24 sm:h-[180px] object-cover absolute top-[60%] left-4"
              />
            </div>
          </div>
        </SplideSlide>

        {/* ===== More Slides (same responsive approach) ===== */}
        {/* Just copy the structure above and replace image URLs like before */}
      </Splide>
    </div>
  );
};

export default CustomSlider;
