
const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton w-full h-64 bg-gray-600 animate-pulse relative rounded-md">
        <div className="absolute bottom-10 left-10 rounded-full w-32 h-32 animate-pulse bg-gray-500"></div>
        <div className="absolute bottom-24 left-52 w-32 h-6 bg-gray-500 animate-pulse rounded-md"></div>
        <div className="flex gap-5 absolute bottom-10 left-52">
        <div className="w-20 h-3 bg-gray-500 animate-pulse rounded-md"></div>
        <div className="w-20 h-3 bg-gray-500 animate-pulse rounded-md"></div>
        <div className="w-20 h-3 bg-gray-500 animate-pulse rounded-md"></div>
        </div>
    </div>
  )
}

export default ProfileSkeleton