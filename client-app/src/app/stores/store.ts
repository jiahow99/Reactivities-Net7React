import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

const StoreContext = createContext(store);

function useStore() {
    return useContext(StoreContext);
}

export {store, StoreContext, useStore};