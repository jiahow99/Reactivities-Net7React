import ActivitySkeleton from "@/Components/Skeleton/ActivitySkeleton";
import CreateSkeleton from "@/Components/Skeleton/CreateSkeleton";
import ProfileSkeleton from "@/Components/Skeleton/ProfileSkeleton";
import RecentSkeleton from "@/Components/Skeleton/RecentSkeleton";

const loading = () => {
  return (
    <div className="p-5">
      <ProfileSkeleton />
      
      <div className="flex w-full gap-4 my-5">
        <RecentSkeleton />
        <CreateSkeleton />
      </div>

      <ActivitySkeleton />
    </div>
    
  )
}

export default loading