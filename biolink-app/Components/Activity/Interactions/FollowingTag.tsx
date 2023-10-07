import { poppins } from '@/font/Poppins'
import React from 'react'
import { Check } from 'react-feather'

const FollowingTag = () => {
  return (
    <div className={`${poppins.className} py-1 px-3 rounded-full text-xs font-semibold following bg-green-500 flex items-center gap-2`}>
        <p>folowing</p>
        <Check className='w-4 h-4' />
    </div>
  )
}

export default FollowingTag