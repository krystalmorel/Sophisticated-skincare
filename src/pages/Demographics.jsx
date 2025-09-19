import React, { useEffect, useState } from "react";
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

      const pickTopItem = (obj) =>
        obj && Object.keys(obj).length > 0
          ? Object.entries(obj).sort(([, a], [, b]) => b - a)[0][0]
          : null;

      if (parsed.race) {
        setActiveCategory("race");
        setActiveItem(pickTopItem(parsed.race));
      } else if (parsed.age) {
        setActiveCategory("age");
        setActiveItem(pickTopItem(parsed.age));
      } else if (parsed.gender) {
        setActiveCategory("gender");
        setActiveItem(pickTopItem(parsed.gender));
      }
    }
  }, []);

  const getConfidenceMap = () => {
    if (!results) return {};
    switch (activeCategory) {
      case "race":
        return results.race || {};
      case "age":
        return results.age || {};
      case "gender":
        return results.gender || {};
      default:
        return {};
    }
  };

  const confidenceMap = getConfidenceMap();
  const sortedEntries = Object.entries(confidenceMap).sort(
    ([, a], [, b]) => b - a
  );
  const activeConfidence = (confidenceMap[activeItem] || 0) * 100;

  if (!results) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">
          No demographics data found. Please upload an image.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5">
      <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
          
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base md:text-base font-semibold mb-1 leading-[24px]">
              A.I. ANALYSIS
            </h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE & AGE</h4>
          </div>

          <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
        
            <div className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
              {["race", "age", "gender"].map((cat) => {
                const current = results[cat];
                const topPrediction =
                activeCategory === cat && activeItem
                ? activeItem
                 : current && Object.keys(current).length > 0
                    ? Object.entries(current).sort(([, a], [, b]) => b - a)[0][0]
                    : "N/A";
                const isActive = activeCategory === cat;

                return (
                  <div
                    key={cat}
                    className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t ${
                      isActive
                        ? "bg-[#1A1B1C] text-white"
                        : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
                    }`}
                    onClick={() => {
                      setActiveCategory(cat);
                      if (current && Object.keys(current).length > 0) {
                        const topItem = Object.entries(current).sort(
                          ([, a], [, b]) => b - a
                        )[0][0];
                        setActiveItem(topItem);
                      } else {
                        setActiveItem(null);
                      }
                    }}
                  >
                    <p className="text-base font-semibold capitalize">
                      {topPrediction}
                    </p>
                    <h4 className="text-base font-semibold mb-1 uppercase">
                      {cat}
                    </h4>
                  </div>
                );
              })}
            </div>

            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
                {activeItem || "N/A"}
              </p>
              <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                <CircularProgressbar
                  value={activeConfidence}
                  text={`${Math.round(activeConfidence)}%`}
                  strokeWidth={1.7}
                  styles={buildStyles({
                    pathColor: "#1A1B1C",
                    textColor: "#1A1B1C",
                    trailColor: "#ddd",
                    textSize: "18px",
                  })}
                />
              </div>
              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            <div className="bg-gray-100 pt-4 pb-4 md:border-t">
              <div className="space-y-0">
                <div className="flex justify-between px-4">
                  <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                    {activeCategory.toUpperCase()}
                  </h4>
                  <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                    A.I. CONFIDENCE
                  </h4>
                </div>
                {sortedEntries.map(([item, value]) => (
                  <div
                    key={item}
                    className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${
                      activeItem === item
                        ? "bg-[#1A1B1C] text-white"
                        : "hover:bg-[#E1E1E2]"
                    }`}
                    onClick={() => {setActiveItem(item);
                      const categoryOfItem = Object.keys(results).find(
                        (cat) => results[cat][item] !== undefined
                      )
                      setActiveCategory(categoryOfItem);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-normal text-base leading-6 tracking-tight capitalize">
                        {item}
                      </span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">
                      {Math.round(value * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
  <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
    {/* Back */}
    <a href="/select" className="relative">
      <div className="sm:hidden flex items-center justify-center w-12 h-12 border border-black rotate-45">
        <span className="rotate-[-45deg] text-xs font-semibold">BACK</span>
      </div>
      <div className="hidden sm:flex flex-row items-center justify-center relative group">
        <div className="w-12 h-12 border border-black rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
        <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 group-hover:scale-[0.92]">▶</span>
        <span className="text-sm font-semibold ml-6">BACK</span>
      </div>
    </a>

    {/* Home */}
    <a href="/" className="relative">
      <div className="sm:hidden flex items-center justify-center w-12 h-12 border border-black rotate-45">
        <span className="rotate-[-45deg] text-xs font-semibold">HOME</span>
      </div>
      <div className="hidden sm:flex flex-row items-center justify-center relative group">
        <span className="text-sm font-semibold mr-5">HOME</span>
        <div className="w-12 h-12 border border-black rotate-45 scale-[0.85]"></div>
        <span className="absolute right-[15px] bottom-[13px] scale-[0.9]">▶</span>
      </div>
    </a>
  </div>
</div>
        </div>
      </main>
    </div>
  );
};

export default Demographics;