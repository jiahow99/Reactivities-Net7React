import { Profile } from "@/models/Profile"
import { IsGoing } from "./IsGoing"
import { IsHost } from "./IsHost"

interface Props {
  host: Profile
  attendees: Profile[]
}

export const AttendeeSection = ({host, attendees}: Props) => {
  
  return (
    <div className="flex flex-col sm:flex-row gap-5">
        <IsHost host={host} />
        <IsGoing attendees={attendees} />
    </div>
  )
}
