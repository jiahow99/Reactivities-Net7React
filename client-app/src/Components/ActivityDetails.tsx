import React, { useEffect } from 'react';
import { useStore } from '../app/stores/store';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import DetailSidebar from './Activity/Detail/DetailSidebar';
import Chat from './Activity/Detail/Chat';


export default observer(function ActivityDetail() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, updateAttendance
        , isLoading, cancelSelectedActivity} = activityStore;
    
    // URL parameter
    const {id} = useParams();

    // Load activity
    useEffect(() => {
        if (id) loadActivity(id);

        return () => cancelSelectedActivity();
    }, [id, loadActivity, cancelSelectedActivity]);

    if (!activity) return null ;    
            
    
    return (
        <div className="w-9/12 mx-auto py-10 flex justify-between">
            <div className="w-7/12">

                <div className="w-full event-img shadow-xl">
                    <div className="relative">
                        <img className='w-full object-cover h-72 rounded-t-xl' src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="event-img" />

                        <div className="overlay absolute inset-0 bg-black/50 backdrop-blur-sm rounded-t-xl"></div>

                        <div className="img-info absolute bottom-7 left-10 ">
                            <h1 className='text-2xl font-medium'>{ activity.title }</h1>
                                { new Date(activity.date!).toLocaleString() }
                            <p className='mt-2 capitalize'>Hosted by { activity.host?.username }</p>
                        </div>
                    </div>
                    <div className="w-full bg-secondary-custom p-3 flex justify-between items-center rounded-b-xl">
                        <div className='flex gap-2'>
                            {!activity.isGoing && !activity.isHost && 
                                <button onClick={updateAttendance} className='btn-secondary px-5 py-2'>Join Activity 
                                    {isLoading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
                                </button>
                            }
                            {activity.isGoing && !activity.isHost && 
                                <button onClick={updateAttendance} className='btn-primary px-3 py-2'>Cancel Attendance 
                                    {isLoading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
                                </button>
                            }
                        </div>
                        <div>
                            {activity.isHost && 
                            <Link to={`/edit/${activity.id}`} className='px-3 py-2 underline underline-offset-2' >
                                Manage Event
                            </Link>
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full event-info mt-5 bg-secondary-custom rounded-lg shadow-xl">
                    <div className="flex py-3 border-b-2 ay-300ay-300">
                        <div className="w-1/12 text-center">
                            <i className="fa-solid fa-info"></i>
                        </div>
                        <div className="w-9/12 capitalize">
                            { activity.category }
                        </div>
                    </div>

                    <div className="flex py-3 border-b-2 ay-300ay-300">
                        <div className="w-1/12 text-center">
                            <i className="fa-solid fa-calendar-days"></i>
                        </div>
                        <div className="w-9/12">
                            { new Date(activity.date!).toLocaleString() }
                        </div>
                    </div>

                    <div className="flex py-3">
                        <div className="w-1/12 text-center">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="w-9/12">
                            { activity.venue }, { activity.city }
                        </div>
                    </div>
                </div>

                <Chat activityId={activity.id} />
            </div>

            <DetailSidebar attendees={activity.attendees!} hostUsername={activity.hostUsername!} />
        </div>
    )
})