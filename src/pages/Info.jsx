import React, { useEffect, useRef, useState } from "react";
import border from '../assets/dotted-border.svg';
import backbutton from '../assets/back-button.png';
import proceed from '../assets/proceed-button.svg'
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
      setSubmittedData(prev => ({ ...prev, name: inputValue.trim() }));
      localStorage.setItem("name", inputValue.trim());
      setInputValue("");
      setStep(2);
    } else if (step === 2) {
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
        setStep(3); 
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
      <div className="absolute top-1 left-9 text-left">
        <p className="font-bold text-xs">TO START ANALYSIS</p>
      </div>

      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        {step < 3 && !isSubmitting && (
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
        )}

        {step < 3 && !isSubmitting && (
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

        {isSubmitting && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-[#1A1B1C] z-20 flex flex-col items-center">
            <p>Processing submission</p>
            <div className="flex space-x-2 mt-2">
              <span
                className="w-2 h-2 bg-black rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-2 h-2 bg-black rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 bg-black rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </div>
        )}

        {step === 3 && !isSubmitting && (
          <div className="mb-4">
            <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">Thank you!</p>
            <p className="text-lg text-gray-600">Proceed for the next step</p>
          </div>
        )}

        <img
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow"
          src={border}
        />
      </div>

      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <a className="inset-0" aria-label="Back" href="/">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
            </div>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <img src={backbutton} alt="Back" />
            </div>
          </div>
        </a>
        {step === 3 && !isSubmitting && (
          <a className="inline-block" href="/scanning">
            <div style={{ position: "relative", visibility: "visible", opacity: 1 }}>
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">PROCEED</span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <img src={proceed} alt="Proceed" />
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default Info;