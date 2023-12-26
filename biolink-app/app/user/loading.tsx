import React from 'react'

const loading = () => {
  return (
    <div className="w-full flex gap-5 my-10">
        <div className="w-4/12 flex flex-col gap-3 items-center justify-center">
            <div className="w-9/12 bg-gray-500 aspect-square rounded-full"></div>
            <div className="h-3 w-3/12 bg-gray-500 rounded-md"></div>
            <div className="h-3 w-9/12 bg-gray-500 rounded-md"></div>
        </div>

        <div className="w-6/12">
            <div className="h-8 bg-gray-500 w-5/12 rounded-md"></div>
            <div className="mt-5 w-full h-72 bg-gray-500 rounded-md"></div>
        </div>
    </div>
  )
}

export default loading