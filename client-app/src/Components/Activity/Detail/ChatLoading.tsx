import React from 'react';
import { Skeleton } from '@mui/material';


export default function ChatLoading () {
    return (
    <>
        <div className="flex gap-3">
            <div className="w-1/12">
                <Skeleton variant='circular' animation='wave' height={50} />
            </div>
            <div className="w-11/12">
                <Skeleton variant='rounded' animation='wave' height={50} />
                <Skeleton variant='rounded' animation='wave' className='w-2/12 mt-2' />
            </div>
        </div>

        <div className="flex gap-3">
            <div className="w-1/12">
                <Skeleton variant='circular' animation='wave' height={50} />
            </div>
            <div className="w-11/12">
                <Skeleton variant='rounded' animation='wave' height={100} />
                <Skeleton variant='rounded' animation='wave' className='w-2/12 mt-2' />
            </div>
        </div>

        <div className="flex gap-3">
            <div className="w-1/12">
                <Skeleton variant='circular' animation='wave' height={50} />
            </div>
            <div className="w-11/12">
                <Skeleton variant='rounded' animation='wave' />
                <Skeleton variant='rounded' animation='wave' className='w-2/12 mt-2' />
            </div>
        </div>

        <div className="flex gap-3">
            <div className="w-1/12">
                <Skeleton variant='circular' animation='wave' height={50} />
            </div>
            <div className="w-11/12">
                <Skeleton variant='rounded' animation='wave' height={50} />
                <Skeleton variant='rounded' animation='wave' className='w-2/12 mt-2' />
            </div>
        </div>
    </>
    )
}