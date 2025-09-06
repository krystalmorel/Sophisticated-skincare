import React from 'react'

const Home = () => {
  return (
    <div className="max-sm:scale-75 max-sm:p-6">
      <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2">
        
        {/* First rotated border box */}
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        
        {/* Second rotated border box */}
        <div className="absolute inset-0 flex items-center justify-center lg:hidden">
          <div className="w-[420px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
        </div>
        
        {/* Main heading */}
        <div id="main-heading" className="relative z-10 text-center">
          <h1
            className="text-[60px] text-[#1A1B1C] lg:text-[100px] font-inter font-normal tracking-tighter leading-none opacity-100"
            style={{
              transform: "translate(0px, 0px)"
            }}
          >
            Sophisticated
            <span className="block text-[#1A1B1C]">skincare</span>
          </h1>
        </div>
        <p className='z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]'>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>
        <div className='z-10 mt-4 lg:hidden'>
            <a href="/testing">
            <button className='relative flex items-center gap-4 hover:scale-105 duration-300'>
                <span className='text-[12px] font-bold cursor-pointer'>ENTER EXPERIENCE</span>
                <div className='w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer'></div>
                <span className='absolute left-[129px] scale-[0.5] hover:scale-60 duration-300'>
                    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-black"><path d="M8 5v14l11-7z"></path></svg>
                </span>
                </button></a>
        </div>
      </div> 
    </div>
  )
}


export default Home
