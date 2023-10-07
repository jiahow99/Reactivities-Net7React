import { Activity } from "./Activity";

export interface User {
    id: string;
    email: string;
    username: string;
    displayName: string | null;
    token: string;
    image: string;
    activities?: Activity[];
}

export class RegisterForm {
    email: string = '';
    username: string = '';
    password: string = 'Pa$$';
    confirmPassword: string = '';
    displayName: string = '';
    apiError: any = null;
}

export class LoginForm {
    email: string = '';
    password: string = '';
}

export class DetailsForm {
    public email: string = '';
    public username: string = '';
    public displayName: string = '';
    public image: string = '';
    public phoneNumber: string = '';

    constructor (user?: User) {
        Object.assign(this, user);
    }
}
