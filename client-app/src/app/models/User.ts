export interface User {
    username: string;
    displayName: string | null;
    token: string;
    image?: string
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string | null
}