import React from 'react';
import { Profile } from '../app/models/Profile';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface Props {
    attendees: Profile[];
}

export default observer(function AttendeesList ({attendees}: Props) {
    return (
        <div className="p-3 bg-gray-500 flex gap-5 items-center">
            {
                attendees.map(attendee => (
                    <Link to={`/profiles/${attendee.username}`} key={attendee.username} >
                        <img 
                            src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" 
                            className='w-12 h-12 rounded-full object-cover' alt="profile-pic" 
                        />
                    </Link>
                ))
            }
        </div>
    )
})