import { Home, MapPin, Navigation2, Activity, User } from "react-feather"
import MenuItem from "./MenuItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import YourFavourite from "./YourFavourite"

const ProfileSidebar = () => {
  return (
    <>
      <div className="w-2/12 fixed top-0 left-0 bg-primary min-h-screen">
          <div className="logo">
              <h1 className="tracking-widest text-2xl font-medium pt-4 pb-6 text-center">
                  BIOLINK
              </h1>
          </div>

          <div className="menu flex flex-col gap-3">
              <p className="text-gray-500 text-lg font-medium px-8">MENU</p>
              <MenuItem label="Home">
                <Home className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="Host A Activity">
                <FontAwesomeIcon className="w-5 h-5" icon={faWifi} />
              </MenuItem>
              <MenuItem label="Explore">
                <MapPin className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="Upcoming">
                <Navigation2 className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="Ongoing">
                <Activity className='w-5 h-5' />
              </MenuItem>
              <MenuItem label="My Activity">
                <User className='w-5 h-5' />
              </MenuItem>
          </div>

          <YourFavourite />
          
      </div>

      <div className="w-2/12"></div>
    </>
  )
}

export default ProfileSidebar