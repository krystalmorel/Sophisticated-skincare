import React from 'react'

const Demographics = () => {
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
                <div className='p-3 cursor-pointer bg-[#1A1B1C] text-white hover:bg-black flex-1 flex flex-col justify-between hover:bg-[#E1E1E2] border-t'>
                    <p className='text-base font-semi-bold'>East asian</p>
                    <h4 className='text-base font-semibold mb-1'>Race</h4>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default Demographics
