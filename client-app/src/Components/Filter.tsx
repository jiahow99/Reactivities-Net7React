import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Filter() {
    return (
        <div className='w-full'>
            <div className="w-full bg-secondary rounded-md font-medium">
                <h1 className='p-3 border-b'>
                    <i className="fa-solid fa-filter mr-2"></i>
                    Filter
                </h1>
                <h1 className='p-3'>All activities</h1>
                <h1 className='p-3'>I'm going</h1>
                <h1 className='p-3'>I'm hosting</h1>
            </div>

            <div className="w-full mt-5">
                <Calendar />
            </div>

        </div>
    )
}