import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Select = () => {
  const navigate = useNavigate();

  const handleDemographicsClick = async () => {
    const storedBase64 = localStorage.getItem("uploadedImage"); 
    if (!storedBase64) {
      alert("No image found. Please upload again.");
      return;
    }

    try {
      const res = await axios.post(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        { image: storedBase64 },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        localStorage.setItem("analysisResults", JSON.stringify(res.data.data));
        navigate("/demographics");
      } else {
        alert("API Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Something went wrong while analyzing.");
    }
  };

  return (
    <>
      <div className="absolute top-10 left-8 text-left mt-5">
        <h1 className="text-base font-semibold leading-[24px] tracking-tight">
          A.I ANALYSIS
        </h1>
        <p className="text-sm mt-1 text-muted-foreground uppercase leading-[24px]">
          A.I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-3 grid-rows-3">
            <div className="flex items-center justify-center col-start-2 row-start-1">
              <button
                onClick={handleDemographicsClick}
                className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
              >
                <span className="transform -rotate-45">Demographics</span>
              </button>
            </div>

            <div className="flex items-center justify-center col-start-1 row-start-2">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Cosmetic Concerns</span>
              </button>
            </div>

            <div className="flex items-center justify-center col-start-3 row-start-2">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Skin Type Details</span>
              </button>
            </div>

            <div className="flex items-center justify-center col-start-2 row-start-3">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Select;