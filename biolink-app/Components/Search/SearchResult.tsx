import { Activity } from '@/models/Activity'
import { format, formatDistanceToNow } from 'date-fns'
import { Poppins } from 'next/font/google'
import React from 'react'
import { Calendar } from 'react-feather'

interface Props {
    activity: Activity
}

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const SearchResult = ({ activity }: Props) => {
  return (
    <div className="p-5 hover:bg-secondary rounded-lg duration-100">
        <div className="flex">
            <div className="w-8/12 tracking-wide">
                <p>{ activity.title }</p>
            </div>
            <div className="w-4/12 flex justify-between items-center">
                <p className={`${poppins.className} text-sm mr-5 text-gray-400`}>
                    {`${formatDistanceToNow(new Date(activity.date))} left`}
                </p>
                <p className='font-medium'>{ format(new Date(activity.date), 'dd-MM-yyyy') }</p>
                <Calendar />
            </div>
        </div>
        <div className='mt-2 w-fit py-1 px-2 text-xs rounded-full tracking-widest text-white 
            bg-gray-500 font-medium cursor-pointer duration-200'
        >
            { activity.category }
        </div>
    </div>
  )
}

export default SearchResult