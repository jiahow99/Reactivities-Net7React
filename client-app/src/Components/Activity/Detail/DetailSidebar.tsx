import React from 'react';
import { Profile } from '../../../app/models/Profile';
import { observer } from 'mobx-react-lite';

interface Props {
    attendees: Profile[],
    hostUsername: string,
}

export default observer(function DetailSidebar ({attendees, hostUsername}: Props) {
    return (
        <div className="w-4/12">
            <h1 className='bg-white/20 backdrop-blur-sm py-2 text-center rounded-t-xl'>3 Going</h1>
            <div className="px-3 bg-secondary-custom rounded-b-xl">
                
                {
                    attendees.map(attendee => (
                        <div key={attendee.username} className="flex justify-between py-3">
                            <div className='flex gap-2'>
                                <img className='w-28 h-28 rounded-md object-cover' src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
                                <div>
                                    <h1 className='font-medium'>{ attendee.displayName ?? attendee.username }</h1>
                                    <p className='text-sm'>Following</p>
                                </div>
                            </div>
                            {hostUsername === attendee.username && 
                                <span className='font-semibold rounded-lg px-4 bg-white/30 backdrop-blur-sm w-fit h-fit text-primary-custom'>
                                    Host
                                </span>
                            }
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
})