import { makeAutoObservable } from "mobx";


export default class CommonStore {
    modalOpen : boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Open modal
    openModal = () => {
        this.modalOpen = true;
    }

    // Close modal
    closeModal = () => {
        this.modalOpen = false;
    }

}