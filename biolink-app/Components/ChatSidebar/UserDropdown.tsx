'use client'
import { Mail, Bell, ChevronDown} from "react-feather"
import Image from 'next/image'
import { observer } from 'mobx-react-lite';
import React,{ useState } from "react";
import { User } from "@/models/User";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  user: User
}

const UserDropdown = ({user}: Props) => {
  const [dropdown, setDropdown] = useState(false);
  
  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <div className="flex justify-between items-center pt-2 px-3">
        <Mail className="text-tertiary cursor-pointer hover:text-white duration-200" />
        <Bell className="text-tertiary cursor-pointer hover:text-white duration-200" />
        <div className="relative">
          <div onClick={toggleDropdown} className="flex items-center justify-between group cursor-pointer">
              <p className="text-sm tracking-wide font-medium mr-2 text-tertiary group-hover:text-white duration-200">
                  { user.displayName?.length !== 0 ? user.displayName : user.username }
              </p>
              <Image
                  src={user.image ?? '/profile-pic.jpg'}
                  width={35}
                  height={35}
                  className="rounded-full"
                  alt="Picture of the author"
              />  
              <ChevronDown className="text-tertiary group-hover:text-white duration-200" />
              {dropdown &&
              <div className="absolute top-full left-0 w-full bg-secondary text-center rounded-b-md">
                <Link href={'/user'} className="p-2 hover:text-black duration-200">Profile</Link>
                <p onClick={() => signOut()} className="p-2 hover:text-black duration-200">Logout</p>
              </div>
              }
          </div>
        </div>
    </div>  
  )
}

export default observer(UserDropdown)