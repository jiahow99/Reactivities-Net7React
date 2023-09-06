import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import { AccountAPI } from "../../api/api";
import { store } from "./store";
import { useNavigate } from "react-router-dom";


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
            const user = await AccountAPI.login(values);    // Call login API
            store.commonStore.setToken(user.token); // Set Token to commonStore
            runInAction(() => this.user = user);    // Set user in store
        } catch (error) {
            throw error;
        }
    }
    
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        
    }
}