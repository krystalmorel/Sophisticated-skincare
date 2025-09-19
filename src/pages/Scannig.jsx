import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import camera from "../assets/camera.svg";
import gallery from "../assets/gallery.svg";
import backbutton from "../assets/back-button.png";
import takePictureIcon from "../assets/takePictureIcon.svg"; // add your icon
import { useNavigate } from "react-router-dom";
import loading_camera from "../assets/loading-camera.svg"

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Scanning = () => {
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [showWebcam, setShowWebcam] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showWebcam && !capturedImage) {
      setWebcamReady(false); 
      const timer = setTimeout(() => {
        setWebcamReady(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showWebcam, capturedImage]);

  const handleGalleryClick = () => fileInputRef.current.click();
  const handleCameraClick = () => setShowPermissionModal(true);

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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setCapturedImage(imageSrc);
  }, []);

  const usePhoto = () => {
    setLoading(true);

    const cleanBase64 = capturedImage.split(",")[1];
    localStorage.setItem("uploadedImage", cleanBase64);


     setTimeout(() => {
    setLoading(false);
    navigate("/select");
  }, 2000); 
  };

  return (
    <div className="h-[90vh] w-screen relative bg-white">
      {showPermissionModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-[#1A1B1C] w-[352px] pt-4 pb-2 shadow-lg">
            <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="flex mt-4 border-t border-[#FCFCFC] pt-2 justify-end space-x-4 px-4">
              <button
                className="px-7 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500"
                onClick={() => setShowPermissionModal(false)}
              >
                DENY
              </button>
              <button
                className="px-5 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300"
                onClick={() => {
                  setShowPermissionModal(false);
                  setShowWebcam(true);
                }}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

     {showWebcam && !capturedImage && (
  <div className="relative h-[92vh] w-screen overflow-hidden bg-gray-900">

    {!webcamReady && (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
    <div className="relative flex items-center justify-center">
      <img
        src={loading_camera}
        alt="Loading Camera"
        className="w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[650px] lg:h-[650px] object-contain"
      />
      <p className="absolute text-black font-semibold text-center text-sm sm:text-base md:text-lg mt-35">
        SETTING UP CAMERA ...
      </p>
    </div>

    <div className="mb-30 text-center text-xs text-gray-600 space-y-2">
      <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
      <div className="flex justify-center space-x-4">
        <p>◇ NEUTRAL EXPRESSION</p>
        <p>◇ FRONTAL POSE</p>
        <p>◇ ADEQUATE LIGHTING</p>
      </div>
    </div>
  </div>
)}

    <Webcam
      ref={webcamRef}
      audio={false}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
      className={`absolute inset-0 w-full h-full object-cover z-10 ${
        webcamReady ? "block" : "hidden"
      }`}
    />

    {webcamReady && (
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
        <img
          src={takePictureIcon}
          alt="Take Picture"
          className="w-16 h-16 md:w-[150px] md:h-[150px] cursor-pointer"
          onClick={capture}
        />
      </div>
    )}

    {webcamReady && (
      <div className="absolute bottom-30 sm:bottom-40 left-0 right-0 text-center z-20">
        <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC]">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <div className="flex justify-center space-x-8 text-xs leading-6 text-[#FCFCFC]">
          <p>◇ NEUTRAL EXPRESSION</p>
          <p>◇ FRONTAL POSE</p>
          <p>◇ ADEQUATE LIGHTING</p>
        </div>
      </div>
    )}

    <div
      className="absolute md:bottom-8 bottom-60 left-8 z-20 cursor-pointer"
      onClick={() => setShowWebcam(false)}
    >
      <img src={backbutton} alt="Back" className="w-6 h-6" />
    </div>
  </div>
)}


      {capturedImage && (
  <div className="absolute inset-0 z-10 flex flex-col items-center">
    <img
      src={capturedImage}
      alt="Captured selfie"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {loading && (
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#FCFCFC] opacity-70 p-6 rounded-lg shadow-lg text-center">
          <p className="text-xl animate-pulse">ANALYZING IMAGE...</p>
          <div className="flex items-center justify-center space-x-4 py-8">
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
          </div>
        </div>
      </div>
    )}

    <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
      <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
        Preview
      </h2>
      <div className="flex justify-center space-x-6">
        <button
          className="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
          onClick={() => !loading && setCapturedImage(null)} 
          disabled={loading}
        >
          Retake
        </button>
        <button
          className={`px-6 py-2 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#1A1B1C] hover:bg-gray-800"
          } text-[#FCFCFC] shadow-md text-sm`}
          onClick={!loading ? usePhoto : undefined}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Use This Photo"}
        </button>
      </div>
    </div>
  </div>
)}
      {!showWebcam && !capturedImage && (
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-32 space-y-10 md:space-y-0 h-full">
          <div className="relative flex flex-col items-center justify-center">
            <div className="w-76 h-76 sm:w-64 sm:h-64 md:w-[500px] md:h-[500px]"></div>
            <div className="absolute inset-0 flex items-center justify-center mb-20">
              <img
                className="hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
                src={camera}
                alt="Camera"
                onClick={handleCameraClick}
              />
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center md:ml-12">
            <div className="w-76 h-56 sm:w-64 sm:h-64 md:w-[450px] md:h-[450px]"></div>
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
      )}
    </div>
  );
};

export default Scanning;
