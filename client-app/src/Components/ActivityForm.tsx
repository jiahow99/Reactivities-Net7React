import React from 'react';

export default function ActivityForm() {
    return (
        <div className="w-full bg-[#7F5A83] p-8 flex flex-col gap-8 rounded-lg">
            <input className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' type="text" placeholder='Title' />
            <textarea className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' placeholder='Description'></textarea>
            <input className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' type="text" placeholder='Category' />
            <input className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' type="text" placeholder='Date' />
            <input className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' type="text" placeholder='Venue' />
            <input className='w-full bg-transparent border-white placeholder:text-gray-300 focus:border-[#E2A9C6] focus:ring-[#E2A9C6] rounded-md' type="text" placeholder='City' />
        </div>
    )
}