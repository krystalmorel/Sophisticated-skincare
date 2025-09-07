import React, { useEffect, useRef, useState } from "react";
import border from '../assets/dotted-border.svg';
import backbutton from '../assets/back-button.png';
import { Link } from "react-router-dom";
import axios from "axios";

const Info = () => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [submittedData, setSubmittedData] = useState({ name: "", location: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsSubmitting(true);

    if (step === 1) {
      // Store name locally and move to location step
      setSubmittedData(prev => ({ ...prev, name: inputValue.trim() }));
      localStorage.setItem("name", inputValue.trim());
      setInputValue("");
      setStep(2);
    } else if (step === 2) {
      // Store location and send both name and location together
      const finalData = {
        name: submittedData.name,
        location: inputValue.trim()
      };

      try {
        await axios.post(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          finalData,
          { headers: { "Content-Type": "application/json" } }
        );

        setSubmittedData(prev => ({ ...prev, location: inputValue.trim() }));
        localStorage.setItem("location", inputValue.trim());
        setStep(3); // submission complete
        setInputValue("");
      } catch (err) {
        console.error("Error sending data:", err.response?.data || err);
      }
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const placeholderText =
    step === 1 ? "Introduce Yourself" :
    step === 2 ? "Your city name" :
    "Thanks for submitting!";

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
      {/* Top left instruction */}
      <div className="absolute top-1 left-9 text-left">
        <p className="font-bold text-xs">TO START ANALYSIS</p>
      </div>

      {/* Main input section */}
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>

        {step < 3 && (
          <form className="relative z-10" onSubmit={handleSubmit}>
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder={placeholderText}
              autoComplete="off"
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSubmitting}
              autoFocus
            />
            <button type="submit" className="sr-only">Submit</button>
          </form>
        )}

        {step === 3 && (
          <div className="mt-4">
            <p className="text-lg">Thank you!</p>
            <p>Name: {submittedData.name}</p>
            <p>Location: {submittedData.location}</p>
          </div>
        )}

        {/* Spinning images */}
        <img
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow"
          src={border}
        />
      </div>

      <Link className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13" to="/">
        <img src={backbutton} alt="Back" />
      </Link>
    </div>
  );
};

export default Info;