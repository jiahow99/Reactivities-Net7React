
const RecentSkeleton = () => {
  return (
    <div className="recent-skeleton w-5/12 h-40 bg-gray-600 animate-pulse rounded-md p-3">
        <div className="w-32 h-5 bg-gray-500 animate-pulse rounded-md"></div>
            <div className="flex flex-col gap-3 mt-5">
            <div className="w-9/12 h-3 bg-gray-500 animate-pulse"></div>
            <div className="w-9/12 h-3 bg-gray-500 animate-pulse"></div>
            <div className="w-9/12 h-3 bg-gray-500 animate-pulse"></div>
        </div>
    </div>
  )
}

export default RecentSkeleton