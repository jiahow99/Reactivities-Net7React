import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store {
    activityStore: ActivityStore
}

const store: Store = {
    activityStore: new ActivityStore()
}

const StoreContext = createContext(store);

function useStore() {
    return useContext(StoreContext);
}

export {store, StoreContext, useStore};