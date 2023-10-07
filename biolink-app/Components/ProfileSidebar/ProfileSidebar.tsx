'use client'
import { MapPin, Navigation2, Activity, User } from "react-feather"
import MenuItem from "./MenuItem"
import YourFavourite from "./YourFavourite"
import commonStore from "@/stores/CommonStore"
import { observer } from 'mobx-react-lite'
import Link from "next/link"
import { getSessionData } from "@/utils/getActiveUser"
import { usePathname } from "next/navigation"

const ProfileSidebar = () => {
  const { sidebarOpen } = commonStore;
  const { status } = getSessionData();
  const pathname = usePathname();

  return pathname !== '/' && (
    <>
      <div className={`
        sm:translate-x-0 sm:block w-full sm:w-4/12 lg:w-2/12 fixed top-0 z-10 left-0 bg-primary min-h-screen duration-300
        ${sidebarOpen ? 'translate-x-0 ' : '-translate-x-full'}
      `}>
          
          <Link href={'/activity'} className="logo">
              <h1 className="tracking-widest text-2xl font-medium pt-4 pb-6 text-center">
                  BIOLINK
              </h1>
          </Link>

          <div className="menu flex flex-col gap-3">
              <p className="text-gray-500 text-lg font-medium px-8">MENU</p>
              <MenuItem label="Explore" href="/activity">
                <MapPin className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="Upcoming" href="/activity/upcoming">
                <Navigation2 className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="Ongoing" href="/activity/ongoing">
                <Activity className='w-5 h-5' />
              </MenuItem>
              {status === 'authenticated' &&
                <MenuItem label="My Follower" href="/user/follower">
                  <User className='w-5 h-5' />
                </MenuItem>
              }
          </div>

          <YourFavourite />
          
      </div>

      <div className="hidden sm:block w-4/12 lg:w-2/12"></div>
    </>
  )
}

export default observer(ProfileSidebar)