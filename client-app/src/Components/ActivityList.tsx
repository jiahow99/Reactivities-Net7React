import React, { useState, useEffect } from 'react';
import { useStore } from '../app/stores/store';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';


export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {activities, deleteActivity, selectActivity, isLoading} = activityStore;

    const [target, setTarget] = useState('');

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    function handleDelete(id: string) {
        setTarget(id);      // Prevent all activity to show same loading spinner
        deleteActivity(id); // Call API
    };

    
    return (
        <>
            {activities.map(activity => (
                <div className="m-3 pb-5 border-b" key={activity.id}>
                    <div className='w-full'>
                        <h2 className='text-xl font-medium'>{ activity.title }</h2>
                        <p className="text-gray-300 my-2">{ activity.date }</p>
                        <p>{ activity.description }</p>
                        <p>{ activity.venue }, { activity.city }</p>
                        <div className="flex justify-between items-center">
                            <button className='px-4 py-1 h-fit bg-white/50 backdrop-blur-sm rounded-lg text-sm font-semibold'>
                                { activity.category }
                            </button>
                            <div>
                                <button onClick={() => handleDelete(activity.id)} className='btn-secondary px-7 py-2 mr-2'>
                                    Delete
                                    {isLoading && target === activity.id &&
                                    <i className="fa-solid fa-circle-notch animate-spin ml-5" /> }
                                </button>
                                <Link to={`/activities/${activity.id}`} className='btn-primary px-10 py-2'>
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
})
