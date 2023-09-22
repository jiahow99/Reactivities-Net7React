import Image from "next/image"
import Menu from "./Menu"

const ProfileDashboard = () => {

    return (
        <>
            <div className="relative">
                <img className="w-full h-60 object-cover rounded-t-lg" src="/profile-cover.jpg" alt="profile-cover"  />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
                <div className="absolute bottom-6 pl-52">
                    <p className="font-semibold text-3xl">Jia Hao</p>
                </div>
                <div className="absolute -bottom-10 pl-10">
                    <img src="/profile-pic.jpg" className="w-32 h-32 rounded-full" alt="profile_pic" />
                </div>
            </div>
            
            <div className="w-full bg-primary pl-52">
                <div className="flex">
                    <Menu label="Timeline" to="/activity" />
                    <Menu label="Upcoming" to="/activity/upcoming" />
                    <Menu label="Ongoing" to="" />
                    <Menu label="More" to="" />
                </div>
            </div>
        </>
  )
}

export default ProfileDashboard