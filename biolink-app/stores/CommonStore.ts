import { makeAutoObservable } from "mobx";

class CommonStore {
    // Property
    loading = false;
    sidebarOpen = false;
    searchOpen = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Toggle sidebar
    toggleSidebar = () => {
        this.sidebarOpen = !this.sidebarOpen
    }

    // Open and close search
    openSearch = () => {
        this.searchOpen = true
    }
    closeSearch = () => {
        this.searchOpen = false
    }

    // Set loading
    setLoading = (value: boolean) => {
        this.loading = value;
    }
}

const commonStore = new CommonStore();
export default commonStore;