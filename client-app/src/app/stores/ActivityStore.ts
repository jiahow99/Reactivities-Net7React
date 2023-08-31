import { makeAutoObservable } from "mobx";

class activityStore {
    title = 'Hello from MOBX';

    constructor() {
        makeAutoObservable(this);
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}

export default activityStore;