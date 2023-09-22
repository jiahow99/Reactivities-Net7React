import ActivityPost from "@/Components/Activity/ActivityPost";
import CreateActivity from "@/Components/Activity/CreateActivity";
import YourActivity from "@/Components/Activity/YourActivity";
import ProfileDashboard from "@/Components/Dashboard/ProfileDashboard";
import { Activity } from "@/models/Activity";


// API - fetch activity
const fetchActivity = async () => {
  const results = await fetch("http://localhost:5000/api/activity", {
    cache: "no-cache"
  });
  return results.json();
}


const Page = async () => {
  const activities:Activity[] = await fetchActivity();

  return (
    <>
      <div className="flex w-full gap-4">
          <YourActivity />

          <CreateActivity />
        </div>

        <div className="flex flex-col gap-7">
          {activities.map((activity, index) => (
            <ActivityPost activity={activity} key={index} />          
          ))}
        </div>
    </>
  )
}

export default Page ;