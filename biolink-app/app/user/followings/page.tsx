'use client'
import FollowerSkeleton from '@/Components/Skeleton/FollowerSkeleton';
import { UserComponent } from '@/Components/User/UserComponent';
import { Profile } from '@/models/Profile'
import { getSessionData } from '@/utils/getActiveUser';
import { redirect } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const page = () => {
  // States
  const [followings, setFollowings] = useState<Profile[]>();
  const [loading, setLoading] = useState(true);

  // Active user
  const { user, status } = getSessionData();
  
  useEffect(() => {
    // If authenticated ...
    if (status === 'authenticated') {
      // Show skeleton
      setLoading(true);

      // Call API
      const fetchFollowings = async (username: string, token: string) => {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_PREFIX + `/follow/${username}?type=following`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        // Set followings
        const results: Profile[] = await res.json();
        setFollowings(results);
      }

      fetchFollowings(user.username, user.token);

    // Not authenticated ...
    } else {
      return redirect('activity')
    }
    
    setLoading(false);
  }, [])
  
  
  return (
    <>
    {!loading && followings && followings.length > 0 && 
      <div className="flex flex-col gap-5 my-10">
        {followings.map((targetUser) => (
          <UserComponent 
            key={targetUser.username} 
            user={targetUser} 
            followings={followings}
          />
        ))}
      </div>
    }

    {loading && <FollowerSkeleton />}
    </>
  )
}

export default page
