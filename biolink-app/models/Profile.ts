export interface Profile {
    username: string;
    displayName: string | null;
    bio: string;
    image?: string;
    following: boolean,
    followersCount: number,
    followingCount: number,
}
