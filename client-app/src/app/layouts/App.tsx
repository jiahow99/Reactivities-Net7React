import React, { useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import Navbar from '../../Components/Navbar';

import api from '../../api/api';
import {v4 as uuid} from 'uuid';
import { useStore } from '../stores/store';
import { observer } from "mobx-react-lite";
import ActivityDashboard from '../../Components/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const {activityStore} = useStore();

  // call API (index)
  // useEffect(() => {
  //   activityStore.loadActivities();
  // },[activityStore]); 


  // Set selected activity  
  // function handleSelectActivity(id: string) {
  //   setEditMode(false);
  //   setSelectedActivity(activities.find(x => x.id === id));
  // }

  // Cancel selected activity
  // function handleCancelSelectActivity() {
  //   setSelectedActivity(undefined);
  // }

  // Open edit form with activity information
  // function handleOpenEdit(id?: string) {
  //   id ? handleSelectActivity(id) : setSelectedActivity(undefined); 
  //   setEditMode(true);  
  // }

  // Close edit form
  // function handleCloseEdit() {
  //   setEditMode(false); 
  //   setSelectedActivity(undefined);
  // }

  // Update or Create Activity
  function handleUpdateOrCreate(activity: Activity) {
    // Show loading
    setIsLoading(true);

    if(activity.id) {
      // Call API (update) 
      api.update(activity).then(() => {
        // Update activity if success, else remain unchanged
        const updatedActivities = activities.map((oldActivity) => 
          activity.id === oldActivity.id ? {...oldActivity, ...activity} : oldActivity
        );

        setActivities(updatedActivities);
      })
    } else {
      // Assign ID
      activity.id = uuid();
      
      // Call API (create) 
      api.create(activity).then(() => {
        setActivities([...activities, activity]); // Append new activity
      })
    }

    setIsLoading(false);  // Stop show loading
    setEditMode(false);   // Close edit form
  }

  // Delete activity
  // function handleDelete(id: string) {
  //   setIsLoading(true); // Show loading
  //   // Call API (delete)
  //   api.delete(id).then(() => {
  //     setActivities([...activities.filter(x => x.id !== id)]);
  //     setIsLoading(false);  // Stop show loading
  //   })
  // }

  
  return (
    <>
      <Navbar />

      <ActivityDashboard 
        updateOrCreate={handleUpdateOrCreate}
      />

    </>
  );
}

export default observer(App);
