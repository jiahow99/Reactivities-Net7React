
const CreateSkeleton = () => {
  return (
    <div className="create-skeleton w-7/12 h-40 bg-gray-600 animate-pulse rounded-md p-3 flex flex-col gap-4">
        <div className="w-8/12 h-3 bg-gray-500 animate-pulse rounded-md"></div>
        <div className="flex gap-2">
        <div className="w-2/12">
            <div className="w-20 h-20 rounded-full bg-gray-500 animate-pulse"></div>
        </div>
        <div className="w-10/12 h-full bg-gray-500 animate-pulse"></div>
        </div>
    </div>
  )
}

export default CreateSkeleton