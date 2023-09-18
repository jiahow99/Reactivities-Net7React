import { Profile } from "./Profile";

export interface Activity {
    id: string,
    title: string,
    date: string,
    description: string,
    category: string,
    city: string,
    venue: string,
    isCancelled: boolean,
    host: Profile,
    attendees: Array<Object>
}

export class ActivityForm {
    id?: string = undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date: Date | undefined = undefined;
    city: string = "";
    venue: string = "";

    constructor(activity?: ActivityForm) {
        if (activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.city = activity.city;
            this.venue = activity.venue;
        }
    }
}