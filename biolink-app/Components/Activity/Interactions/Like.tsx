import { Heart } from "react-feather"

const Like = () => {
  return (
    <div className="flex gap-2 text-sm tracking-widest text-gray-400 hover:text-white">
        <Heart className="w-5 h-5" />
        <p>87</p>
    </div>
  )
}

export default Like