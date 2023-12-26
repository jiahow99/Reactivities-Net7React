import ActivityDate from "@/Components/Activity/ActivityDate";
import { Activity } from '@/models/Activity';
import { format } from 'date-fns';
import ActivityPost from '@/Components/Activity/ActivityPost';
import { PaginationHeader } from "@/models/PaginationHeader";
import { Pagination } from "@/Components/Pagination";

interface Props {
  searchParams: {[key: string]: string | string[] | undefined}
}

// API - fetch ongoing activity
const fetchActivity = async () => {
  const results = await fetch(`${process.env.NEXT_PUBLIC_API_PREFIX}/activity?onGoing=true`, {
    cache: "no-cache"
  });
  return results;
}


const Page = async ({searchParams}: Props) => {
  // Search params
  const queryPage = searchParams.currentPage;
  
  // Fetch response
  // const response = queryPage 
  //   ? await fetchActivity(queryPage) 
  //   : await fetchActivity();
  const response = await fetchActivity();

  // API fail (redirect 404)
  if (!response) return {notFound: true};
  
  // Activities
  const activities: Activity[] = await response.json();

  // Header pagination
  const paginationHeader = response.headers.get('pagination');
  const paginationData: PaginationHeader = JSON.parse(paginationHeader!);
  const {currentPage, totalPages} = paginationData;

  // Today date
  const todayDate = new Date();
  const formattedTodayDate = format(todayDate, 'yyyy-MM-dd');

  return (
    <div>
      <ActivityDate date={formattedTodayDate} />

      <div className="flex flex-col gap-7">
        {activities.map( activity => (
          <div key={activity.id}>
            <div className="flex flex-col gap-3">
              <ActivityPost activity={activity} /> 
            </div>
          </div>
        ))}
      </div>
      
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default Page;
