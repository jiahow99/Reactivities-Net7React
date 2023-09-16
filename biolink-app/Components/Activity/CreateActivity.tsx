'use client'

import React, { useState } from 'react'
import Tags from './Tags'
import { Navigation, Calendar } from 'react-feather'
import './activity.css'
import Location from './Location'
import Date from './Date'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const CreateActivity = () => {

    const [detailType, setDetailType] = useState<string>();

    const handleDetail = (type: string) => {
        type === detailType
            ? setDetailType('')     // Close
            : setDetailType(type);  // Open
    }

return (
    <SlideDown className="w-7/12 bg-primary my-5 py-3 px-5 transition-all duration-300">
        <div className="flex gap-1 items-center ">
            <p className='font-semibold'>Tags :</p>
            <Tags label="Web3" />
            <Tags label="Birds" />
            <Tags label="Metaverse" />
            <Tags label="Blockchain" />
            <Tags label="Speech" />
        </div>

        <div className="w-full flex items-center mt-4 mb-2" >
            <div className="w-2/12 flex items-center justify-center">
                <img src="/profile-pic.jpg" className='w-20 h-20 rounded-full' alt="profile-pic" />
            </div>
            <textarea name="details" rows={3} className='w-10/12 bg-transparent border-2 border-secondary rounded-md p-3 text-sm font-medium tracking-wider' placeholder='Write something about yout event ...'>
            </textarea>
        </div>

        <div className="flex justify-between px-3 py-1">
            <div className="flex gap-5">
                <div onClick={() => handleDetail('location')}
                 className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 rounded-full duration-200 ${detailType==='location' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                >
                    <Navigation className='w-5 h-5' />
                    <p>Location</p>
                </div>
                <div onClick={() => handleDetail('date')}
                 className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 rounded-full duration-200 ${detailType==='date' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                >                    
                    <Calendar className='w-5 h-5' />
                    <p>Date</p>
                </div>
            </div>

            <button className='create'>Submit</button>
        </div>
        
        {detailType === 'location' && <Location />}
        {detailType === 'date' && <Date />}
        
    </SlideDown>
  )
}

export default CreateActivity