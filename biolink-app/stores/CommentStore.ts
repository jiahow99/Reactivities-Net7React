import { Comment } from '@/models/Comment';
import { makeAutoObservable, runInAction } from 'mobx';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import userStore from './UserStore';

class CommentStore {
    // Property
    comments: Comment[] = [];
    hubConnection: HubConnection | null = null;
    commentLoading = false;

    commentOpen = false;
    
    // Constructor
    constructor() {
        makeAutoObservable(this);
    }

    // Start connection
    createHubConnection = (activityId: string) => {
        // Stop all connection first
        if (this.hubConnection) this.stopHubConnection();

        const {token} = userStore;

        if(!token) return;

        // Show loading
        this.setCommentLoading(true);

        // Build conenction
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        // Start connection
        this.hubConnection.start().catch(error => console.log("Error establishing connection", error))

        // "Load Comments"
        this.hubConnection.on("LoadComments", (comments: Comment[]) => {
            runInAction(() => {
                this.comments = comments;
                this.setCommentLoading(false);
            });
        })

        // "Receive Comments"
        this.hubConnection.on("ReceiveComment", (comment: Comment) => {
            runInAction(() => {
                this.comments.push(comment);
                this.setCommentLoading(false);
            });
        })
    }

    // Stop connection
    stopHubConnection = () => {
        if (!this.hubConnection) return;

        this.hubConnection.stop().catch(error => console.log("Error stopping connection", error));
        this.hubConnection = null;
        this.comments = [];
    }
    
    private setCommentLoading = (value: boolean) => {
        this.commentLoading = value;
    }
}

const commentStore = new CommentStore();

export default commentStore;