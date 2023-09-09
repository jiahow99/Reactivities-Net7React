import { makeAutoObservable, runInAction } from "mobx";
import { ActivityAPI } from "../../api/api";
import { Activity, ActivityFormValues } from "../models/Activity";
import {v4 as uuid} from 'uuid';
import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/Profile";

class activityStore {
    activitiesRegistry = new Map<string, Activity>() ;  // id => Activity
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    isLoading = false; 

    constructor() {
        makeAutoObservable(this);
        
        this.loadActivities();
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
            const activities = await ActivityAPI.index();

            activities.forEach(activity => {
                // Format date
                activity.date = new Date(activity.date!);
                // Set each activity into a Map
                this.setActivity(activity);
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
            this.selectedActivity = activity;
        }
        else {
            // Else call API
            try {
                // Call API and set the activity
                activity = await ActivityAPI.show(id);
                this.selectedActivity = activity;
                return activity;
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
            await ActivityAPI.delete(id);
            runInAction(() => this.activitiesRegistry.delete(id))

        } catch (error) {
            console.log(error);
        }

        // Disable loading
        this.setIsLoading(false);
    }

    // Create activity
    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        // New id
        activity.id = uuid();
        try {
            // Call API & Add activity into "activitiesRegistry"
            await ActivityAPI.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            });

        } catch (error) {
            console.log(error);   
        }
    }

    // Update activity
    updateActivity = async (activity: ActivityFormValues) => {
        try {
            // Call API & Update activity in "activitiesRegistry"
            await ActivityAPI.update(activity);
            runInAction(() => {
                // Update activity in registry
                if(activity.id) {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity};  
                    this.activitiesRegistry.set(activity.id, updatedActivity as Activity );
                    this.selectedActivity = updatedActivity as Activity;
                }
            })
        } catch (error) {
            console.log(error);   
        }
    }

    // Get activity helper function
    private getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    // Set activity helper function
    private setActivity = (activity: Activity) => {
        
        const user = store.userStore.user;
        
        if (user) {
            // Check if loggedin user is going to the event
            activity.isGoing = activity.attendees!.some(attendee =>
                attendee.username === user.username
            );
            // Check is he host
            activity.isHost = activity.hostUsername === user.username;  
            // Set its profile to "host" attribute
            activity.host = activity.attendees?.find(attendee => attendee.username === activity.hostUsername);  
        }
        this.activitiesRegistry.set(activity.id, activity);
    }

    // Select one activity
    selectActivity = (id: string) => {
        this.selectedActivity = this.activitiesRegistry.get(id);
    }

    setIsLoading = (state: boolean) => {
        this.isLoading = state;
    }

    updateAttendance = async () => {
        // Set loading
        this.setIsLoading(true);
        const user = store.userStore.user;

        try {
            await ActivityAPI.attend(this.selectedActivity!.id);
            runInAction(() => {
                // Cancel join
                if(this.selectedActivity!.isGoing) {
                    this.selectedActivity!.attendees = this.selectedActivity?.attendees?.filter(a => a.username !== user?.username);
                    this.selectedActivity!.isGoing = false;
                } 
                // Join event
                else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);   // Add it into attendees
                    this.selectedActivity!.isGoing = true;  // Set isGoing = true
                }
                // Update activity list
                this.activitiesRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setIsLoading(false);
        }
    }

}

export default activityStore;