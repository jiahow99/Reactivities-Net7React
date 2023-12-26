import ActivityPost from "@/Components/Activity/ActivityPost";
import CreateActivity from "@/Components/Activity/CreateActivity";
import YourActivity from "@/Components/Activity/YourActivity";
import { Pagination } from "@/Components/Pagination";
import { Activity } from "@/models/Activity";
import { PaginationHeader } from "@/models/PaginationHeader";

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


const Page = async ({searchParams}: Props) => {
  // Search params
  const queryPage = searchParams.currentPage;
  
  // Fetch response
  const response = queryPage 
    ? await fetchActivity(queryPage) 
    : await fetchActivity();

  // API fail (redirect 404)
  if (!response.ok) return {notFound: true};

  // Activities
  var activities: Activity[] = await response.json();  

  // Header pagination
  const paginationHeader = response.headers.get('pagination');
  const paginationData: PaginationHeader = JSON.parse(paginationHeader!);
  const {currentPage, totalPages} = paginationData;

  return (
    <>
      <div className="flex-col lg:flex-row flex w-full lg:gap-4">
        <YourActivity />

        <CreateActivity />
      </div>

      <div className="flex flex-col gap-7">
        {activities.map((activity, index) => (
          <ActivityPost activity={activity} key={index} />          
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}

export default Page ;