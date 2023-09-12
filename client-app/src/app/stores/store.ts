import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";
import UserStore from "./UserStore";
import CommonStore from "./CommonStore";
import ModalStore from "./ModalStore";
import CommentStore from "./CommentStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commentStore: CommentStore;
}

const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore(),
}

const StoreContext = createContext(store);

function useStore() {
    return useContext(StoreContext);
}

export {store, StoreContext, useStore};