import { DetailsForm, User } from "@/models/User";
import { makeAutoObservable, runInAction } from "mobx";
import commonStore from "./CommonStore";
import { Profile } from "@/models/Profile";

class UserStore {
    // Property
    user?: User;
    token: string | null = typeof window !== 'undefined' ? window.localStorage.getItem("jwt") : null;
    modalOpen = false;
    isLoading = false;

    // Constructor
    constructor() {
        makeAutoObservable(this);
    }

    // Photo upload
    uploadPhoto = async (file: Blob, token: string) => {
        // Show loading
        this.setLoading(true);

        // Form data
        let formData = new FormData();
        formData.append('File', file);
        
        // Call API
        return await fetch(process.env.NEXT_PUBLIC_API_PREFIX + '/photo/upload', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'POST',
            body: formData
        }).finally(() => this.setLoading(false));
    }

    // Update user details
    updateUser = async (values: DetailsForm, token: string) => {
        // Show loading
        this.setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Call API
        return await fetch(process.env.NEXT_PUBLIC_API_PREFIX + "/account/update", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT',
            body: JSON.stringify(values)
        }).finally(() => this.setLoading(false));
    }
    
    // Open modal
    openModal = () => {
        if (this.user) return ;
        this.modalOpen = true;
    }

    // Close modal
    closeModal = () => {
        this.modalOpen = false;
    }

    // Fetch user with token
    fetchUser = async () => {
        this.isLoading = true;

        // Call API
        const response = await fetch("http://localhost:5000/api/account", {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).finally(() => {
            runInAction(() => this.isLoading = false);
        });
        
        // Fail
        if (!response.ok) {
            this.setUser(undefined);
            return null;
        }

        // Set user
        const user:User = await response.json();
        this.setUser(user);
    }

    // Follow / unfollow
    handleFollow = async (targetUsername: string, token: string) => {
        return await fetch(process.env.NEXT_PUBLIC_API_PREFIX + `/follow/${targetUsername}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST'
        })
    }

    private setUser = (user: User | undefined) => {
        this.user = user;
    }
    private setLoading = (value: boolean) => {
        const { setLoading } = commonStore;
        // Show loading
        setLoading(value);
    }
}

const userStore = new UserStore();

export default userStore;