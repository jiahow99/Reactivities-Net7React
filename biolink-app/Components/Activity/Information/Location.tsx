import { poppins } from '@/font/Poppins'
import { format } from 'date-fns'
import React from 'react'
import { MapPin } from 'react-feather'

interface Props {
    venue: string
    city: string
}
const Location = ({ venue, city }: Props) => {
  return (
    <div className="flex gap-2 items-center">
        <MapPin className='text-gray-400 w-5 h-5' />
        <div className={`${poppins.className} text-xs font-medium text-gray-400 tracking-wider`}>
            {venue}, {city}
        </div>
    </div>
  )
}

export default Location