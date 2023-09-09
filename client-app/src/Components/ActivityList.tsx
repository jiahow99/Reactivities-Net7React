import React, { useState, useEffect } from 'react';
import { useStore } from '../app/stores/store';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import AttendeesList from './AttendeesList';


export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {activitiesGroupByDate: activities} = activityStore;

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    console.log(activities);
    
    
    return (
        <>
            {activities.map( ([date, groupedActivities]) => (
                <div key={date} className='mt-10'>
                    <h1 className='text-xl font-medium mb-2'>{date}</h1>
                    
                    <div className="flex flex-col gap-3">
                        {groupedActivities.map((activity) => (
                            <div key={activity.id} className='bg-secondary-custom rounded-lg'>
                                <div className="flex gap-5 p-3 border-b">
                                    <img className='w-32 h-32 object-cover rounded-full' src="https://images.unsplash.com/photo-1581391528803-54be77ce23e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="profile" />
                                    <div>
                                        <h2 className='text-xl font-medium'>{ activity.title }</h2>
                                        <p className='mt-2'>Hosted by { activity.hostUsername }</p> 
                                        {activity.isHost && 
                                            <p className='mt-2 w-fit py-1 px-3 rounded-md bg-indigo-500 text-sm'>
                                                You are hosting this activity
                                            </p>
                                        }

                                        {activity.isGoing && !activity.isHost && 
                                            <p className='mt-2 w-fit py-1 px-3 rounded-md bg-indigo-500 text-sm'>
                                                You are going this activity
                                            </p>
                                        }
                                    </div>
                                </div>

                                <div className="flex gap-3 p-3">
                                    <div>
                                        <i className="fa-solid fa-clock mr-1"></i>
                                        { activity.date!.toLocaleString() }
                                    </div>
                                    <div>
                                        <i className="fa-solid fa-location-dot mr-1"></i>
                                        { activity.venue }
                                    </div>
                                </div>

                                <AttendeesList attendees={activity.attendees!} />

                                <div className="p-3 flex justify-between">
                                    <p>{ activity.description }</p>
                                    <Link to={`/activities/${activity.id}`} className='btn-primary px-10 py-2'>
                                        View
                                    </Link>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
            
        </>
    )
})
