import { User } from "react-feather"
interface Props {
  toggleDetail: (type: string) => void
}

const Attendees = ({toggleDetail}: Props) => {
  return (
    <div onClick={() => toggleDetail("attendees")} className="flex gap-2 text-sm tracking-widest text-gray-400 hover:text-white cursor-pointer">
        <User className="w-5 h-5" />
        <p>87</p>
    </div>
  )
}

export default Attendees