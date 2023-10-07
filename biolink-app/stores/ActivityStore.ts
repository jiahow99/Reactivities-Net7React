import axios from "axios";
import { makeAutoObservable } from "mobx";
import userStore from "./UserStore";
import commonStore from "./CommonStore";

class ActivityStore {
    // Props
    isLoading = false;


    // Constructor
    constructor() {
        makeAutoObservable(this)
    }

    // Update attendance
    handleAttendance = async (activityId: string, token: string) => {
        if (!token) return;

        // Call API
        await axios.post(`http://localhost:5000/api/activity/${activityId}/attendance`,{}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // Set Loading
    setLoading = (value: boolean) => {
        this.isLoading = value;
    }

}

const activityStore = new ActivityStore();

export default activityStore;