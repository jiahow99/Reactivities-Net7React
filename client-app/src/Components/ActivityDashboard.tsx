import React, { useEffect } from 'react';
import ActivityList from './ActivityList';
import { useStore } from '../app/stores/store';
import { observer } from "mobx-react-lite";
import Filter from './Filter';


export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {loadActivities } = activityStore;
    
    // Get all activities
    useEffect(() => {
        loadActivities();
    },[loadActivities]); 
    

    return (
        <div className='w-9/12 mx-auto flex gap-10 pt-10'>
          <div className='w-7/12 flex flex-col '>
            {/* Activity List */}
            <ActivityList />
          </div>

          <div className="w-5/12 flex flex-col gap-2">
            <Filter />
          </div>
      </div>
    )
})