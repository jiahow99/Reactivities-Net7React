import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore";

interface Store {
    activityStore: ActivityStore;
    userStore: UserStore;
}

const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore()
}

const StoreContext = createContext(store);

function useStore() {
    return useContext(StoreContext);
}

export {store, StoreContext, useStore};