import React, { useEffect } from 'react';
import activityStore from '../app/stores/ActivityStore';
import ActivityList from './ActivityList';
import ActivityForm from './ActivityForm';
import ActivityDetails from './ActivityDetails';
import { useStore } from '../app/stores/store';
import { Activity } from '../app/models/Activity';
import { observer } from "mobx-react-lite";


interface Props {
    deleteActivity: (id: string) => void;
    updateOrCreate: (activity: Activity) => void;
}


export default observer(function ActivityDashboard({deleteActivity, updateOrCreate}: Props) {

    const {activityStore} = useStore();
    
    // Get all activities
    useEffect(() => {
        activityStore.loadActivities();
    },[activityStore]); 
    
    const {activities, selectedActivity, editMode} = activityStore;

    return (
        <div className='w-9/12 mx-auto flex gap-10 pt-10'>
          <div className='w-7/12 flex flex-col bg-[#7F5A83]'>
            {/* Activity List */}
            <ActivityList 
              activities={activities} 
              deleteActivity={deleteActivity}
            />
          </div>

          <div className="w-5/12 flex flex-col gap-2">
            {/* Activity Detail */}
            { selectedActivity && !editMode &&
            <ActivityDetails />}

            {/* Activity Form */}
            {editMode && 
            <ActivityForm 
              updateOrCreate={updateOrCreate}
            />}
            
          </div>
      </div>
    )
})