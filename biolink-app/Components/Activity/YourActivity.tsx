'use client'
import userStore from "@/stores/UserStore"
import ActivityDetail from "./ActivityDetail"
import {observer} from 'mobx-react-lite'
import React from "react"
import { useSession } from "next-auth/react"

const YourActivity = () => {
  const {openModal} = userStore;

  // NextAuth session
  const session = useSession();
  const { status, data } = session;
  
  return (
    <div className="w-full lg:w-5/12 my-5 py-3 px-5 bg-primary h-fit rounded-md">
      {status === 'authenticated' && data.user ? 
        <>
          <h1 className="text-xl text-tertiary font-semibold">Your Activities</h1>
          <div className="flex flex-col gap-2 mt-2">
              <ActivityDetail name="Metaverse Speech" venue="New Jersey" />
              <ActivityDetail name="Web 3 Intro" venue="Singapore" />
              <ActivityDetail name="Smart Contract" venue="Malaysia" />
          </div> 
        </>
        :
        <>
          <div className="flex gap-5 items-center">
            <button className="create" onClick={openModal}>Login</button>
            <p>to view your activities</p> 
          </div>
        </>
      }
        
        
    </div>

    
  )
}

export default observer(YourActivity)