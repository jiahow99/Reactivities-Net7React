import React, {  useEffect, useState } from 'react';
import { useStore } from '../app/stores/store';
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from './Form/TextInput';
import TextArea from './Form/TextArea';
import SelectInput from './Form/SelectInput';
import { categoryOptions } from '../app/options/CategoryOptions';
import DateInput from './Form/DateInput';
import { Activity } from '../app/models/Activity';

export default observer(function ActivityForm() {

    // Mobx
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity} = activityStore;
    
    // Use params
    const {id} = useParams();

    // Navigate
    const navigate = useNavigate();

    // Activity 
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    // Yup validation
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        date: Yup.string().required(),
        category: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })


    // Fetch activity if edit, else load empty activity
    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        } 
        else {
            setActivity({
                id: '',
                title: '',
                date: null,
                description: '',
                category: '',
                city: '',
                venue: ''
            });
        }
    }, [id, loadActivity])

    

    // Submit
    function createSubmit(activity: Activity){                
        try {
            // Create 
            if(activity.id.length === 0) {
                createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
            }
            // Update
            else {
                updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
            }
        } catch (error) {
            console.log(error);
            
        } 
    }

    

    return (
        <div className='w-1/2 mx-auto mt-10'>
            <Formik 
                enableReinitialize
                initialValues={activity} 
                onSubmit={values => createSubmit(values)}
                validationSchema={validationSchema}
            >
                { ({handleSubmit, isValid, isSubmitting, dirty, getFieldProps}) => (
                    <Form onSubmit={handleSubmit} className="w-full bg-[#7F5A83] p-5 flex flex-col gap-5 rounded-lg" autoComplete='off'>
                        <TextInput name='title' placeholder='Activity title' />
                        <TextArea name='description' rows={5} placeholder='Description' />
                        <SelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <DateInput 
                            name='date'
                            placeholderText='Date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <TextInput name='venue' placeholder='Venue' />
                        <TextInput name='city' placeholder='City' />
                        
                        
                        <button 
                            type='submit' 
                            className={`w-full py-2 rounded-lg font-semibold tracking-wider ${dirty && isValid && getFieldProps('category').value !== 'null' ? 'bg-tertiary-custom' : 'bg-gray-500'} `}
                            disabled={!dirty || !isValid || getFieldProps('category').value === 'null'}
                        >
                            Submit
                            {isSubmitting && <i className="fa-solid fa-circle-notch animate-spin ml-5" /> }
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})