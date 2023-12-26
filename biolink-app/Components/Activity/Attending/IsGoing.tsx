import { Profile } from "@/models/Profile"
import { AttendeeComponent } from "./AttendeeComponent"

interface Props {
  attendees: Profile[]
}

export const IsGoing = ({attendees}: Props) => {
  
  return (
    <div className="w-full sm:w-1/2 bg-secondary/70 p-5 rounded-md">
        <div className="flex justify-between items-center h-full">
            <div className="w-6/12 sm:w-4/12 relative flex items-center h-full">
                <h1 className='text-xl font-medium ml-1 wrap'>Attendees</h1>
                <div className="absolute top-0 right-0 w-1 h-full bg-white rounded-full"></div>
            </div>

            <div className="w-5/12 sm:w-7/12 flex flex-col gap-2 max-h-56 overflow-y-auto">
              {attendees.map(attendee => 
                <AttendeeComponent attendee={attendee} />
              )}
            </div>
        </div>
    </div>
  )
}
