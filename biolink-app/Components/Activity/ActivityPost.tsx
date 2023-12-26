'use client'
import PhotoGallery from './PhotoGallery';
import Comment from './Interactions/Comment';
import Share from './Interactions/Share';
import { Activity } from '@/models/Activity';
import { formatDistanceToNow } from 'date-fns';
import ChatSection from './Chat/ChatSection';
import React, { useEffect, useState } from 'react';
import SlideDown from 'react-slidedown';
import Attendees from './Interactions/Attendees';
import { AttendeeSection } from './Attending/Attendees';
import { JoinButton } from './Interactions/JoinButton';
import { UnjoinButton } from './Interactions/UnjoinButton';
import { User } from '@/models/User';
import { CancelEvent } from './Interactions/CancelEvent';
import {observer} from 'mobx-react-lite';
import { Profile } from '@/models/Profile';
import { useSession } from 'next-auth/react';
import { poppins } from '@/font/Poppins';
import Time from './Information/Time';
import Location from './Information/Location';


interface Props {
    activity: Activity
}

const ActivityPost = ({activity: activityProp}: Props) => {    
    // Active user
    const { data } = useSession();
    const user = data?.user as User;

    // Comment or Attendee
    const [detailType, setDetailType] = useState('');
    const [activity, setActivity] = useState<Activity>(activityProp);
    
    // Toggle comment/attendee
    const toggleDetail = (type: string) => {
        detailType === type
            ? setDetailType('')
            : setDetailType(type)
    }

    // Check if user is host
    const isHost = () => {
        if (!user) return false;
        return activity.host.username === user.username;
    }

    // Check if user joined the activity
    const hasJoined = (user: User | null) => {
        if (!user) return;
        return activity.attendees.some((attendee) => attendee.username === user.username);
    }

    // Check is the user is host or joining the event
    const [isJoined, setIsJoined] = useState(hasJoined(user));
    const [isCancel, setIsCancel] = useState(activity.isCancelled);

    // Add and remove attendee from event
    const addAttendee = () => {
        // No user or Already in list     
        if(user === null || activity.attendees.some(x => x.id === user.id)) return;

        // Add to list and update state
        const updated = {
            ...activity,
            attendees: [...activity.attendees, new Profile(user)]
        }
        setActivity(updated);
        
    }
    // Add and remove attendee from event
    const removeAttendee = () => {
        // Not in list ...
        if (user === null || !activity.attendees.some(x => x.id === user.id)) return;

        // Remove the user from attendee list and update state
        const updated = {
            ...activity,
            attendees: activity.attendees.filter(x => x.id !== user?.id)
        }
        setActivity(updated);
    }

    // // Set state when component mount
    // useEffect(() => {
    //     setIsJoined(hasJoined(user));
    //     setIsHost(verifyHost(user));
    //     setIsCancel(activity.isCancelled);
    //   }, [user, activity]);

    const isJoinedd = () => {
        return user && !isHost() && !isJoined && !isCancel;
    }

    const notJoinedd = () => {
        return user && !isHost() && isJoined && !isCancel;
    }

    const isCancelled = () => {
        return user && isCancel;
    }

    
    
    return (
        <div className="w-full bg-primary py-3 px-5 flex flex-col gap-5">
            <div className="w-full flex items-center">
                <div className="w-2/12 lg:w-1/12 mr-8">
                    <img src={activity.host.image ?? "/profile-pic.jpg"} className="w-20 h-20 rounded-full object-cover" alt="profile-pic" />
                </div>

                <div className="flex flex-col gap-2 ">
                    <div className="flex items-center">
                        <div>
                            <div className="flex flex-wrap gap-1 tracking-wider items-center">
                                <p className="font-semibold text-lg mr-1 capitalize">
                                    { activity.host.displayName }
                                </p>
                                <p className="text-sm">posted new</p>
                                <p className="text-sm text-blue-500 font-medium">
                                    activity
                                </p>
                            </div>
                            <p className="text-gray-400 text-xs font-semibold tracking-widest">
                                { formatDistanceToNow(new Date(activity.date)) } left
                            </p>
                        </div>
                        {isJoinedd() && 
                            <JoinButton font={poppins} activityId={activity.id} setIsJoined={setIsJoined} addAttendee={addAttendee} /> 
                        }
                        {notJoinedd() && 
                            <UnjoinButton font={poppins} activityId={activity.id} setIsJoined={setIsJoined} removeAttendee={removeAttendee} /> 
                        }
                        {isHost() && !isCancelled() &&
                            <CancelEvent font={poppins} activityId={activity.id} setIsCancel={setIsCancel} /> 
                        }
                        {isCancelled() && (
                            <p className={`ml-5 px-4 py-2 bg-red-500 ${poppins.className} rounded-full`}>Event cancelled</p>
                        )}
                    </div>
                    
                    <div className="flex gap-5 items-end">
                        <Time time={activity.date} />
                        <Location venue={activity.venue} city={activity.city} />
                    </div>
                </div>

                
                
            </div>

            <p className={`text-sm tracking-wider font-poppins ${poppins.className}`}>
                { activity.description }
            </p>

            { activity.images.length > 0 && 
                <PhotoGallery images={activity.images} /> 
            } 
            
            <div className="flex gap-5">
                <Attendees toggleDetail={toggleDetail} />
                <Comment toggleDetail={toggleDetail} />
                <Share />
            </div>

            <SlideDown>
                {detailType === "attendees" && <AttendeeSection host={activity.host} attendees={activity.attendees} />}
                {detailType === "comment" && <ChatSection font={poppins} activityId={activity.id} />}
            </SlideDown>
            
        </div>
    )
}

export default observer(ActivityPost)