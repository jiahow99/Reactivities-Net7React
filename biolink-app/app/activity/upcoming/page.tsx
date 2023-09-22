import React, {useEffect} from 'react';
import ActivityDate from "@/Components/Activity/ActivityDate";
import { Activity } from '@/models/Activity';
import { format, parseISO } from 'date-fns';
import ActivityPost from '@/Components/Activity/ActivityPost';

// API - fetch activity
const fetchActivity = async () => {
  const results = await fetch("http://localhost:5000/api/activity", {
    cache: "no-cache"
  });
  const data: Activity[] = await results.json();

  // Sort data by "date"
  const groupedData = new Map<string, Activity[]>();

  data.forEach(activity => {
    const date = format(new Date(activity.date) , 'dd MMM yyyy');
    // If the map dont have the date, initialize an empty array for it
    if(!groupedData.has(date)) {
        groupedData.set(date, []);
    }
    // Push the activity into their corresponding activity
    groupedData.get(date)!.push(activity);
  })

  // Sort the array by date
  const sortedData = Array.from(groupedData.entries()).sort((a, b) => {
      const dateA = new Date(a[0]).getTime();
      const dateB = new Date(b[0]).getTime();
      return dateB - dateA; // Sort in descending order
  });

  // Return sorted date
  return sortedData;
}

const Page = async () => {
  const activities = await fetchActivity();
  return (
    
    <div>
      {activities.map( ([date, groupedActivities]) => (
        <div key={date}>
          <ActivityDate date={date} />

          <div className="flex flex-col gap-3">
            {groupedActivities.map( (activity, index) => 
              <ActivityPost activity={activity} key={index} /> 
            )}
          </div>
        </div>
      ))}
      
      

    </div>
  )
}

export default Page;
