import { User } from "./User";

export interface Profile {
    id: string;
    username: string;
    displayName: string | null;
    bio: string;
    image: string | null;
    following: boolean,
    followersCount: number,
    followingCount: number,
}

export class Profile implements Profile {
    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
        this.bio = '';
        this.following = false;
        this.followersCount = 0;
        this.followingCount = 0;
    }
}
