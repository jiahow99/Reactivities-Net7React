import { makeAutoObservable } from 'mobx';


class ChatStore {
    commentOpen = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    toggleComment = () => {
        this.commentOpen = !this.commentOpen;
    }
}

const chatStore = new ChatStore();

export default chatStore;