import { makeAutoObservable } from "mobx";
import api from "../../api/api";
import { Activity } from "../models/Activity";

class activityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    isLoading = false; 

    constructor() {
        makeAutoObservable(this);
    }

    // Load all activities
    loadActivities = async () => {
        this.isLoading = true;
        try {
            // Call API
            const activities = await api.index();
            // Format date
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
            });
            // Set store data
            this.setActivities(activities);

        } catch (error) {
            console.log(error);
        }
        this.setIsLoading(false);
    }

    // Select one activity
    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }

    // Deselect activity
    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }

    // Open edit form
    openEdit = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity(); 
        this.editMode = true; 
    }

    // Close edit form
    closeEdit = () => {
        this.editMode = false;
    }

    setIsLoading = (state: boolean) => {
        this.isLoading = state;
    }

    setActivities = (activities: Activity[]) => {
        this.activities = activities;
    }
}

export default activityStore;