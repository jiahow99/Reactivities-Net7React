import ActivityPost from "@/Components/Activity/ActivityPost";
import CreateActivity from "@/Components/Activity/CreateActivity";
import YourActivity from "@/Components/Activity/YourActivity";
import ProfileDashboard from "@/Components/Dashboard/ProfileDashboard";
import { Activity } from "@/models/Activity";


// API - fetch activity
const fetchActivity = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const results = await fetch("http://localhost:5000/api/activity", {
    cache: "no-cache"
  });
  return results.json();
}


const Page = async () => {
  const activities:Activity[] = await fetchActivity();
  console.log(activities[0]);
  
  return (
    <div className="p-4">
      <ProfileDashboard />

      <div className="flex w-full gap-4">
        <YourActivity />

        <CreateActivity />
      </div>

      <div className="flex flex-col gap-7">
        {activities.map((activity, index) => (
          <ActivityPost activity={activity} key={index} />          
        ))}
      </div>

      

    </div>
  )
}

export default Page ;