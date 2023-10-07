import React from 'react'

const FollowerSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-5 my-10">
      <div className="flex items-center justify-between">
        <div className="w-2/12 flex justify-center items-center">
          <div className="w-7/12 aspect-square rounded-full bg-gray-500 animate-pulse"></div>
        </div>

        <div className="w-10/12 flex justify-between">
          <div className='flex flex-col gap-3'>
            <div className="h-3 w-20 bg-gray-500 rounded-md animate-pulse"></div>
            <div className="h-3 w-44 bg-gray-500 rounded-md animate-pulse"></div>
          </div>
          <div className="h-10 w-2/12 bg-gray-500 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-2/12 flex justify-center items-center">
          <div className="w-7/12 aspect-square rounded-full bg-gray-500 animate-pulse"></div>
        </div>

        <div className="w-10/12 flex justify-between">
          <div className='flex flex-col gap-3'>
            <div className="h-3 w-20 bg-gray-500 rounded-md animate-pulse"></div>
            <div className="h-3 w-44 bg-gray-500 rounded-md animate-pulse"></div>
          </div>
          <div className="h-10 w-2/12 bg-gray-500 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-2/12 flex justify-center items-center">
          <div className="w-7/12 aspect-square rounded-full bg-gray-500 animate-pulse"></div>
        </div>

        <div className="w-10/12 flex justify-between">
          <div className='flex flex-col gap-3'>
            <div className="h-3 w-20 bg-gray-500 rounded-md animate-pulse"></div>
            <div className="h-3 w-44 bg-gray-500 rounded-md animate-pulse"></div>
          </div>
          <div className="h-10 w-2/12 bg-gray-500 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default FollowerSkeleton