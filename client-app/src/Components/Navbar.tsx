import React from 'react';
import '../app/layouts/styles.css';

export default function Navbar() {
    return (
        <nav className='navbar w-full text-white'>
            <div className="w-9/12 mx-auto py-4 flex items-center gap-10">
                <div className="logo">
                    <h2 className='text-2xl font-medium'>Reactivities</h2>
                </div>

                <div className="flex items-center gap-5">
                    <p className='text-lg h-fit p-0 m-0 px-5'>Activities</p >
                    <button className='text-lg px-5 py-3 rounded-xl bg-purple-500'>Add Activities</button>
                </div>
            </div>
        </nav>
    )
}