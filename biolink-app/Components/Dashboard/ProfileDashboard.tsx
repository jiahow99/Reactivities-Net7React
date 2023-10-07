'use client'
import Image from "next/image"
import Menu from "./Menu"
import {observer} from "mobx-react-lite"
import { useSession } from "next-auth/react"
import { User } from "@/models/User"

const ProfileDashboard = () => {
    const session = useSession();
    const user = session.data?.user as User;

    return (
        <>
            <div className="relative">
                <img className="w-full h-60 object-cover rounded-t-lg" src="/profile-cover.jpg" alt="profile-cover"  />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
                {user && (
                <>
                    <div className="hidden lg:block absolute bottom-6 pl-52">
                        <p className="font-semibold text-3xl">{ user.displayName ?? user.username }</p>
                    </div>
                    <div className="hidden lg:block absolute -bottom-10 pl-10">
                        <Image 
                            src={user.image ?? "https://imgs.search.brave.com/9yNHVtcWmNqn_j6d2pIN9feJYVIWF2CPE-r3Z6okIcM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk2LzI4Lzg0/LzM2MF9GXzk2Mjg4/NDA0X1VlSGNqQ0Yy/TEt4bzV6d2hrSG5W/bk0xQnpNUk54akpI/LmpwZw"}
                            width={1000}
                            height={1000}
                            loading="lazy"
                            alt="profile_pic"
                            className="rounded-full w-32 h-32"
                        />
                    </div>

                    <div className="lg:hidden block absolute top-10 left-1/2 -translate-x-1/2">
                        <div className="flex flex-col gap-5">
                            <Image 
                                src={user.image ?? "https://imgs.search.brave.com/9yNHVtcWmNqn_j6d2pIN9feJYVIWF2CPE-r3Z6okIcM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzk2LzI4Lzg0/LzM2MF9GXzk2Mjg4/NDA0X1VlSGNqQ0Yy/TEt4bzV6d2hrSG5W/bk0xQnpNUk54akpI/LmpwZw"}
                                width={1000}
                                height={1000}
                                loading="lazy"
                                alt="profile_pic"
                                className="rounded-full w-32 h-32"
                            />
                            <p className="font-semibold text-3xl">{ user.displayName ?? user.username }</p>
                        </div>
                    </div>
                </>
                )}
            </div>
            
            <div className="w-full bg-primary hidden sm:block">
                <div className="flex w-fit lg:w-full ml-auto lg:pl-52">
                    <Menu label="Timeline" to="/activity" />
                    <Menu label="Upcoming" to="/activity/upcoming" />
                    <Menu label="Ongoing" to="/activity/ongoing" />
                    <Menu label="More" to="" />
                </div>
            </div>
        </>
  )
}

export default observer(ProfileDashboard)