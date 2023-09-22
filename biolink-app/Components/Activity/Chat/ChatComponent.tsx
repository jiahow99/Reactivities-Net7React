import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import Image from 'next/image';

interface Props {
    font: NextFontWithVariable
}

const ChatComponent = ({font}: Props) => {
  return (
    <div className="w-full flex gap-3">
        <div className="w-1/12 flex justify-center">
            <Image src={'/profile-pic.jpg'} width={60} height={60} loading='lazy' className='rounded-full w-fit h-fit' alt='profile' />
        </div>
        <div className='w-11/12'>
            <div className="flex flex-col gap-1 bg-secondary/70 p-3 rounded-lg">
                <div className="flex gap-3 items-center font-medium">
                    <p className='text-sm'>Wilson</p>
                    <p className='text-xs text-gray-400'>2 min ago</p>
                </div>
                <p className={`font-poppins ${font.className} text-sm`}>
                    Message goes here
                </p>
            </div>
            <p className='text-xs font-medium text-gray-400 pl-3 py-2 cursor-pointer hover:text-white'>
                Reply
            </p>
        </div>
    </div>
  )
}

export default ChatComponent