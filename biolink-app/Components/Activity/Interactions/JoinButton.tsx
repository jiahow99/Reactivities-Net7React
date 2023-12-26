import { NextFontWithVariable } from "next/dist/compiled/@next/font"
import { Loader, PlusCircle } from "react-feather"
import { observer } from 'mobx-react-lite'
import activityStore from "@/stores/ActivityStore"
import { User } from "@/models/User"
import { getSessionData } from "@/utils/getActiveUser"
import toast from "react-hot-toast"

interface Props {
  activityId: string
  font: NextFontWithVariable
  setIsJoined: (value: boolean) => void
  addAttendee: () => void
}


export const JoinButton = observer(({activityId, font, setIsJoined, addAttendee}: Props) => {
  // Update attendance
  const { isLoading, handleAttendance, setLoading } = activityStore;

  // Active user
  const { user } = getSessionData();

  const addAttendance = async () => {
    // Loading toastr
    const loadingToast = toast.loading("Joining event");

    await handleAttendance(activityId, user.token)
      .then(() => {
        setIsJoined(true);
        addAttendee();
        toast.success("Successfully joined the event")
      })
      .catch(error => console.log(error))
      .finally(() => toast.dismiss(loadingToast))
  }

  return (
    <div>
      <button onClick={addAttendance} className="btn-secondary text-sm ml-5">
          <span className={`button-content flex gap-3 items-center font-medium tracking-wider ${font.className}`}>
              Join
              <PlusCircle />
          </span>
      </button>
    </div>
  )
})
