import activityStore from "@/stores/ActivityStore"
import { getSessionData } from "@/utils/getActiveUser"
import { NextFontWithVariable } from "next/dist/compiled/@next/font"
import { Check, Loader } from "react-feather"
import toast from "react-hot-toast"

interface Props {
  activityId: string
  font: NextFontWithVariable
  setIsJoined: (value: boolean) => void
  removeAttendee: () => void
}

export const UnjoinButton = ({font, activityId, setIsJoined, removeAttendee}: Props) => {
  const {handleAttendance, isLoading} = activityStore;

  // Active user
  const { user } = getSessionData();

  const unjoin = () => {
    const loadingToast = toast.loading("Loading");

    handleAttendance(activityId, user.token)
      .then(() => {
        setIsJoined(false);
        removeAttendee();
        toast.success("You are removed from event")
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => toast.dismiss(loadingToast))
  }

  return (
    <div>
      <button onClick={unjoin} className="btn-secondary checked text-sm ml-5">
          <span className={`button-content flex gap-3 items-center font-medium tracking-wider ${font.className}`}>
              Unjoin
              {isLoading 
              ? <Loader className="animate-spin" /> 
              : <Check />}   
          </span>
      </button>
    </div>
  )
}
