import React from 'react';

export default function ActivityDetail() {
    return (
        <div className='w-full bg-[#7F5A83] rounded-lg'>
            <img className='w-full object-cover h-80' src="https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
            <div className="p-3 pb-3 border-b">
                <h1 className="text-xl font-medium">Future Activity 3</h1>
                <p className='text-gray-300'>123912398</p>
                <p>London</p>
            </div>
            <div className="flex p-3 gap-1">
                <button className='w-1/2 py-3 border-2 border-[#E2A9C6] hover:bg-[#E2A9C6] duration-200 rounded-lg'>
                    Edit
                </button>
                <button className='w-1/2 py-3 border-2 border-white hover:bg-white hover:text-[#E2A9C6] duration-200 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>
    )
}