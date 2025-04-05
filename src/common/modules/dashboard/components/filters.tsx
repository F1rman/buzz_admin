import CheckboxTile from 'common/components/filters/checkbox_tile';
import React from 'react';

interface IProps {
   filters: any;
   open: boolean;
   setOpen: (open: boolean) => void;
   setFilters: (filters: any) => void;
}

export default function Filters({ filters, open, setOpen, setFilters }: IProps) {
   return (
      <>
         <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto !z-[1900]' : 'opacity-0 pointer-events-none !z-[1900]'
               }`}
         />
         <div
            className={`fixed top-0 left-0 h-full w-[400px] bg-white !z-[2000] shadow-lg transform transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'
               }`}
         >
            <div className='flex w-full justify-between items-center p-4 pt-6'>
               <div className="">
                  <h2 className="text-xl font-semibold mb-4 text-[24px]">Filters</h2>
               </div>
               <div className="flex justify-end">
                  <button
                     onClick={() => setOpen(false)}
                     className="text-gray-600 hover:text-black text-[20px]"
                  >
                     ✕
                  </button>
               </div>


            </div>
            <div className='flex gap-6 flex-wrap px-4'>
               <div className='flex items-center w-max cursor-pointer'
                  onClick={() => {
                     setFilters({...filters, is_event: !filters.is_event})
                  }}
               >
                  <CheckboxTile
                     active={filters.is_event}
                     classNameWrapper="!px-0"
                     onClick={() => { }}
                  />
                  <span className='text-black text-[16px]'>Event</span>
               </div>
               <div className='flex items-center w-max cursor-pointer'
                  onClick={() => {
                     setFilters({...filters, is_message: !filters.is_message})
                  }}
               >
                  <CheckboxTile
                     active={filters.is_message}
                     classNameWrapper="!px-0"
                     onClick={() => { }}
                  />
                  <span className='text-black text-[16px]'>Message</span>
               </div>
               <div className='flex items-center w-max cursor-pointer'
                  onClick={() => {
                     setFilters({...filters, is_error: !filters.is_error})
                  }}
               >
                  <CheckboxTile
                     active={filters.is_error}
                     classNameWrapper="!px-0"
                     onClick={() => { }}
                  />
                  <span className='text-black text-[16px]'>Error</span>
               </div>
               <div className='flex items-center w-max cursor-pointer'
                  onClick={() => {
                     setFilters({...filters, is_timeout: !filters.is_timeout})
                  }}
               >
                  <CheckboxTile
                     active={filters.is_timeout}
                     classNameWrapper="!px-0"
                     onClick={() => { }}
                  />
                  <span className='text-black text-[16px]'>Timeout</span>
               </div>
               <div className='flex items-center w-max cursor-pointer'
                  onClick={() => {
                     setFilters({...filters, is_other: !filters.is_other})
                  }}
               >
                  <CheckboxTile
                     active={filters.is_other}
                     classNameWrapper="!px-0"
                     onClick={() => { }}
                  />
                  <span className='text-black text-[16px]'>Other</span>
               </div>
            </div>
         </div>
      </>
   );
}
