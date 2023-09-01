import React from 'react';
import '../app/layouts/styles.css';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    
    return (
        <nav className='navbar w-full text-white'>
            <div className="w-9/12 mx-auto py-4 flex items-center gap-10">
                <div className="logo">
                    <h2 className='text-2xl font-medium'>Reactivities</h2>
                </div>

                <div className="flex items-center gap-3">
                    <NavLink to='/' className='text-lg h-fit p-0 m-0 px-5 font-medium'>
                        Home
                    </NavLink>
                    <NavLink to='/activities' className='text-lg h-fit p-0 m-0 px-5 font-medium'>
                        Activities
                    </NavLink>
                    <NavLink to='/create-activity' className='font-medium px-5 py-3 rounded-xl bg-purple-500'>Add Activities</NavLink>
                </div>
            </div>
        </nav>
    )
}