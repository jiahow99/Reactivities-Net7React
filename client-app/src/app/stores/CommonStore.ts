import { makeAutoObservable } from "mobx";


export default class CommonStore {
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)
    }

    setToken(token: string | null) {
        if (token) window.localStorage.setItem('jwt', token);   // Store in local storage (client)
        this.token = token;     // Set token in store
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
    
}