import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import Navbar from '../../Components/Navbar';
import ActivityList from '../../Components/ActivityList';
import ActivityDetail from '../../Components/ActivityDetails';
import ActivityForm from '../../Components/ActivityForm';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  
  // call API
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activity')
      .then(response => {
        setActivities(response.data);
      })
  },[]);

  // Set selected activity
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  // Cancel selected activity
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  return (
    <>
      <Navbar />

      <div className='w-9/12 mx-auto flex gap-16 pt-10'>
          <div className='w-7/12 flex flex-col bg-[#7F5A83]'>
            <ActivityList 
              activities={activities} 
            />
          </div>
          <div className="w-4/12 flex flex-col gap-10">

            <ActivityDetail />

            <ActivityForm />

          </div>
      </div>
    </>
  );
}

export default App;
