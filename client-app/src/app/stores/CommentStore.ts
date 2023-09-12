import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Comment } from "../models/Comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    comments: Comment[] = [];
    hubConnection:  HubConnection | null = null;
    chatLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Start hub connection
    createHubConnection = (activityId: string) => {
        this.setChatLoading(true);

        // There is selected activity ...
        if(store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.commonStore.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            
            // Start connection 
            this.hubConnection.start().catch(error => console.log("Error establishing connection", error))

            // "Load Comments"
            this.hubConnection.on("LoadComments", (comments: Comment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    });
                    this.comments = comments
                });
                this.setChatLoading(false);
            });

            // "Receive Comment"
            this.hubConnection.on("ReceiveComment", (comment: Comment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.push(comment);
                });
            })
        }        
    }

    // Stop hub connection
    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error stoping connection", error));
    }

    // Clear comments and stop connection
    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    // Add comment
    addComment = async (formValues: any) => {
        // Trigger "SendComment" with form values to API
        formValues.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke("SendComment", formValues);
        } catch (error) {
            console.log(error);
        }
    }

    private setChatLoading(value: boolean) {
        this.chatLoading = value;
    }
}