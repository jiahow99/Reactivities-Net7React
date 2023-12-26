'use client'
import Recents from "./Recents/Recents"
import { Contacts } from "./Contacts/Contacts"
import UserDropdown from "./UserDropdown"
import userStore from "@/stores/UserStore"
import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { useSession } from "next-auth/react"
import { User } from "@/models/User"
import { usePathname } from "next/navigation"

const ChatSidebar = () => {
    const { openModal } = userStore;
    const session = useSession();
    const { data, status } = session;
    
    const pathname = usePathname();

    return pathname !== '/' && (
    <>
        <div id="chat-sidebar" className="hidden lg:block w-2/12 h-screen fixed top-0 right-0 bg-primary  overflow-y-scroll">
            {status === 'authenticated' && data.user
            ? <UserDropdown user={data.user as User} /> 
            : (<button onClick={openModal} className="create mt-2" >
                    Login
                </button>)}
            
            <Recents />

            <Contacts />
        </div>

        <div className="w-2/12 hidden lg:block"></div>
    </>
    )
  }
  
  export default observer(ChatSidebar)