import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import Navbar from '../../Components/Navbar';
import ActivityList from '../../Components/ActivityList';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activity')
      .then(response => {
        setActivities(response.data);
      })
  },[]);


  return (
    <>
      <Navbar />

      <div className='w-9/12 mx-auto'>
        {/* <Header as="h2" icon="user" content='Reactivities' /> */}
          {/* <List>
            {activities.map(activity => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
          </List> */}

          <div className='w-6/12 mt-10 flex flex-col bg-[#7F5A83]'>
            <ActivityList activities={activities} />
          </div>
      </div>
    </>
  );
}

export default App;
