export interface Comment {
    id: number;
    message: string;
    createdAt: Date;
    username: string;
    displayName?: string;
    image: string;
}