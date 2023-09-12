import React, { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import { Field, FieldProps, Form, Formik } from 'formik';
import TextArea from '../../Form/TextArea';
import { observer } from 'mobx-react-lite';
import ChatLoading from './ChatLoading';
import ChatComponent from './ChatComponent';
import * as Yup from 'yup';

interface Props {
    activityId: string;
}

export default observer(function Chat({activityId}: Props) {

    const {commentStore} = useStore();
    const {comments, addComment, chatLoading} = commentStore;    

    // If activityId exist in props, then connect SignalR
    // Clear comments when unmount 
    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }

        return () => {commentStore.clearComments()};
        
    }, [commentStore, activityId])

    
    // Yup validation
    const validationSchema = Yup.object({
        message: Yup.string().required()
    })
    
    return (
        <div className="event-chat w-full mt-5 shadow-xl">
            <h1 className="font-medium text-center bg-white/20 backdrop-blur-sm py-2 rounded-t m-0">
                Chat about this event
            </h1>


            <div className="chat p-3 bg-secondary-custom flex flex-col gap-3">
                
                {!chatLoading
                ?   comments.map(comment => ( <ChatComponent key={comment.id} comment={comment} />))
                :   (<ChatLoading />)}

                {!chatLoading && comments.length === 0 && 
                <p className='text-lg font-medium text-gray-300 text-center py-5'>
                    No comments yet. Be the first to say something !
                </p>}


                <Formik
                    initialValues={{ message: '' }}
                    onSubmit={(values, {resetForm}) => addComment(values).then(() => resetForm())}
                    validationSchema={validationSchema}
                >
                    {
                    ({isSubmitting, isValid, handleSubmit}) => (
                        <Form>
                            <div className="flex justify-between gap-5 items-start">
                                <div className="w-10/12">
                                    <Field name="message">
                                        {
                                        ((props: FieldProps) => (
                                            <textarea 
                                                rows={1}
                                                className='w-full bg-white/50 backdrop-blur-sm rounded-md focus-within:bg-white duration-200 text-black font-medium'
                                                placeholder='(Enter to submit, SHIFT + Enter for new line)'
                                                {...props.field}
                                                onKeyDown={e => {
                                                    // Shift + Enter
                                                    if (e.key === 'Enter' && e.shiftKey) {
                                                        return; // Intert new line
                                                    }
                                                    // Enter to submit
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        isValid && handleSubmit(); 
                                                    }
                                                }}
                                            ></textarea>
                                        ))
                                        }
                                    </Field>
                                </div>
                                <div className="w-2/12 h-full">
                                    <button type='submit' disabled={!isValid} className='px-3 py-2 h-full btn-secondary'>
                                        Comment
                                        {isSubmitting && <i className="fa-solid fa-circle-notch ml-2 animate-spin" />}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
})