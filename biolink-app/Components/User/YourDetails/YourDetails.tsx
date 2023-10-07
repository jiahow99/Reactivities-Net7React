'use client'
import { DetailsForm, User } from '@/models/User'
import React from 'react'
import DetailsInput from './DetailsInput'
import { useFormikContext } from 'formik'

interface Props {
    user: DetailsForm
}

const YourDetails = ({ user }: Props) => {
    const { dirty } = useFormikContext();

    return (
        <div className="w-10/12 lg:w-6/12 mx-auto lg:mx-0 mt-5 lg:mt-0">
            <h1 className='text-2xl lg:text-3xl font-medium'>Your Details</h1>
            <div className="flex flex-col gap-5 mt-5">
                <div className="w-full flex gap-5">
                    <div className="username flex flex-col gap-1">
                        <DetailsInput 
                            type='text' 
                            name='username' 
                            value={user.username} 
                            label='Username'
                        />
                    </div>
                    <div className="username flex flex-col gap-1">
                        <DetailsInput 
                            type='text' 
                            name='displayName' 
                            value={user.displayName} 
                            label='Display Name'
                        />
                    </div>
                </div>

                <div className="w-full username flex flex-col gap-1">
                    <DetailsInput 
                        type='email' 
                        name='email' 
                        value={user.email} 
                        label='Email'
                    />
                </div>
                <div className="w-full username flex flex-col gap-1">
                    <DetailsInput 
                        type='text' 
                        name='phoneNumber' 
                        value={user.phoneNumber} 
                        label='Phone Number'
                    />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <button type='submit' disabled={!dirty} className='create'>Save</button>
            </div>
        </div>

        
    )
}

export default YourDetails