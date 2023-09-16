import { Mail, Bell, ChevronDown} from "react-feather"
import Image from 'next/image'

const UserDropdown = () => {
  return (
    <div className="flex justify-between items-center pt-2 px-5">
        <Mail className="text-tertiary cursor-pointer hover:text-white duration-200" />
        <Bell className="text-tertiary cursor-pointer hover:text-white duration-200" />
        <div className="flex items-center justify-between group cursor-pointer">
            <p className="text-sm tracking-wide font-medium mr-2 text-tertiary group-hover:text-white duration-200">
                Jia Hao
            </p>
            <Image
                src="/profile-pic.jpg"
                width={35}
                height={35}
                className="rounded-full"
                alt="Picture of the author"
            />  
            <ChevronDown className="text-tertiary group-hover:text-white duration-200" />
        </div>
    </div>  
  )
}

export default UserDropdown