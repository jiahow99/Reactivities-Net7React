import Image from "next/image"

const Activity = () => {
  return (
    <div className="px-5 flex items-center">
        <div className="w-4/12">
            <Image 
                src="/profile-pic.jpg"
                width={50}
                height={50}
                className="rounded-full p-1 border-2 border-green-400"
                alt="profile-pic"
            />
        </div>
        <div>
            <p>Tom</p>
            <p className="text-tertiary text-xs font-medium">12 hours ago</p>
        </div>
    </div>
  )
}

export default Activity