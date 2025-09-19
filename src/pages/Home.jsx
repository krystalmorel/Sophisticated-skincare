import React, { useState } from "react";
import discover from "../assets/discover-button.svg";
import taketest from "../assets/take-test.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="max-sm:scale-75 max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2">

       
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>

        
        <div
          id="main-heading"
          className={`relative z-10 text-center transition-all duration-700 ${
            hovered === "test"
              ? "lg:-translate-x-40"
              : hovered === "discover"
              ? "lg:translate-x-40"
              : ""
          }`}
        >
          <h1 className="text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none">
            Sophisticated
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>

        <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-[#1a1b1c83]">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>

        <div className="z-10 mt-4 lg:hidden">
          <a href="/info">
            <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
              <span className="text-[12px] font-bold cursor-pointer">
                ENTER EXPERIENCE
              </span>
              <div className="w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer"></div>
              <span className="absolute left-[126px] scale-[0.5] hover:scale-[0.6] duration-300">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-current text-black"
                >
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              </span>
            </button>
          </a>
        </div>

        <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalized routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>

        <div
          id="left-section"
          className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-all duration-500 ${
            hovered === "test" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
            <button
              id="discover-button"
              onMouseEnter={() => setHovered("discover")}
              onMouseLeave={() => setHovered(null)}
              className="group inline-flex items-center justify-center gap-4 text-sm font-normal text-[#1A1B1C] cursor-pointer h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5"
            >
              <img src={discover} alt="Discover AI" />
            </button>
          </div>
        </div>

        <div
          id="right-section"
          className={`hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-all duration-500 ${
            hovered === "discover" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
            <Link
              to="/info"
              onMouseEnter={() => setHovered("test")}
              onMouseLeave={() => setHovered(null)}
              className="group inline-flex items-center justify-center gap-4 text-sm font-normal text-[#1A1B1C] cursor-pointer h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5"
            >
              <img src={taketest} alt="Take Test" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
