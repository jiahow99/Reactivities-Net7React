import { Poppins } from 'next/font/google'
import PhotoGallery from './PhotoGallery';
import Like from './Like';
import Comment from './Comment';
import Share from './Share';
import { Activity } from '@/models/Activity';
import { formatDistanceToNow } from 'date-fns';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
  });

interface Props {
    activity: Activity
}

const ActivityPost = ({activity}: Props) => {
    
  return (
    <div className="w-full bg-primary py-3 px-5 flex flex-col gap-5">
        <div className="w-full flex">
            <div className="w-1/12 mr-8">
                <img src={activity.host.image ?? "/profile-pic.jpg"} className="w-20 h-20 rounded-full object-cover" alt="profile-pic" />
            </div>

            <div className="flex flex-col gap-1 justify-center">
                <div className="flex gap-1 tracking-wider items-center">
                    <p className="font-semibold text-lg mr-1 capitalize">
                        { activity.host.displayName }
                    </p>
                    <p className="text-sm">posted new</p>
                    <p className="text-sm text-blue-500 font-medium">
                        activity
                    </p>
                </div>
                <p className="text-gray-400 text-xs font-semibold tracking-widest">{ formatDistanceToNow(new Date(activity.date)) } ago</p>
            </div>
        </div>

        <p className={`text-sm tracking-wider font-poppins ${poppins.className}`}>
            { activity.description }
        </p>

        <PhotoGallery images={['1','2','3']} />
        
        <div className="flex gap-5">
            <Like />
            <Comment />
            <Share />
        </div>
    </div>
  )
}

export default ActivityPost