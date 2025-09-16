import React, { useRef } from "react";
import camera from "../assets/camera.svg";
import gallery from "../assets/gallery.svg";
import backbutton from "../assets/back-button.png";
import { useNavigate } from "react-router-dom";

const Scanning = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGalleryClick = () => fileInputRef.current.click();


  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64Image = await fileToBase64(file);
      const cleanBase64 = base64Image.split(",")[1]; 

      
      localStorage.setItem("uploadedImage", cleanBase64);

      
      navigate("/select");
    } catch (err) {
      console.error("File conversion error:", err);
      alert("An error occurred while processing the image.");
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center relative">
      <div className="absolute top-1 left-9 text-left">
        <p className="font-bold text-xs">TO START ANALYSIS</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-32 space-y-10 md:space-y-0">
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"></div>
          <div className="absolute inset-0 flex items-center justify-center mb-20">
            <img
              className="hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              src={camera}
              alt="Camera"
            />
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center md:ml-12">
          <div className="w-[400px] h-[400px] md:w-[450px] md:h-[450px]"></div>
          <div className="absolute inset-0 flex items-center justify-center mb-20">
            <img
              className="hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              src={gallery}
              alt="Gallery"
              onClick={handleGalleryClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[38.5px] md:bottom-8 w-full flex justify-between md:px-9 px-4">
        <button
          className="flex items-center gap-2 text-sm font-semibold"
          onClick={() => navigate("/info")}
        >
          <img src={backbutton} alt="Back" className="w-6 h-6" />
          Back
        </button>
      </div>
    </div>
  );
};

export default Scanning;