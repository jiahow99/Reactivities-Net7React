import activityStore from "@/stores/ActivityStore"
import { getSessionData } from "@/utils/getActiveUser"
import { NextFontWithVariable } from "next/dist/compiled/@next/font"
import { Loader, XCircle } from "react-feather"

interface Props {
  activityId: string
  font: NextFontWithVariable
  setIsCancel: (value: boolean) => void
}

export const CancelEvent = ({font, activityId, setIsCancel}: Props) => {
  const {handleAttendance, isLoading} = activityStore;
  const {user} = getSessionData();

  const cancelEvent = () => {
    handleAttendance(activityId, user.token)
      .then(() => {
        setIsCancel(true);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
        <button onClick={cancelEvent} className="btn-secondary checked text-sm ml-5">
            <span className={`button-content flex gap-3 items-center font-medium tracking-wider ${font.className}`}>
                Cancel Event
                {isLoading 
              ? <Loader className="animate-spin" /> 
              : <XCircle />}  
            </span>
        </button>
    </div>
    
  )
}
