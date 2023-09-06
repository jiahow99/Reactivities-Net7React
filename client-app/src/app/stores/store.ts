import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import ModalStore from "./ModalStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}

const StoreContext = createContext(store);

function useStore() {
    return useContext(StoreContext);
}

export {store, StoreContext, useStore};