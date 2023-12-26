'use client'
import React, { useState } from 'react'
import Tags from './Tags'
import { Navigation, Calendar, Image } from 'react-feather'
import '@/app/activity/activity.css'
import Location from './Location'
import DateActivity from './DateActivity'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { Field, Form, Formik } from 'formik';
import {  ActivityForm } from '@/models/Activity'
import { PhotoUpload } from '../CreateActivity/PhotoUpload'
import {v4 as uuid} from 'uuid';
import {observer} from 'mobx-react-lite'
import userStore from '@/stores/UserStore'
import { useSession } from 'next-auth/react'
import { User } from '@/models/User'
import { useRouter } from 'next/navigation'
import commonStore from '@/stores/CommonStore'


const CreateActivity = () => {
    const {user, openModal} = userStore;
    const [detailType, setDetailType] = useState<string>();
    const [files, setFiles] = useState();
    const [titleInvalid, setTitleInvalid] = useState(false);
    const [categoryInvalid, setCategoryInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);

    // Router
    const router = useRouter()

    const { setLoading } = commonStore;

    // NextAuth session
    const session = useSession();
    const { status, data } = session;

    // Open and close location and datetime options
    const handleDetail = (type: string) => {
        type === detailType
            ? setDetailType('')     // Close
            : setDetailType(type);  // Open
    }

    // Form values
    const initialValues: ActivityForm = new ActivityForm();

    // Check form values
    const formIsValid = (values: ActivityForm) => {
        if (values.title === "") {
            setTitleInvalid(true);
            return false;
        } else {
            setTitleInvalid(false);
        }

        if (values.description === "") {
            setDescriptionInvalid(true);
            return false;
        } else {
            setDescriptionInvalid(false);
        }

        if (values.city === "" || values.venue === "") {
            setDetailType("location");
            return false;
        }

        if (!values.date === undefined) {
            setDetailType("date");
            return false;
        }

        if (values.images.length === 0) {
            setDetailType("photoUpload");
            return false;
        }

        if (values.category.length === 0) {
            setCategoryInvalid(true);
            return false;
        }

        return true;
    }

    // Form submit
    const handleSubmit = async (values: ActivityForm) => {
        // Active user
        const user = data?.user as User;

        // Create formData
        if (formIsValid(values) && user) {
            try {
                // Show loading
                setLoading(true);
                
                // Form data
                const formData = new FormData();
                formData.append('id', uuid());
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('category', values.category);
                formData.append('venue', values.venue);
                formData.append('city', values.city);
                formData.append('date', values.date ? values.date.toISOString() : '');
        
                // Add image files
                for (let i = 0; i < values.images.length; i++) {
                    formData.append('images', values.images[i]);
                }
                
                // API Call
                const response = await fetch(process.env.NEXT_PUBLIC_API_PREFIX + '/activity', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                    method: 'POST',
                    body: formData,
                })
                
                // Successful, append activity
                if (response.ok) {
                    router.refresh();
                // Fail
                } else {
                    console.log("Error", response.statusText);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }

    }

    return status === 'authenticated' && data.user
    ? (
        <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            { ({handleSubmit, isSubmitting}) => (
                <Form onSubmit={handleSubmit} className="w-full lg:w-7/12 bg-primary my-5 py-3 px-5 transition-all duration-300">
                    <div className={`flex gap-1 items-center flex-wrap ${categoryInvalid && 'border-2 border-red-500'}`}>
                        <p className='font-semibold'>Tags :</p>
                        <Tags label="Web3" />
                        <Tags label="Birds" />
                        <Tags label="Metaverse" />
                        <Tags label="Blockchain" />
                        <Tags label="Speech" />
                    </div>

                    <Field 
                        name="title" 
                        className={
                            `w-full bg-transparent border-2 p-2 my-3 tracking-wider text-sm
                            ${titleInvalid ? 'border-red-500' : 'border-secondary'}
                        `}
                        placeholder='Your activity title #'  
                    />

                    <div className="w-full flex items-center my-2" >
                        <div className="w-2/12 flex items-center justify-center">
                            <img src="/profile-pic.jpg" className='w-20 h-20 rounded-full' alt="profile-pic" />
                        </div>
                        <Field 
                            as="textarea" name="description" 
                            rows={3} 
                            className={
                                `w-10/12 bg-transparent border-2 border-secondary rounded-md p-3 text-sm font-medium tracking-wider
                                ${descriptionInvalid ? 'border-red-500' : 'border-secondary'}    
                            `} 
                            placeholder='Write something about yout event ...' 
                        /> 
                    </div>

                    <div className="flex justify-between px-3 py-1 flex-wrap">
                        <div className="flex flex-wrap">
                            <div onClick={() => handleDetail('location')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 py-2 rounded-full ease-out duration-100 ${detailType==='location' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >
                                <Navigation className='w-5 h-5' />
                                <p>Location</p>
                            </div>
                            <div onClick={() => handleDetail('date')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 py-2 rounded-full ease- duration-100 ${detailType==='date' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >                    
                                <Calendar className='w-5 h-5' />
                                <p>Date</p>
                            </div>
                            <div onClick={() => handleDetail('photoUpload')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 py-2 rounded-full ease-out duration-100 ${detailType==='photoUpload' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >                    
                                <Image className='w-5 h-5' />
                                <p>Photos</p>
                            </div>
                        </div>

                        <button type='submit' className='create'>Submit</button>
                    </div>
                    
                    <SlideDown>
                        {detailType === 'location' && <Location handleDetail={handleDetail} />}
                        {detailType === 'date' && <DateActivity handleDetail={handleDetail} />}
                        {detailType === 'photoUpload' && <PhotoUpload />}
                    </SlideDown>
                </Form>
            ) }            
        </Formik>)
    : (
        <div className='w-7/12 bg-primary my-5 py-3 px-5 flex gap-6 items-center justify-center'>
            <button className='create' onClick={openModal}>Login</button>
            <p>to create activity</p>
        </div>
    )
}

export default observer(CreateActivity)