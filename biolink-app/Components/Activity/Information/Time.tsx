import { poppins } from '@/font/Poppins'
import { format } from 'date-fns'
import React from 'react'
import { Clock } from 'react-feather'

interface Props {
    time: Date
}

const Time = ({ time }: Props) => {
  return (
    <div className="flex gap-2 items-center mt-2">
        <Clock className='text-gray-400 w-5 h-5' />
        <div className={`${poppins.className} text-xs font-medium text-gray-400 tracking-wider`}>
            {format(new Date(time), 'dd/MM/yyyy h:mm a')}
        </div>
    </div>
  )
}

export default Time