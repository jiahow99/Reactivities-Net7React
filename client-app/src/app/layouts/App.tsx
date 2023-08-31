import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import Navbar from '../../Components/Navbar';
import ActivityList from '../../Components/ActivityList';
import ActivityDetail from '../../Components/ActivityDetails';
import ActivityForm from '../../Components/ActivityForm';
import api from '../../api/api';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // call API (index)
  useEffect(() => {
    api.index().then(response => {
      // Format date
      formatDate(response)  
      setActivities(response); 
    })
  },[]);

  // Format date to 10/10/2023
  function formatDate(data: Activity[]) {
    data.forEach(activity => {
      activity.date = activity.date.split('T')[0];
    })
  }

  // Set selected activity  
  function handleSelectActivity(id: string) {
    setEditMode(false);
    setSelectedActivity(activities.find(x => x.id === id));
  }

  // Cancel selected activity
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  // Open edit form with activity information
  function handleOpenEdit(id?: string) {
    id ? handleSelectActivity(id) : setSelectedActivity(undefined); 
    setEditMode(true);  
  }

  // Close edit form
  function handleCloseEdit() {
    setEditMode(false); 
    setSelectedActivity(undefined);
  }

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

  

  return (
    <>
      <Navbar openEdit={handleOpenEdit} />

      <div className='w-9/12 mx-auto flex gap-10 pt-10'>
          <div className='w-7/12 flex flex-col bg-[#7F5A83]'>
            {/* Activity List */}
            <ActivityList 
              activities={activities} 
              selectActivity={handleSelectActivity}
            />
          </div>

          <div className="w-5/12 flex flex-col gap-2">
            {/* Activity Detail */}
            { selectedActivity && !editMode &&
            <ActivityDetail 
              activity={selectedActivity} 
              cancelSelectActivity={handleCancelSelectActivity} 
              openEdit={handleOpenEdit}
            />}

            {/* Activity Form */}
            {editMode && 
            <ActivityForm 
              activity={selectedActivity} 
              updateOrCreate={handleUpdateOrCreate}
              closeEdit={handleCloseEdit}
              isLoading={isLoading}
            />}
            
          </div>
      </div>
    </>
  );
}

export default App;
