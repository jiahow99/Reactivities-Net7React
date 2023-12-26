
const ActivitySkeleton = () => {
  return (
    <div className="activity-skeleton flex flex-col gap-5  w-full bg-gray-600 animate-pulse p-3 my-5 rounded-md">
        <div className="flex w-full">
            <div className="w-1/12 mr-8">
            <div className="w-20 h-20 bg-gray-500 rounded-full animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-2 justify-center">
            <div className="w-44 h-3 bg-gray-500 animate-pulse"></div>
            <div className="w-20 h-3 bg-gray-500 animate-pulse"></div>
            </div>
        </div>

        <div className="w-full h-10 bg-gray-500 animate-pulse rounded-md"></div>
    
        <div className="flex gap-5">
            <div className="w-1/2 h-52 bg-gray-500 animate-pulse"></div>
            <div className="w-1/2 h-52 bg-gray-500 animate-pulse"></div>
        </div>
    </div>
  )
}

export default ActivitySkeleton