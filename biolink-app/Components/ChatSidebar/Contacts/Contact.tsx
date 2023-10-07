import Image from "next/image"

interface Props {
  image: string
  username: string
}
const Contact = ({ image, username }: Props) => {
  return (
    <div className="px-5 flex justify-between items-center">
      <div className="w-4/12">
        <Image 
            src={image}
            width={50}
            height={50}
            className="rounded-full p-1 border-2 border-green-400"
            alt="profile-pic"
        />
      </div>

      <div className="w-8/12">
        { username }
      </div>
      
      <div className="w-1/12">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

    </div>
  )
}

export default Contact