import { Profile } from '@/models/Profile'
import { getSessionData } from '@/utils/getActiveUser';
import Image from 'next/image'
import FollowingTag from '../Interactions/FollowingTag';

interface Props {
  attendee: Profile
}

export const AttendeeComponent = ({attendee}: Props) => {
  const { user } = getSessionData();
  console.log(attendee);
  
  return (
    <div className="flex items-center justify-between">
        <div className="w-full sm:w-4/12">
            <Image src={attendee.image ?? '/profile-pic.jpg'} alt="profile" width={60} height={60} className='rounded-full object-cover' />
        </div>
        <div className="w-full sm:w-9/12 pl-2">
            <p>{attendee.displayName ?? attendee.username}</p>
        </div>
        {attendee.username !== user?.username && attendee.following &&
          <FollowingTag />
        }
    </div>
  )
}
