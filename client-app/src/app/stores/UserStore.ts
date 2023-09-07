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

    // Check active user
    get isLoggedIn() {
        return !!this.user;
    }

    // Get user's "username" if "displayname" is not set 
    get username() {   
        if(!this.user?.displayName || this.user?.displayName.length === 0) {
            return this.user?.username;
        }
    }

    // Login user
    login = async (values: UserFormValues) => {
        try {
            const user = await AccountAPI.login(values);    // Call login API
            store.commonStore.setToken(user.token); // Set Token to commonStore
            runInAction(() => this.user = user);    // Set user in store
            store.modalStore.closeModal();  // Close login modal
        } catch (error) {
            throw error;
        }
    }

    // Register user n 
    register = async (values: UserFormValues) => {
        try {
            const user = await AccountAPI.register(values); 
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);    // Set user in store
            store.modalStore.closeModal();  // Close login modal
            
        } catch (error) {   
            throw error;
        }
    }
    
    // Logout user
    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        
    }

    // Get current user
    getUser = async () => {
        try {
            const user = await AccountAPI.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}