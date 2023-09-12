import React from 'react';
import { Comment } from '../../../app/models/Comment';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    comment: Comment
}


export default function ChatComponent ({comment}: Props) {
    return (
        <div className="flex gap-5">
            <div className="profile w-1/12 ">
                <img className='w-full aspect-square rounded object-cover' src={comment.image ?? "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"} alt="" />
            </div>

            <div className="info w-11/12">
                <div className="flex gap-2 items-end">
                    <p className='font-medium text-lg'>{ comment.displayName ?? comment.username }</p>
                    <p className='text-xs text-gray-300 mb-1'>
                        { formatDistanceToNow(comment.createdAt) + " ago" }
                    </p>
                </div>
                <p className='whitespace-pre-wrap'>{ comment.message }</p>
                <button className='text-sm font-medium text-gray-300'>Reply</button>
            </div>
        </div>
    )
}