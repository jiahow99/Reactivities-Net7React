'use client'

import React, { useState } from 'react'
import Tags from './Tags'
import { Navigation, Calendar, Image } from 'react-feather'
import '@/app/activity/activity.css'
import Location from './Location'
import DateActivity from './DateActivity'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { Field, Formik } from 'formik';
import { ActivityForm } from '@/models/Activity'
import { PhotoUpload } from '../CreateActivity/PhotoUpload'

const CreateActivity = () => {
    const [detailType, setDetailType] = useState<string>();
    const [files, setFiles] = useState();
    const [titleInvalid, setTitleInvalid] = useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = useState(false);

    const {activityStore} = useStore();

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

        if (values.city || values.venue === "") {
            setDetailType("location");
            return false;
        }

        if (values.description === "") {
            setDescriptionInvalid(true);
            return false;
        } else {
            setDescriptionInvalid(false);
        }

        if (!values.images.length) {
            setDetailType("photoUpload");
            return false;
        }

        return true;
    }

    const handleSubmit = (values: ActivityForm) => {
        
    }

    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            { ({handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit} className="w-7/12 bg-primary my-5 py-3 px-5 transition-all duration-300">
                    <div className="flex gap-1 items-center ">
                        <p className='font-semibold'>Tags :</p>
                        <Tags label="Web3" />
                        <Tags label="Birds" />
                        <Tags label="Metaverse" />
                        <Tags label="Blockchain" />
                        <Tags label="Speech" />
                    </div>

                    <Field name="title" className='w-full bg-transparent border-2 p-2 border-secondary my-3 tracking-wider text-sm' placeholder='Your activity title #' />

                    <div className="w-full flex items-center my-2" >
                        <div className="w-2/12 flex items-center justify-center">
                            <img src="/profile-pic.jpg" className='w-20 h-20 rounded-full' alt="profile-pic" />
                        </div>
                        <Field as="textarea" name="description" rows={3} className='w-10/12 bg-transparent border-2 border-secondary rounded-md p-3 text-sm font-medium tracking-wider' placeholder='Write something about yout event ...' /> 
                    </div>

                    <div className="flex justify-between px-3 py-1">
                        <div className="flex">
                            <div onClick={() => handleDetail('location')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 rounded-full ease-out duration-100 ${detailType==='location' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >
                                <Navigation className='w-5 h-5' />
                                <p>Location</p>
                            </div>
                            <div onClick={() => handleDetail('date')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 rounded-full ease- duration-100 ${detailType==='date' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >                    
                                <Calendar className='w-5 h-5' />
                                <p>Date</p>
                            </div>
                            <div onClick={() => handleDetail('photoUpload')}
                                className={`location flex gap-2 items-center text-sm tracking-wide cursor-pointer px-4 rounded-full ease-out duration-100 ${detailType==='photoUpload' ? 'bg-gray-500' : 'hover:bg-gray-500' }`}
                            >                    
                                <Image className='w-5 h-5' />
                                <p>Photos</p>
                            </div>
                        </div>

                        <button className='create'>Submit</button>
                    </div>
                    
                    <SlideDown>
                        {detailType === 'location' && <Location handleDetail={handleDetail} />}
                        {detailType === 'date' && <DateActivity handleDetail={handleDetail} />}
                        {detailType === 'photoUpload' && <PhotoUpload setFiles={setFiles} />}
                    </SlideDown>
                </form>
            ) }            
        </Formik>
    )
}

export default CreateActivity