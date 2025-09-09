import React from 'react'
import camera from '../assets/camera.svg'
import gallery from '../assets/gallery.svg'
import backbutton from '../assets/back-button.png';

const Scannig = () => {
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
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
              <a className="inset-0" aria-label="Back" href="/info">
                <div>
                  <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <img src={backbutton} alt="Back" />
                  </div>
                </div>
              </a>
              </div>

    </div>
  )
}

export default Scannig
