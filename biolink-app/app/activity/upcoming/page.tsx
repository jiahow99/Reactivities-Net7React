import ActivityDate from "@/Components/Activity/ActivityDate";
import { Activity } from '@/models/Activity';
import { format } from 'date-fns';
import ActivityPost from '@/Components/Activity/ActivityPost';
import { PaginationHeader } from "@/models/PaginationHeader";
import { Pagination } from "@/Components/Pagination";

interface Props {
  searchParams: {[key: string]: string | string[] | undefined}
}

// API - fetch activity
const fetchActivity = async (currentPage: string | string[] = "1") => {
  const results = await fetch(`${process.env.NEXT_PUBLIC_API_PREFIX}/activity?currentPage=${currentPage}`, {
    cache: "no-cache"
  });
  return results;
}

// Sort activity by date
const sortActivityByDate = (activities: Activity[]) => {
  // Sort data by "date"
  const groupedData = new Map<string, Activity[]>();

  activities.forEach(activity => {
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

const Page = async ({searchParams}: Props) => {
  // Search params
  const queryPage = searchParams.currentPage;
  
  // Fetch response
  const response = queryPage 
    ? await fetchActivity(queryPage) 
    : await fetchActivity();

  // API fail (redirect 404)
  if (!response) return {notFound: true};

  // Activities
  const activities = sortActivityByDate(await response.json());  

  // Header pagination
  const paginationHeader = response.headers.get('pagination');
  const paginationData: PaginationHeader = JSON.parse(paginationHeader!);
  const {currentPage, totalPages} = paginationData;

  return (
    <div>
      {activities.map( ([date, groupedActivities]) => (
        <div key={date}>
          <ActivityDate date={date} />

          <div className="flex flex-col gap-3">
            {groupedActivities.map((activity, index) => 
              <ActivityPost activity={activity} key={index} /> 
            )}
          </div>
        </div>
      ))}
      
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default Page;
