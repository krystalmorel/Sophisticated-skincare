import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Demographics = () => {

    const [results, setResults] = useState(null);
    const [activeCategory, setActiveCategory] = useState("race");
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("analysisResults");
        if (stored) {
            const parsed = JSON.parse(stored);
            setResults(parsed);

            if (parsed.race) setActiveItem(parsed.race);
        }
    },[]);

    const getConfidenceMap = () => {
        if (activeCategory === "race") return results.confidence?.race || results.confidence || {};
        if (activeCategory === "age") return results.confidence?.age || { [results.age]: 100 };
        if (activeCategory === "sex") return results.confidence?.sex || { [results.sex]: 100 };
        return {};
    };

    const confidenceMap = getConfidenceMap



  return (
    <div className='h-screen md:h-[90vh] flex flex-col md:mt-5'>
      <main className='flex-1 w-full max-w-full mx-5 px-4 md:px-auto flex flex-col'>
        <div className='text-start ml-4 mb-4 md:mb-10 md:ml-0'>
            <h2 className='text-base md:text-base font-semibold mb-1 leading-[24px]'>A.I ANALYSIS</h2>
            <h3 className='text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter'>DEMOGRAPHICS</h3>
            <h4 className='text-sm mt-2 leading-[24]'>PREDICTED RACE & AGE</h4>
        </div>
        <div className='grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0'>
            <div className='bg-white-100 space-y-3 md:flex md:flex-col h-[62%]'>
                <div className={`p-3 cursor-pointer ${
                    activeCategory === "race"
                    ? "bg-[#1A1B1C] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } `}
                onClick={() => {
                    setActiveCategory("race");
                    setActiveItem(results.race);
                }}
                >
                    <p className='text-base font-semibold'>{results.race}</p>
                    <h4 className='text-base font-semibold mb-1'>RACE</h4>
                </div>
                <div className={`p-3 cursor-pointer ${
                    activeCategory === "age"
                    ? "bg-[#1A1B1C] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } `}
                onClick={() => {
                    setActiveCategory("age");
                    setActiveItem(results.age);
                }}
                >
                    <p className='text-base font-semibold'>{results.age}</p>
                    <h4 className='text-base font-semibold mb-1'>AGE</h4>
                </div>
                <div className={`p-3 cursor-pointer ${
                    activeCategory === "sex"
                    ? "bg-[#1A1B1C] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } `}
                onClick={() => {
                    setActiveCategory("sex");
                    setActiveItem(results.sex);
                }}
                >
                    <p className='text-base font-semibold'>{results.sex}</p>
                    <h4 className='text-base font-semibold mb-1'>SEX</h4>
                </div>
            </div>
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center">
            <p className="text-3xl font-normal mb-6 capitalize">
              {activeItem}
            </p>

            <div className="w-[250px] h-[250px]">
              <CircularProgressbar
                value={confidenceMap[activeItem] || 100}
                text={`${confidenceMap[activeItem] || 100}%`}
                strokeWidth={2}
                styles={buildStyles({
                  pathColor: "#1A1B1C",
                  textColor: "#1A1B1C",
                  trailColor: "#E5E5E5",
                })}
              />
            </div>
          </div>

          {/* Right Confidence Table */}
          <div className="bg-white p-4">
            <h4 className="font-semibold mb-2 uppercase">{activeCategory}</h4>
            <ul>
              {Object.entries(confidenceMap).map(([item, value]) => (
                <li
                  key={item}
                  className={`flex justify-between py-2 px-2 cursor-pointer ${
                    activeItem === item
                      ? "bg-[#1A1B1C] text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  <span>{item}</span>
                  <span>{value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demographics
