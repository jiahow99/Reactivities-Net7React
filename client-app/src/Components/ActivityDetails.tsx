import React from 'react';
import { useStore } from '../app/stores/store';



export default function ActivityDetail() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, cancelSelectActivity, openEdit} = activityStore;

    if (!activity) return null ;
    
    return (
        <div className='w-full bg-[#7F5A83] rounded-lg'>
            <img className='w-full object-cover h-80' src="https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt='activity_img' />
            <div className="p-3 pb-3 border-b">
                <h1 className="text-xl font-medium">{activity.title}</h1>
                <p className='text-gray-300'>{activity.description}</p>
                <p>{activity.venue}, {activity.city}</p>
            </div>
            <div className="flex p-3 gap-1">
                <button onClick={() => openEdit(activity.id)} className='w-1/2 py-3 btn-secondary'>
                    Edit
                </button>
                <button onClick={cancelSelectActivity} className='w-1/2 py-3 border-2 border-white hover:bg-white hover:text-[#E2A9C6] duration-200 rounded-lg'>
                    Cancel
                </button>
            </div>
        </div>
    )
}