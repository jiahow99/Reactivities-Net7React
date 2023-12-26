import Image from 'next/image'
import { Edit } from 'react-feather'

interface Props {
  imageUrl?: string
  setUploadOpen: (value: boolean) => void 
}

const CustomizePhoto = ({ imageUrl, setUploadOpen }: Props) => {
  return (
    <div className="w-4/12 mx-auto lg:mx-0 lg:border-r-4 border-purple-700 flex flex-col justify-center items-center gap-3 lg:py-20">
        <div className="w-9/12 relative group cursor-pointer">
            <Image 
                src={imageUrl ?? 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'}
                width={1000}
                height={1000}
                loading='lazy'
                className='rounded-full w-full object-cover'
                alt='profile-pic'
            />
            <div onClick={() => setUploadOpen(true)} className="absolute top-0 w-full h-full group-hover:bg-black/70 bg-black/70 lg:bg-transparent duration-200 rounded-full flex justify-center items-center z-10">
                <Edit className='w-10 h-10 group-hover:opacity-100 opacity-100 lg:opacity-0 duration-300' />
            </div>
        </div>
        <p className='font-medium'>Jiahow 99</p>
        <p className='text-gray-400'>jia_how99@hotmail.com</p>
    </div>
  )
}

export default CustomizePhoto