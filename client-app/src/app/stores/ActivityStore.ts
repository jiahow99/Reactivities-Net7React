import { makeAutoObservable, runInAction } from "mobx";
import api from "../../api/api";
import { Activity } from "../models/Activity";
import {v4 as uuid} from 'uuid';
import { format } from "date-fns";

class activityStore {
    activitiesRegistry = new Map<string, Activity>() ;  // id => Activity
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    isLoading = false; 

    constructor() {
        makeAutoObservable(this);
    }

    // Convert activities:Map to activities:Array
    get activities() {
        return Array.from(this.activitiesRegistry.values());
    }

    // Get activities by date
    get activitiesGroupByDate() {
        // date: Activity[]
        const groupedData = new Map<string, Activity[]>();

        this.activities.forEach(activity => {
            const date = format(activity.date!, 'dd MMM yyyy');
            // If the map dont have the date, initialize an empty array for it
            if(!groupedData.has(date)) {
                groupedData.set(date, []);
            }
            // Push the activity into their corresponding activity
            groupedData.get(date)!.push(activity);
        })

        // Sort the array by date
        const sortedData = Array.from(groupedData.entries()).sort((a, b) => {
            const dateA = new Date(a[0]).getTime();
            const dateB = new Date(b[0]).getTime();
            return dateB - dateA; // Sort in descending order
        });

        // Return sorted date
        return sortedData;
    }

    // Load all activities
    loadActivities = async () => {
        this.isLoading = true;
        try {
            // Call API
            const activities = await api.index();

            activities.forEach(activity => {
                // Format date
                activity.date = new Date(activity.date!);
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

    // Load single activity
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        
        if(activity) {
            // If activity found
            this.setActivity(activity);
            return activity;
        }
        else {
            // Else call API
            try {
                // Call API and set the activity
                activity = await api.show(id);
                this.setActivity(activity);

            } catch (error) {
                console.log(error);
            }
        }
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

    // Create activity
    createActivity = async (activity: Activity) => {
        try {
            // New id
            activity.id = uuid();
            // Call API & Add activity into "activitiesRegistry"
            await api.create(activity);
            runInAction(() => this.activitiesRegistry.set(activity.id, activity));

        } catch (error) {
            console.log(error);   
        }
    }

    // Update activity
    updateActivity = async (activity: Activity) => {
        try {
            // Call API & Update activity in "activitiesRegistry"
            await api.update(activity);
            runInAction(() => this.activitiesRegistry.set(activity.id, activity));

        } catch (error) {
            console.log(error);   
        }
    }

    // Get activity helper function
    private getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    setActivity = (activity: Activity) => {
        this.selectedActivity = activity;
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