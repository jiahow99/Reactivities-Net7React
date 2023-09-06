import { makeAutoObservable } from "mobx";
import { User, UserFormValues } from "../models/User";
import { AccountAPI } from "../../api/api";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (values: UserFormValues) => {
        try {
            const user = await AccountAPI.login(values);
            console.log(user);
            
        } catch (error) {
            throw error;
        }
    }
    
}