'use client'
import React, { useEffect, useState } from 'react'
import ChatComponent from './ChatComponent';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import ChatReply from './ChatReply';
import ChatLoading from './ChatLoading';
import userStore from '@/stores/UserStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Comment } from '@/models/Comment';
import { useSession } from 'next-auth/react';
import { User } from '@/models/User';
import { observer } from 'mobx-react-lite'

interface Props {
    activityId: string
    font: NextFontWithVariable
}


const ChatSection = ({font, activityId}: Props) => {
    // useSession
    const session = useSession();
    const { status, data } = session;
    const user = data?.user as User;
    // Loading
    const [chatLoading, setChatLoading] = useState(false);
    const [addingChat, setAddingChat] = useState(false);
    // Comments
    const [comments, setComments] = useState<Comment[]>([]);
    // Hub Connection
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null); // Declare hubConnection state

    const {openModal} = userStore;

    // Create hub connection
    const createHubConnection = (activityId: string) => {
        if(status !== 'authenticated' && !user) return;

        // Show loading
        setChatLoading(true);
        
        setTimeout(() => {
                    // Build conenction
        const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
            accessTokenFactory: () => user.token
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    
        // Set hubConnection state
        setHubConnection(connection);

        // Start connection
        connection.start()
            .finally(() => setChatLoading(false))
            .catch(error => console.log("Error establishing connection", error))

        // "Load Comments"
        connection.on("LoadComments", (comments: Comment[]) => {
            setComments(comments);
        })

        // "Receive Comments"
        connection.on("ReceiveComment", (comment: Comment) => {
            setComments((prevComments) => [...prevComments, comment])       
        })
        }, 2000)        
    }

    // Stop connection
    const stopHubConnection = () => {
        if (!hubConnection) return;

        hubConnection.stop().catch(error => console.log("Error stopping connection", error));
        setHubConnection(null);
        setComments([]);
    }

    // Send message
    const addComment = async (formValues: any) => {           
        if (!hubConnection || activityId.length === 0) return;
        
        setAddingChat(true);   // Show loading
        formValues.activityId = activityId; // Add activity ID

        // Call APi
        try {
            await hubConnection.invoke("SendComment", formValues)
                .finally(() => setAddingChat(false));
        } catch (error) {
            console.log(error);
        }
    }

    // Start chat connection onmount and stop connection on unmount
    useEffect(() => {
        createHubConnection(activityId);
        return () => stopHubConnection();
    }, [activityId])


    return status === 'authenticated' 
    ? (
        <div className=''>
            {chatLoading && <ChatLoading />}
            
            {!chatLoading && comments.length > 0 && 
                <div className='h-44 overflow-y-scroll overscroll-contain'>
                    {comments.map(comment => ( <ChatComponent key={comment.id} comment={comment} font={font} />))}
                </div>
            }

            {!chatLoading && comments.length === 0 &&
                <p className='sm:text-lg font-medium text-gray-300 text-center py-5 h-44'>
                    No comments yet. Be the first to say something !
                </p>
            }

            <ChatReply addComment={addComment} addingChat={addingChat} />
        </div>
    )
    : (
        <div className="text-center">
            <p className='text-lg font-medium text-gray-300 text-center py-5 h-44'>
                Login to post something great !
            </p>
            <button onClick={openModal} className='create'>Login</button>
        </div>
    )
}

export default observer(ChatSection)