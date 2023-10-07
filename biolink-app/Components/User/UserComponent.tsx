import React, { useState } from 'react'
import Image from 'next/image';
import { Profile } from '@/models/Profile';
import { getSessionData } from '@/utils/getActiveUser';
import userStore from '@/stores/UserStore';
import toast from 'react-hot-toast';
import { Loader } from 'react-feather';

interface Props {
  user: Profile
  followings: Profile[]
}

export const UserComponent = ({ user, followings }: Props) => {
  
  // States
  const [loading, setLoading] = useState(false);

  // Active user
  const { user: activeUser } = getSessionData();

  const { handleFollow } = userStore;

  // See if user is in following lsit
  const checkIsFollowing = () => {
    if (!followings) return false;
    return followings.some(x => x.username === user.username);
  }
  const [isFollowing, setIsFollowing] = useState(checkIsFollowing());

  console.log(followings);
  

  // Toggle follow
  const toggleFollow = async () => {

    setLoading(true);   // Show loading
    console.log(activeUser.token);
    
    // Call API
    const res = await handleFollow(user.username, activeUser.token);

    // Fail
    if (!res.ok) {
      toast.error("Something wrong happen. Try relogin again.");
      setLoading(false);
      return ;
    }

    setLoading(false);  // Hide loading

    // Toastr messsage
    user.following 
      ? toast.success(`Unfollowed ${user.displayName ?? user.username}`)
      : toast.success(`Followed ${user.displayName ?? user.username}`);
    
    setIsFollowing(!isFollowing);
  }

  return (
    <div className="flex justify-between w-full">

        <div className="w-2/12 flex items-center justify-center">
          <Image 
            src={user.image!}
            width={1000}
            height={1000}
            alt='profile-pic'
            className='rounded-full w-7/12 object-cover'
            loading='lazy'
          />
        </div>

        <div className="w-10/12 flex items-center justify-between">
          <div>
            <p className={`text-xl tracking-widest font-medium`}>
              {user.username}
            </p>
            <p className={`tracking-widest text-gray-400`}>
              wilson@test.com
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={toggleFollow} className="create">
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            {loading && 
              <Loader className='animate-spin' />
            }
          </div>
        </div>
      </div>
  )
}
