import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FavouriteItem from "./FavouriteItem"

const YourFavourite = () => {
  return (
    <div className="your-favourite flex flex-col gap-3 mt-9">
        <p className="text-gray-500 text-lg font-medium pl-8">YOUR FAVOURITE</p>
        <FavouriteItem label="Web 3">
        {/* <Home className='w-6 h-6' /> */}
        </FavouriteItem>
        <FavouriteItem label="Birds">
        {/* <FontAwesomeIcon className="w-6 h-6" icon={faWifi} /> */}
        </FavouriteItem>
        <FavouriteItem label="Insipration Speech">
        {/* <MapPin className='w-6 h-6' /> */}
        </FavouriteItem>
        <FavouriteItem label="Metaverse">
        {/* <Navigation2 className='w-6 h-6' /> */}
        </FavouriteItem>
        <FavouriteItem label="Blockchain">
        {/* <Activity className='w-6 h-6' /> */}
        </FavouriteItem>
    </div>
  )
}

export default YourFavourite