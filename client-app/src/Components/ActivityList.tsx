import React from 'react';
import { Activity } from '../app/models/Activity';

interface Props {
    activities: Activity[]
}


export default function ActivityList({activities}: Props) {
    return (
        <>
            {activities.map(activity => (
                <div className="m-3 pb-5 border-b">
                    <div className='w-full'>
                        <h2 className='text-xl font-medium'>{ activity.title }</h2>
                        <p className="text-gray-300 my-2">{ activity.date }</p>
                        <p>{ activity.description }</p>
                        <p>{ activity.venue }, { activity.city }</p>
                        <div className="flex justify-between items-center">
                            <button className='px-4 py-1 h-fit bg-white/50 backdrop-blur-sm rounded-lg text-sm font-semibold'>
                                { activity.category }
                            </button>
                            <button className='bg-[#E2A9C6] px-10 py-2 rounded-lg font-semibold text-[#1E3855]'>View</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
