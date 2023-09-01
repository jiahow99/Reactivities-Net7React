import { makeAutoObservable, runInAction } from "mobx";
import api from "../../api/api";
import { Activity } from "../models/Activity";

class activityStore {
    activitiesRegistry = new Map<string, Activity>() ;  // id => Activity
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    isLoading = false; 

    constructor() {
        makeAutoObservable(this);
    }

    get activities() {
        return Array.from(this.activitiesRegistry.values());
    }

    // Load all activities
    loadActivities = async () => {
        this.isLoading = true;
        try {
            // Call API
            const activities = await api.index();

            activities.forEach(activity => {
                // Format date
                activity.date = activity.date.split('T')[0];
                // Set each activity into a Map
                runInAction(() => {
                    this.activitiesRegistry.set(activity.id, activity);
                })
            });

        } catch (error) {
            console.log(error);
        }
        this.setIsLoading(false);
    }

    // Delete activity
    deleteActivity = async (id: string) => {
        // Show loading
        this.setIsLoading(true); 

        try {
            // Call API and remove it from Map
            await api.delete(id);
            runInAction(() => this.activitiesRegistry.delete(id))

        } catch (error) {
            console.log(error);
        }

        // Disable loading
        this.setIsLoading(false);
    }

    // Select one activity
    selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
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

}

export default activityStore;